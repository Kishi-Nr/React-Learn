import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import MainConten from "./components/template/mainconten";
import Sektoral from "./components/template/sektoral";
import Buku from "./components/template/buku";
import DataSet from "./components/template/dataSet";
import NotFound from "./components/auth/NotFound"; // Pastikan komponen ini di-import
import { login } from "./components/auth/loginService";
import Swal from "sweetalert2";
import Navbar from "./components/organisms/Navbar"; // Import Navbar
import './App.css';

// Main App component
function App() {
    return (
        <Router>
            <AppContent /> {/* All routing and content handling goes here */}
            
        </Router>
    );
}

// Separate component for handling content and routing
function AppContent() {
    const location = useLocation(); // Now this is inside the Router context

    return (
        <div className="App">
        {/* Render Navbar only if not on the login or not found page */}
        {location.pathname !== '/login' && location.pathname !== '*' && <Navbar />}
        <Routes>
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/" element={<MainConten />} />
            <Route 
                path="/sektoral" 
                element={<Sektoral />} 
            />
            <Route 
                path="/buku" 
                element={<Buku />} 
            />
             <Route 
                path="/dataset" 
                element={<DataSet />} 
            />
            {/* Wildcard route to catch all undefined paths */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    );
}

// Existing LoginWrapper function
function LoginWrapper() {
    const handleLogin = async (nip, password) => {
        try {
            const result = await login(nip, password);

            // Tampilkan alert ketika login berhasil
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Selamat datang!',
                icon: 'success',
                confirmButtonText: 'Lanjutkan'
            });

            // Simpan data riwayat login di localStorage
            localStorage.setItem('nip', nip); // Simpan NIP
            localStorage.setItem('token', result.token); // Simpan token login

            // Navigasi ke halaman main setelah login berhasil
            window.location.href = '/'; // Change this to '/' to match the route
        } catch (error) {
            console.error('Login gagal:', error);

            // Tampilkan alert ketika login gagal
            Swal.fire({
                title: 'Login Gagal',
                text: 'NIP atau password salah. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
        }
    };

    return <Login onLogin={handleLogin} />;
}

// Komponen untuk melindungi route
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // Jika tidak ada token, arahkan kembali ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika ada token, render konten yang di-protect
    return children;
}

export default App;

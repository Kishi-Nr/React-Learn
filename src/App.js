import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import MainConten from "./components/template/mainconten";
import Sektoral from "./components/template/sektoral";
import Buku from "./components/template/buku";
import DataSet from "./components/template/dataSet";
import DetailDataset from "./components/template/DetailDataset"; // Import the DetailDataset component
import NotFound from "./components/auth/NotFound"; // Ensure this component is imported
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
                <Route path="/sektoral" element={<Sektoral />} />
                <Route path="/buku" element={<Buku />} />
                <Route path="/dataset" element={<DataSet />} />
                <Route path="/detail/:id" element={<DetailDataset />} /> {/* Add detail route */}
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

            // Show alert when login is successful
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Selamat datang!',
                icon: 'success',
                confirmButtonText: 'Lanjutkan'
            });

            // Save login history to localStorage
            localStorage.setItem('nip', nip); // Save NIP
            localStorage.setItem('token', result.token); // Save login token

            // Navigate to main page after successful login
            window.location.href = '/'; // Change this to '/' to match the route
        } catch (error) {
            console.error('Login gagal:', error);

            // Show alert when login fails
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

// Protected route component
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token, redirect back to the login page
        return <Navigate to="/login" replace />;
    }

    // If there is a token, render the protected content
    return children;
}

export default App;

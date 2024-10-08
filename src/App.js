// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import MainConten from "./components/template/mainconten";
import Sektoral from "./components/login/sektoral"; // Import komponen 
import Buku from "./components/login/buku"; // Import komponen Sektoral
import { login } from "./components/login/loginService";
import Swal from "sweetalert2"; // Import SweetAlert
import './App.css'; // Global CSS

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Route untuk halaman login */}
                    <Route path="/" element={<LoginWrapper />} />
                    {/* Route untuk halaman utama setelah login */}
                    <Route path="/main" element={<ProtectedRoute><MainConten /></ProtectedRoute>} />
                    {/* Route untuk halaman Sektoral */}
                    <Route path="/sektoral" element={<ProtectedRoute><Sektoral /></ProtectedRoute>} />
                    <Route path="/buku" element={<ProtectedRoute><Buku /></ProtectedRoute>} />
                </Routes>
            </Router>
        </div>
    );
}

// Fungsi pembungkus untuk login, menambahkan navigasi setelah berhasil login
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
            window.location.href = '/main';
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

// Komponen untuk melindungi route, memastikan pengguna hanya bisa mengakses jika sudah login
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // Jika tidak ada token, arahkan kembali ke halaman login
        return <Navigate to="/" replace />;
    }

    // Jika ada token, render konten yang di-protect
    return children;
}

export default App;

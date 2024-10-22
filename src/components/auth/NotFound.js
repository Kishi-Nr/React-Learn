import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../../styles/login.css'; // Import CSS khusus

const NotFound = () => {
    const navigate = useNavigate();

    // Tampilkan alert ketika halaman tidak ditemukan
    React.useEffect(() => {
        Swal.fire({
            title: '404 Not Found',
            text: 'Halaman yang Anda cari tidak ditemukan.',
            icon: 'error',
            confirmButtonText: 'Kembali ke Beranda',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/'); // Navigasi kembali ke halaman utama
            }
        });
    }, [navigate]);

    return (
        <div className="notfound-container">
            <h1>404</h1>
            <p>Halaman tidak ditemukan.</p>
            <p>Silakan kembali ke halaman utama.</p>
            {/* Button to navigate back to home */}
            <button 
                onClick={() => navigate('/')} // Navigate to home on click
            >
                Kembali ke Beranda
            </button>
        </div>
    );
};

export default NotFound;

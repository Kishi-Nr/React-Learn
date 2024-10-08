import React from "react";
import Navbar from "../organisms/Navbar";
import Header from "../organisms/Header";
import Logo from "../organisms/Logo";
import Skills from "../organisms/Skills";
import Gallery from "../organisms/Gallery";
import Testimoni from "../organisms/Testimoni";
import Contact from "../organisms/Contact";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MainConten = () => {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    // Hapus juga data login atau userInfo jika disimpan
    localStorage.removeItem('nip');
    localStorage.removeItem('userInfo');

    // Arahkan pengguna kembali ke halaman login
    navigate('/', { replace: true }); // Menggunakan replace agar pengguna tidak bisa kembali ke halaman sebelumnya
  };

  return (
    <div>
      <Navbar />
      <Header />
      <Logo />
      <Skills />
      <Gallery />
      <Testimoni />
      <Contact />

      {/* Tombol logout */}
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <button 
          onClick={handleLogout} 
          style={{ padding: '10px 20px', backgroundColor: '#f00', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainConten;

// src/services/loginService.js
import axios from 'axios';

// Base URL API
const API_URL = 'http://116.206.212.234:4000';

// Fungsi login untuk memanggil API
export const login = async (nip, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            nip: nip,
            password: password
        });

        // Jika API mengembalikan token, simpan token dan refresh token di localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken); // Menyimpan refresh token
            return response.data;
        } else {
            throw new Error('NIP atau password salah');
        }
    } catch (error) {
        throw new Error('Terjadi kesalahan saat login');
    }
};

// Fungsi refresh token
export const refreshToken = async () => {
    try {
        const refresh_token = localStorage.getItem('refreshToken'); // Ambil refresh token dari localStorage
        if (!refresh_token) {
            throw new Error('Refresh token tidak tersedia');
        }

        // Panggil API untuk refresh token
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refresh_token: refresh_token
        });

        const { token, refreshToken } = response.data;

        // Simpan token baru di localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        return token; // Return token baru jika berhasil
    } catch (error) {
        console.error('Gagal refresh token:', error);
        throw error;
    }
};

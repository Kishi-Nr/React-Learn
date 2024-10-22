// src/Components/auth/BukuDigital.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf"; // If you intend to use PDF.js for rendering
import "../../styles/login.css";



pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const Buku = () => {
  const [bukuDigital, setBukuDigital] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://116.206.212.234:4000/buku-digital"); 
        if (response.data) {
          setBukuDigital(response.data);
        } else {
          setError("Data tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal mengambil data buku digital. Coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Function to open the PDF file
  const openPDF = (filePath) => {
    const fullUrl = `http://116.206.212.234:4000${filePath.replace("handler/http", "")}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Daftar Buku Digital</h2>
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="result-table table-striped">
            <h3>Hasil Pencarian</h3>
            <table>
              <thead>
                <tr>
                  <th>Judul Buku</th>
                  <th>Tahun</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {bukuDigital.length > 0 ? (
                  bukuDigital.map((buku) => (
                    <tr key={buku.id_buku_digital}>
                      <td>{buku.buku}</td>
                      <td>{buku.tahun}</td>
                      <td>
                        <button
                          className="detail-button"
                          onClick={() => setSelectedBook(buku)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Tidak ada data yang ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selectedBook && (
          <div className="pdf-preview">
            <h3>Pratinjau Buku: {selectedBook.buku}</h3>
            <button onClick={() => setSelectedBook(null)}>Tutup</button>
            <p>
              <a 
                href="#"
                onClick={() => openPDF(selectedBook.file)} // Open PDF using openPDF function
                target="_blank" 
                rel="noopener noreferrer"
              >
                Buka Buku Digital
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buku;

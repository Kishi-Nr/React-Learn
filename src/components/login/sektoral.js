import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../../styles/login.css"; // Import CSS biasa
import Navbar from '../organisms/Navbar';

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(false);  // State untuk loading status
  const [error, setError] = useState(null);
  const [DariTahun, setDariTahun] = useState('');
  const [SampaiTahun, setSampaiTahun] = useState('');
  const [selectedopd, setSelectedOpd] = useState('');
  const [selectedUrusan, setSelectedUrusan] = useState('');
  const [hasilData, setHasilData] = useState([]); // State untuk menyimpan hasil pencarian

  useEffect(() => {
    // get API OPD
    const fetchDataOPD = async () => {
      try {
        const response = await axios.get("http://116.206.212.234:4000/list-opd");
        setDataOPD(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchDataOPD();
  }, []);

  useEffect(() => {
    // get API Urusan by ID OPD
    const fetchDataUrusan = async () => {
      if (selectedopd) {
        try {
          const response = await axios.get(`http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${selectedopd}`);
          setDataUrusan(response.data);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchDataUrusan();
  }, [selectedopd]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman saat submit

    setLoading(true); // Mulai loading
    try {
      const response = await axios.get("http://116.206.212.234:4000/data-sektoral", {
        params: {
            id_user_opd: selectedopd, // Parameter OPD yang dipilih
            kode_urusan: selectedUrusan, // Parameter urusan yang dipilih
            dari_tahun: DariTahun, // Parameter dari tahun
            sampai_tahun: SampaiTahun, // Parameter sampai tahun
        }
      });
      setHasilData(response.data); // Set data dari hasil pencarian
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Hentikan loading
    }
  };

  return (
    <div className="sektor-container">
      <Navbar/>
        <div className="sektor-box">
            <h2 className="sektor-title">Cari</h2>
            
            <form className="sektor-form" onSubmit={handleSearch}>
                {/* Elemen select untuk OPD */}
                <select className="sektor-input" required onChange={(e) => setSelectedOpd(e.target.value)}>
                    <option value="">Pilih OPD</option>
                    {opds.map((OPD) => (
                        <option key={OPD.id_opd} value={OPD.id_opd}>
                            {OPD.nama_opd}
                        </option>
                    ))}
                </select>

                {/* Elemen select untuk Urusan */}
                <select className="sektor-input" required  onChange={(e) => setSelectedUrusan(e.target.value)}>
                    <option value="">Pilih Urusan</option>
                    {urusans.map((Urusan) => (
                        <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
                            {Urusan.nama_urusan}
                        </option>
                    ))}
                </select>

                {/* Input Dari Tahun */}
                <input
                    className="sektor-input"
                    type="number"
                    placeholder="Dari Tahun"
                    value={DariTahun}
                    onChange={(e) => setDariTahun(e.target.value)}
                    required
                />

                {/* Input Sampai Tahun */}
                <input
                    className="sektor-input"
                    type="number"
                    placeholder="Sampai Tahun"
                    value={SampaiTahun}
                    onChange={(e) => setSampaiTahun(e.target.value)}
                    required
                />

                {/* Tombol untuk submit */}
                <button className="sektor-button" type="submit">
                    {loading ? "Memuat..." : "Cari"}
                </button>
            </form>
        </div>

        {/* Tampilkan Hasil

        {/* Tampilkan Hasil Pencarian */}
        {error && <div className="error-message">Terjadi kesalahan: {error.message}</div>}
        {!loading && hasilData.length > 0 && (
          <div className="hasil-container">
            <h3 className="hasil-title">Hasil Pencarian</h3>
            <table className="hasil-table">
              <thead>
                <tr>
                  <th>Nama Urusan</th>
                  <th>Satuan</th>
                  <th>Jenis</th>
                  <th>kategori</th>
                </tr>
              </thead>
              <tbody>
                {hasilData.map((item, index) => (
                  <tr key={index}>
                    
                    <td>{item.uraian_dssd}</td>
                    <td>{item.satuan}</td>
                    <td>{item.jenis_string}</td>
                    <td>{item.kategori_string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tampilkan pesan jika tidak ada hasil */}
        {!loading && hasilData.length === 0 && <div className="no-data-message">Tidak ada data yang ditemukan</div>}
    </div>
  );
}

export default Sektoral;

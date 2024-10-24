import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery"; // Import jQuery
import "select2"; // Import Select2
import "../../styles/login.css"; // Ensure you have your styles here

const Sektoral = () => {
  const [opds, setOpds] = useState([]);
  const [urusans, setUrusans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [selectedOPD, setSelectedOPD] = useState("");
  const [selectedUrusan, setSelectedUrusan] = useState("");
  const [dataHasil, setDataHasil] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // jumlah item per halaman
  const [totalData, setTotalData] = useState(0);
  const [pageInput, setPageInput] = useState(1);

  // State untuk mengetahui apakah pencarian sudah dilakukan
  const [hasSearched, setHasSearched] = useState(true);

  // Fetch data OPD saat komponen di-mount
  useEffect(() => {
    const fetchDataOPD = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://116.206.212.234:4000/list-opd");
        setOpds(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataOPD();
  }, []);

  // Fetch data urusan berdasarkan OPD yang dipilih
  const handleOPDChange = async (e) => {
    const opdId = e.target.value;
    setSelectedOPD(opdId);
    setSelectedUrusan("");
    setLoading(true);

    if (opdId) {
      try {
        const response = await axios.get(
          `http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${opdId}`
        );
        setUrusans(response.data);
        setError(null);
      } catch (error) {
        setError("Gagal mengambil data urusan.");
      } finally {
        setLoading(false);
      }
    } else {
      setUrusans([]);
      setLoading(false);
    }
  };

  // Fungsi untuk menangani pencarian data
  const handleSearch = async (page = 1) => {
    setLoading(true);
    setDataHasil([]); // Bersihkan data hasil sebelum fetch baru
    try {
      const response = await axios.get("http://116.206.212.234:4000/data-sektoral", {
        params: {
          id_user_opd: selectedOPD,
          kode_urusan: selectedUrusan,
          dari_tahun: dariTahun,
          sampai_tahun: sampaiTahun,
          page,
          per_page: itemsPerPage,
        },
      });

      setDataHasil(response.data);

      const totalItems = response.headers["x-pagination-total-count"];
      setTotalData(totalItems ? parseInt(totalItems, 10) : 0);

      setError(null);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengganti halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handleSearch(pageNumber); // Memanggil pencarian untuk halaman baru
  };

  useEffect(() => {
    // Initialize Select2 for OPD
    $("#opd-select").select2({
      placeholder: "Pilih OPD",
      allowClear: true,
    }).on("change", (e) => {
      const selectedValue = $(e.target).val();
      handleOPDChange({ target: { value: selectedValue } }); // Call the handleOPDChange function
    });

    // Initialize Select2 for Urusan when Urusans are loaded
    $("#urusan-select").select2({
      placeholder: "Pilih Urusan",
      allowClear: true,
    }).on("change", (e) => {
      const selectedValue = $(e.target).val();
      setSelectedUrusan(selectedValue); // Set selected Urusan
    });

    // Cleanup function to destroy Select2 instance on unmount
    return () => {
      $("#opd-select").select2("destroy");
      $("#urusan-select").select2("destroy");
    };
  }, [opds, urusans]);

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral Berdasarkan OPD</h2>
        <div className="card">
          <form
          className="sektoral-form"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
            handleSearch(1);
          }}
        >
          <select
            id="opd-select" // Add ID for Select2
            className="sektoral-input"
            value={selectedOPD}
            onChange={handleOPDChange}
          >
            <option value="">Pilih OPD</option>
            {opds.map((OPD) => (
              <option key={OPD.id_opd} value={OPD.id_opd}>
                {OPD.nama_opd}
              </option>
            ))}
          </select>

          <select
            id="urusan-select" // Add ID for Select2
            className="sektoral-input"
            value={selectedUrusan}
            onChange={(e) => setSelectedUrusan(e.target.value)}
            disabled={!selectedOPD}
          >
            <option value="">Pilih Urusan</option>
            {urusans.map((Urusan) => (
              <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
                {Urusan.nama_urusan}
              </option>
            ))}
          </select>

          <input
            className="sektoral-input input-common"
            type="number"
            placeholder="Dari Tahun"
            value={dariTahun}
            onChange={(e) => setDariTahun(e.target.value)}
            required
          />

          <input
            className="sektoral-input input-common"
            type="number"
            placeholder="Sampai Tahun"
            value={sampaiTahun}
            onChange={(e) => setSampaiTahun(e.target.value)}
            required
          />

          <button className="sektoral-button" type="submit">
            <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
            Cari
          </button>
        </form>
        </div>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="result-table table-striped">
            <h3>Hasil Pencarian</h3>
            <div>Total Data: {totalData}</div>
            <div className="card">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Uraian</th>
                  <th>Satuan</th>
                  <th>Jenis</th>
                  <th>Kategori</th>
                </tr>
              </thead>
              <tbody>
                {dataHasil.length > 0 ? (
                  dataHasil.map((item, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.uraian_dssd}</td>
                      <td>{item.satuan}</td>
                      <td>{item.jenis_string}</td>
                      <td>{item.kategori_string}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data yang ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button previous"
              >
                Previous
              </button>

              <div className="pagination-info">
                Page {currentPage} of {Math.ceil(totalData / itemsPerPage)}
              </div>

              {/* Form untuk menginput page tertentu */}
              <form
                className="pagination-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pageInput > 0 && pageInput <= Math.ceil(totalData / itemsPerPage)) {
                    handlePageChange(pageInput);
                  }
                }}
              >
                <input
                  type="number"
                  min="1"
                  max={Math.ceil(totalData / itemsPerPage)}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  className="pagination-input"
                />
                <button type="submit" className="pagination-button go">
                  Go
                </button>
              </form>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalData / itemsPerPage)}
                className="pagination-button next"
              >
                Next
              </button>
            </div> 
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sektoral;

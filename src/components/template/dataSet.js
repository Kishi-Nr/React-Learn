import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/login.css"; // Ensure you have your styles here

const DataSet = () => {
  const [opds, setOpds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dataHasil, setDataHasil] = useState([]);
  const [allData, setAllData] = useState([]);

  // Search state for OPDs and datasets
  const [searchTerm, setSearchTerm] = useState("");
  const [datasetSearchTerm, setDatasetSearchTerm] = useState(""); // New state for dataset search

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [totalData, setTotalData] = useState(0);
  const [pageInput, setPageInput] = useState(1);

  // Sorting state
  const [sortOption, setSortOption] = useState("name"); // Default sorting by name

  // Fetch OPD and all datasets on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const opdResponse = await axios.get("http://116.206.212.234:4000/list-opd");
        setOpds(opdResponse.data);
        await fetchDatasets();
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch datasets based on selected OPD or all datasets if none selected
  useEffect(() => {
    fetchDatasets();
  }, [selectedOPD, currentPage]);

  const fetchDatasets = async () => {
    setLoading(true);
    try {
      const params = selectedOPD ? { id_user_opd: selectedOPD } : {};
      const response = await axios.get("http://116.206.212.234:4000/dataset", {
        params: {
          ...params,
          page: currentPage,
          per_page: itemsPerPage,
        },
      });

      setDataHasil(response.data);
      const totalItems = response.headers["x-pagination-total-count"];
      setTotalData(totalItems);
      setAllData((prev) => (selectedOPD ? prev : response.data)); // Store all data if no OPD selected
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OPD card click
  const handleOPDSelect = (opd) => {
    setSelectedOPD(opd.id_opd);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter OPDs based on search term
  const filteredOpds = opds.filter((opd) =>
    opd.nama_opd.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter datasets based on dataset search term
  const filteredDataHasil = dataHasil.filter((item) =>
    item.uraian_dssd.toLowerCase().includes(datasetSearchTerm.toLowerCase())
  );

  // Sort datasets based on selected sort option
  const sortedDataHasil = [...filteredDataHasil].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.uraian_dssd.localeCompare(b.uraian_dssd); // Sort by name
      case "newest":
        return new Date(b.modified) - new Date(a.modified); // Sort by newest
      case "oldest":
        return new Date(a.modified) - new Date(b.modified); // Sort by oldest
      default:
        return 0; // No sorting
    }
  });

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalData / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    handlePageChange(pageInput);
  };

  return (
    <div className="dataset-container">
      <h2 className="dataset-title">Dataset</h2>
      <p className="text-1">
        Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini. Open Data menyediakan akses ke beragam koleksi dataset
        dari seluruh Organisasi Perangkat Daerah di Lampung Timur.
      </p>
      <div className="dataset-content">
        {/* Left Column: Search OPD */}
        <div className="left-column">
          {/* Produsen Dataset Section */}
          <div className="card">
            <h5>Produsen Dataset</h5>
            <input
              type="text"
              className="dataset-input"
              placeholder="Cari Produsen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Cari OPD"
            />
            <div className="opd-list">
              {loading ? (
                <p>Loading...</p>
              ) : filteredOpds.length > 0 ? (
                filteredOpds.map((opd) => (
                  <div key={opd.id_opd} className="opd-item" onClick={() => handleOPDSelect(opd)}>
                    <div className="card">{opd.nama_opd}</div>
                  </div>
                ))
              ) : (
                <div>Tidak ada OPD yang ditemukan</div>
              )}
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>

          {/* Kategori Data Sektoral Section */}
          <div className="card">
            <h5>Kategori Data Sektoral</h5>
            <table className="sektoral-table">
              <tbody>
                <tr>
                  <td>Sarana & Infrastruktur</td>
                </tr>
                <tr>
                  <td>Ekonomi & Pembangunan</td>
                </tr>
                <tr>
                  <td>Sosial & Kesejahteraan Masyarakat</td>
                </tr>
                <tr>
                  <td>Kebijakan & Legislasi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Dataset Results */}
        <div className="right-column">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="result-list">
              <h5>List Dataset</h5>
              <input
                type="text"
                className="dataset-input"
                placeholder="Cari Dataset..."
                value={datasetSearchTerm}
                onChange={(e) => setDatasetSearchTerm(e.target.value)}
                aria-label="Cari Dataset"
              />
              {/* Sort Options */}
              <div className="sort-options">
                <div>{sortedDataHasil.length} Dataset Ditemukan</div>

                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Nama (A-Z)</option>
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </select>
              </div>
              {/* Untuk Menampilkan list data set */}
              {sortedDataHasil.length > 0 ? (
                sortedDataHasil.map((item) => (
                  <div className="data-item" key={item.id}>
                    <h5>
                      <Link to={`/detail/${item.id}`} className="black-button">
                        {item.uraian_dssd}
                      </Link>
                    </h5>
                    <p className="text-1">{item.description}</p>
                    <p className="text-1">{item.modified}</p>
                    <p className="text-1">{item.nama_opd}</p>
                  </div>
                ))
              ) : (
                <div>Tidak ada data yang ditemukan</div>
              )}
              {/* Pagination Controls */}
              {totalData > 0 && (
                <div className="pagination">
                  <form className="pagination-form" onSubmit={handlePageInputSubmit}>
                    <input
                      type="number"
                      min="1"
                      max={Math.ceil(totalData / itemsPerPage)}
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      className="pagination-input"
                      aria-label="Page number input"
                    />
                    <button type="submit" className="pagination-button go">
                      Go
                    </button>
                  </form>

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

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalData / itemsPerPage)}
                    className="pagination-button next"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSet;

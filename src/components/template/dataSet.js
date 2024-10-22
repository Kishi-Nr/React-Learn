import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/login.css"; // Ensure you have your styles here

const DataSet = () => {
  const [opds, setOpds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dataHasil, setDataHasil] = useState([]);
  const [allData, setAllData] = useState([]); // Store all datasets initially

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [totalData, setTotalData] = useState(0);
  const [pageInput, setPageInput] = useState(1);

  // Fetch OPD and all datasets on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch OPD list
        const opdResponse = await axios.get("http://116.206.212.234:4000/list-opd");
        setOpds(opdResponse.data);

        // Fetch all datasets (initially)
        const allDataResponse = await axios.get("http://116.206.212.234:4000/dataset", {
          params: {
            page: currentPage,
            per_page: itemsPerPage,
          },
        });

        setAllData(allDataResponse.data); // Store all datasets
        setDataHasil(allDataResponse.data); // Initially show all datasets
        const totalItems = allDataResponse.headers["x-pagination-total-count"];
        setTotalData(totalItems ? parseInt(totalItems, 10) : 0);

        setError(null);
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  // Fetch data when OPD is selected
  useEffect(() => {
    const fetchDataForSelectedOPD = async () => {
      if (selectedOPD) {
        setLoading(true);
        try {
          const response = await axios.get("http://116.206.212.234:4000/dataset", {
            params: {
              id_user_opd: selectedOPD,
              page: currentPage,
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
      } else {
        setDataHasil(allData); // If no OPD is selected, show all datasets
        setTotalData(allData.length);
      }
    };

    fetchDataForSelectedOPD();
  }, [selectedOPD, currentPage, allData]); // Depend on selectedOPD, currentPage, and allData

  // Handle OPD card click
  const handleOPDSelect = (opd) => {
    setSelectedOPD(opd.id_opd);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter OPDs based on search term
  const filteredOpds = opds.filter((opd) =>
    opd.nama_opd.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle page change
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="dataset-container">
      <h2 className="dataset-title">Dataset</h2>
      <div className="dataset-content">
        {/* Left Column: Search OPD */}
        <div className="left-column">
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
                <div
                  key={opd.id_opd}
                  className="opd-item"
                  onClick={() => handleOPDSelect(opd)}
                >
                  <div className="card">
                    <div>{opd.nama_opd}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>Tidak ada OPD yang ditemukan</div>
            )}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Right Column: Dataset Results */}
        <div className="right-column">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="result-list">
              <h3>Hasil Pencarian</h3>
              <div>Total Data: {totalData}</div>
              {dataHasil.length > 0 ? (
                dataHasil.map((item, index) => (
                  <div className="data-item" key={index}>
                    <h4>{item.uraian_dssd}</h4>
                    <p>{item.description}</p>
                    <p>{item.modified}</p>
                    <p>{item.nama_opd}</p>
                  </div>
                ))
              ) : (
                <div>Tidak ada data yang ditemukan</div>
              )}
              {/* Pagination Controls */}
              {totalData > itemsPerPage && (
                <div className="pagination">
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

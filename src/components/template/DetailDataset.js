import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import "../../styles/login.css"; // Ensure you've imported your CSS file

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailDataset = () => {
  const { id } = useParams(); // Get dataset ID from URL
  const [datasetDetail, setDatasetDetail] = useState(null); // Initialize as null for better state handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://116.206.212.234:4000/dataset/detail/${id}`);
        console.log(response.data); // Log API response for debugging
        setDatasetDetail(response.data);
        setError(null);
      } catch (error) {
        setError("Gagal mengambil detail dataset.");
      } finally {
        setLoading(false);
      }
    };
    if (id) { // Check if id is valid before making API call
      fetchDetail();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if datasetDetail and input are available
  const inputData = datasetDetail?.input || [];
  const years = inputData.map(item => item.tahun);
  const quantities = inputData.map(item => item.jumlah);

  const barData = {
    labels: years,
    datasets: [
      {
        label: "Jumlah",
        data: quantities,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels:years,
    datasets: [
      {
        label: 'tahun',
        data: quantities,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jumlah Data Berdasarkan Tahun',
      },
    },
  };

  // Function to download data as CSV
  const handleDownload = () => {
    const data = [
      ["Tahun", "Jumlah"], // CSV header
      ...inputData.map(item => [item.tahun, item.jumlah]), // Map through input for CSV rows
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_sektoral.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="detail-dataset">
      <h2 >Detail Dataset</h2>
      <div className="text-1">
        Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini.
        Open Data menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Lampung Timur.
      </div>

      {datasetDetail ? (
        <>
          {/* Card for general details */}
          <div className="card">
            <table>
              <tbody>
                <tr>
                  <td><strong>Nama OPD:</strong></td>
                  <td>{datasetDetail.nama_opd}</td>
                </tr>
                <tr>
                  <td><strong>Judul Dataset:</strong></td>
                  <td>{datasetDetail.title}</td>
                </tr>
                <tr>
                  <td><strong>Description:</strong></td>
                  <td>{datasetDetail.description}</td>
                </tr>
                <tr>
                  <td><strong>Jenis:</strong></td>
                  <td>{datasetDetail.jenis_string}</td>
                </tr>
                <tr>
                  <td><strong>Kategori:</strong></td>
                  <td>{datasetDetail.kategori_string}</td>
                </tr>
                <tr>
                  <td><strong>Satuan:</strong></td>
                  <td>{datasetDetail.satuan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Jumlah Data Sektoral & Api Interoperabilitas */}
          <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Jumlah Data Sektoral & Api Interoperabilitas</h3>
            <button className="download-button" onClick={ handleDownload }>Download</button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Tabel Kiri */}
            <div style={{ flex: 1, marginRight: '20px' }}>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Tahun:</strong></td>
                    <td><strong>Jumlah:</strong></td>
                  </tr>
                  {inputData.length > 0 ? (
                    inputData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.tahun || "Data tidak tersedia"}</td>
                        <td>{item.jumlah || "Data tidak tersedia"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Data tidak tersedia</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Tabel Kanan */}
            <div style={{ flex: 1 }}>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Method:</strong></td>
                    <td><strong>API:</strong></td>
                  </tr>
                  {/* Contoh data tabel tambahan */}
                      <tr>
                        <td>{"GET"}</td>
                        <td> 
                        <a href={`http://116.206.212.234:3002/dataset/detail/${id}`}  rel="noopener noreferrer" className="btn btn-primary">
                           Open API
                        </a>
                        </td>
                      </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>


          {/* Bar Chart */}
          <div style={{ width: '50%', height: '50%', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
        </>
      ) : (
        <div>Data tidak tersedia</div>
      )}
    </div>
  );
};

export default DetailDataset;

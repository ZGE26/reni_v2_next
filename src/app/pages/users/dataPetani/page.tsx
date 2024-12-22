"use client";
import Navbar from "@/components_dashboard/Navbar";
import React, { useState, useEffect } from "react";

export default function DataPetani() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }

    const [formatData, setFormatData] = useState({
        user_id: "",
        luas_lahan: "",
        lokasi: "",
        name: "",
        wilayah_id: "",
    });

    const [dataPanen, setPanen] = useState({
        tanggal_penanaman: "",
        tanggal_panen: "",
        pangan_id: "",
        user_id: "",
        hasil_panen: "",
        lahan_id: "",
    });

    const [wilayahData, setWilayahData] = useState<any[]>([]); // State untuk menyimpan data wilayah
    const [panganData, setPanganData] = useState<any[]>([]); // State untuk menyimpan data pangan
    const [lahanData, setLahanData] = useState<any[]>([]); // State untuk menyimpan data lahan
    const [panenData, setPanenData] = useState<any[]>([]); // State untuk menyimpan data panen
    const [error, setError] = useState<string>("");

    const [showModal, setShowModal] = useState(false);
    const [selectedLahan, setSelectedLahan] = useState<any>(null); // Untuk menyimpan data yang akan diupdate
    const [selectedPanen, setSelectedPanen] = useState<any>(null); // Untuk menyimpan data yang akan diupdate

    const fetchWilayahData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/wilayah`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setWilayahData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError("Gagal mengambil data wilayah.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil data wilayah.");
        }
    };

    const fetchPanganData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/pangan`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPanganData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError("Gagal mengambil data pangan.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil data pangan.");
        }
    };

    const fetchLahanData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/lahan`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLahanData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError("Gagal mengambil data lahan.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil data lahan.");
        }
    };

    const fetchPanenData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/data-panen`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPanenData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError("Gagal mengambil data pangan.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil data pangan.");
        }
    };

    useEffect(() => {
        fetchWilayahData();
        fetchPanganData();
        fetchLahanData();
        fetchPanenData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormatData({
            ...formatData,
            [name]: value,
        });
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPanen({
            ...dataPanen,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/lahan", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formatData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Input Lahan Berhasil!");
                window.location.reload();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat melakukan input lahan.");
        }
    };

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/data-panen", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPanen),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Input Data Panen Berhasil!");
                window.location.reload();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat melakukan input data panen.");
        }
    };

    const handleOpenUpdateModalLahan = (lahanId: number) => {
        const lahanToUpdate = lahanData.find((lahan: any) => lahan.id === lahanId);
        if (lahanToUpdate) {
            setSelectedLahan(lahanToUpdate); // Simpan data lahan yang akan di-update
            setShowModal(true); // Tampilkan modal
        }
    };

    const handleUpdateLahan = async () => {
        if (selectedLahan) {
            try {
                const response = await fetch(`http://localhost:8000/lahan/${selectedLahan.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedLahan),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Data Lahan berhasil diupdate!");
                    setShowModal(false); // Sembunyikan modal setelah update
                    window.location.reload();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.log(error);
                alert("Terjadi kesalahan saat melakukan update data lahan.");
            }
        }
    };

    const handleDeleteLahan = async (lahanId: number) => {
        const confirmation = window.confirm("Apakah Anda yakin ingin menghapus data lahan ini?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:8000/lahan/${lahanId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    alert("Data Lahan berhasil dihapus!");
                    setLahanData(lahanData.filter((lahan: any) => lahan.id !== lahanId));
                } else {
                    alert("Gagal menghapus data lahan.");
                }
            } catch (err) {
                alert("Terjadi kesalahan saat menghapus data lahan.");
            }
        }
    };

    const handleOpenUpdateModalPanen = (panenId: number) => {
        const panenToUpdate = panenData.find((panen: any) => panen.id === panenId);
        if (panenToUpdate) {
            setSelectedPanen(panenToUpdate); // Simpan data panen yang akan di-update
            setShowModal(true); // Tampilkan modal
        }
    };

    const handleUpdatePanen = async () => {
        if (selectedPanen) {
            try {
                const response = await fetch(`http://localhost:8000/data-panen/${selectedPanen.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedPanen),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Data Panen berhasil diupdate!");
                    setShowModal(false); // Sembunyikan modal setelah update
                    window.location.reload();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                alert("Terjadi kesalahan saat melakukan update data panen.");
            }
        }
    };

    const handleDeletePanen = async (panenId: number) => {
        const confirmation = window.confirm("Apakah Anda yakin ingin menghapus data panen ini?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:8000/data-panen/${panenId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    alert("Data Panen berhasil dihapus!");
                    setPanenData(panenData.filter((panen: any) => panen.id !== panenId));
                } else {
                    alert("Gagal menghapus data panen.");
                }
            } catch (err) {
                alert("Terjadi kesalahan saat menghapus data panen.");
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6">Manajemen Lahan dan Panen</h1>

            {/* Form to add new Lahan */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Tambah Lahan</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formatData.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        placeholder="Nama Lahan"
                    />
                    <input
                        type="text"
                        name="lokasi"
                        value={formatData.lokasi}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        placeholder="Lokasi"
                    />
                    <input
                        type="text"
                        name="luas_lahan"
                        value={formatData.luas_lahan}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        placeholder="Luas Lahan"
                    />
                    <select
                        name="wilayah_id"
                        value={formatData.wilayah_id}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 mb-2 w-full"
                    >
                        <option value="">Pilih Wilayah</option>
                        {wilayahData.map((wilayah) => (
                            <option key={wilayah.id} value={wilayah.id}>
                                {wilayah.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Tambah Lahan
                    </button>
                </form>
            </div>

            {/* Form to add new Panen */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Tambah Panen</h2>
                <form onSubmit={handleSubmit2}>
                    <input
                        type="text"
                        name="hasil_panen"
                        value={dataPanen.hasil_panen}
                        onChange={handleChange2}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        placeholder="Hasil Panen"
                    />
                    <select
                        name="pangan_id"
                        value={dataPanen.pangan_id}
                        onChange={handleChange2}
                        className="border border-gray-300 p-2 mb-2 w-full"
                    >
                        <option value="">Pilih Pangan</option>
                        {panganData.map((pangan) => (
                            <option key={pangan.id} value={pangan.id}>
                                {pangan.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="tanggal_penanaman"
                        value={dataPanen.tanggal_penanaman}
                        onChange={handleChange2}
                        className="border border-gray-300 p-2 mb-2 w-full"
                    />
                    <input
                        type="date"
                        name="tanggal_panen"
                        value={dataPanen.tanggal_panen}
                        onChange={handleChange2}
                        className="border border-gray-300 p-2 mb-2 w-full"
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Tambah Panen
                    </button>
                </form>
            </div>

            {/* Table to display Lahan */}
            <h2 className="text-2xl font-semibold mb-4">Data Lahan</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Nama Lahan</th>
                        <th>Lokasi</th>
                        <th>Luas Lahan</th>
                        <th>Wilayah</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lahanData.map((lahan: any) => (
                        <tr key={lahan.id}>
                            <td>{lahan.name}</td>
                            <td>{lahan.lokasi}</td>
                            <td>{lahan.luas_lahan}</td>
                            <td>{lahan.wilayah_id}</td>
                            <td>
                                <button
                                    onClick={() => handleOpenUpdateModalLahan(lahan.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteLahan(lahan.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Table to display Panen */}
            <h2 className="text-2xl font-semibold mb-4">Data Panen</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Hasil Panen</th>
                        <th>Pangan</th>
                        <th>Tanggal Penanaman</th>
                        <th>Tanggal Panen</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {panenData.map((panen: any) => (
                        <tr key={panen.id}>
                            <td>{panen.hasil_panen}</td>
                            <td>{panen.pangan_id}</td>
                            <td>{panen.tanggal_penanaman}</td>
                            <td>{panen.tanggal_panen}</td>
                            <td>
                                <button
                                    onClick={() => handleOpenUpdateModalPanen(panen.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeletePanen(panen.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for updating Lahan or Panen */}
            {showModal && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Update Data</h2>

            {/* Cek jika selectedLahan ada, tampilkan modal untuk Lahan */}
            {selectedLahan && !selectedPanen && (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={selectedLahan.name}
                        onChange={(e) => setSelectedLahan({ ...selectedLahan, name: e.target.value })}
                        placeholder="Nama Lahan"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="lokasi"
                        value={selectedLahan.lokasi}
                        onChange={(e) => setSelectedLahan({ ...selectedLahan, lokasi: e.target.value })}
                        placeholder="Lokasi"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="luas_lahan"
                        value={selectedLahan.luas_lahan}
                        onChange={(e) => setSelectedLahan({ ...selectedLahan, luas_lahan: e.target.value })}
                        placeholder="Luas Lahan"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleUpdateLahan}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Lahan
                    </button>
                </div>
            )}

            {/* Cek jika selectedPanen ada, tampilkan modal untuk Panen */}
            {selectedPanen && !selectedLahan && (
                <div>
                    <input
                        type="date"
                        name="tanggal_penanaman"
                        value={selectedPanen.tanggal_penanaman}
                        onChange={(e) => setSelectedPanen({ ...selectedPanen, tanggal_penanaman: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="date"
                        name="tanggal_panen"
                        value={selectedPanen.tanggal_panen}
                        onChange={(e) => setSelectedPanen({ ...selectedPanen, tanggal_panen: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="hasil_panen"
                        value={selectedPanen.hasil_panen}
                        onChange={(e) => setSelectedPanen({ ...selectedPanen, hasil_panen: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleUpdatePanen}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Panen
                    </button>
                </div>
            )}

            <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4"
            >
                Close
            </button>
        </div>
    </div>
)}

        </div>
    );
}

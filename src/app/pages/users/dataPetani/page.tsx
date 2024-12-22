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
            
            {/* Form Input Lahan */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Input Data Lahan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formatData.name}
                        onChange={handleChange}
                        placeholder="Nama Lahan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="lokasi"
                        value={formatData.lokasi}
                        onChange={handleChange}
                        placeholder="Lokasi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="luas_lahan"
                        value={formatData.luas_lahan}
                        onChange={handleChange}
                        placeholder="Luas Lahan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        name="wilayah_id"
                        value={formatData.wilayah_id}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Pilih Wilayah</option>
                        {wilayahData.map((wilayah: any) => (
                            <option key={wilayah.id} value={wilayah.id}>
                                {wilayah.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Submit Lahan
                    </button>
                </form>
            </div>

            {/* Table Lahan */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Data Lahan</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Nama</th>
                            <th className="px-4 py-2 border-b">Lokasi</th>
                            <th className="px-4 py-2 border-b">Luas Lahan</th>
                            <th className="px-4 py-2 border-b">Wilayah</th>
                            <th className="px-4 py-2 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lahanData.map((lahan: any) => (
                            <tr key={lahan.id}>
                                <td className="px-4 py-2 border-b">{lahan.id}</td>
                                <td className="px-4 py-2 border-b">{lahan.name}</td>
                                <td className="px-4 py-2 border-b">{lahan.lokasi}</td>
                                <td className="px-4 py-2 border-b">{lahan.luas_lahan}</td>
                                <td className="px-4 py-2 border-b">{lahan.wilayah_name}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleOpenUpdateModalLahan(lahan.id)}
                                        className="text-blue-500 hover:text-blue-600 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLahan(lahan.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form Input Panen */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Input Data Panen</h2>
                <form onSubmit={handleSubmit2} className="space-y-4">
                    <input
                        type="date"
                        name="tanggal_penanaman"
                        value={dataPanen.tanggal_penanaman}
                        onChange={handleChange2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="date"
                        name="tanggal_panen"
                        value={dataPanen.tanggal_panen}
                        onChange={handleChange2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        name="pangan_id"
                        value={dataPanen.pangan_id}
                        onChange={handleChange2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Pilih Pangan</option>
                        {panganData.map((pangan: any) => (
                            <option key={pangan.id} value={pangan.id}>
                                {pangan.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="hasil_panen"
                        value={dataPanen.hasil_panen}
                        onChange={handleChange2}
                        placeholder="Hasil Panen"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        name="lahan_id"
                        value={dataPanen.lahan_id}
                        onChange={handleChange2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Pilih Lahan</option>
                        {lahanData.map((lahan: any) => (
                            <option key={lahan.id} value={lahan.id}>
                                {lahan.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Submit Data Panen
                    </button>
                </form>
            </div>

            {/* Table Panen */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Data Panen</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Tanggal Penanaman</th>
                            <th className="px-4 py-2 border-b">Tanggal Panen</th>
                            <th className="px-4 py-2 border-b">Pangan</th>
                            <th className="px-4 py-2 border-b">Hasil Panen</th>
                            <th className="px-4 py-2 border-b">Lahan</th>
                            <th className="px-4 py-2 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panenData.map((panen: any) => (
                            <tr key={panen.id}>
                                <td className="px-4 py-2 border-b">{panen.id}</td>
                                <td className="px-4 py-2 border-b">{panen.tanggal_penanaman}</td>
                                <td className="px-4 py-2 border-b">{panen.tanggal_panen}</td>
                                <td className="px-4 py-2 border-b">{panen.pangan_name}</td>
                                <td className="px-4 py-2 border-b">{panen.hasil_panen}</td>
                                <td className="px-4 py-2 border-b">{panen.lahan_name}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleOpenUpdateModalPanen(panen.id)}
                                        className="text-blue-500 hover:text-blue-600 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeletePanen(panen.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

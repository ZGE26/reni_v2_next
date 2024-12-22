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
    const [panganData, setPanganData] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    // Fungsi untuk GET data wilayah
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

    // Jalankan fetchWilayahData saat komponen dimuat
    useEffect(() => {
        fetchWilayahData();
        fetchPanganData();
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
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat melakukan input data panen.");
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Data Petani</h1>

            <h2>Input Lahan</h2>
            <form onSubmit={handleSubmit}>
                <label>Luas Lahan (m2)</label>
                <input
                    type="number"
                    name="luas_lahan"
                    value={formatData.luas_lahan}
                    placeholder="Masukkan Luas Lahan"
                    onChange={handleChange}
                />
                <br />
                <label>Lokasi</label>
                <input
                    type="text"
                    name="lokasi"
                    value={formatData.lokasi}
                    placeholder="Masukkan Lokasi"
                    onChange={handleChange}
                />
                <br />
                <label>Nama Lahan</label>
                <input
                    type="text"
                    name="name"
                    value={formatData.name}
                    placeholder="Masukkan Nama Lahan"
                    onChange={handleChange}
                />
                <br />
                <label>ID Wilayah</label>
                <input
                    type="number"
                    name="wilayah_id"
                    value={formatData.wilayah_id}
                    placeholder="Masukkan ID Wilayah"
                    onChange={handleChange}
                />
                <br />
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md font-semibold"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Tabel Wilayah */}
            <h2 className="mt-8">Data Wilayah</h2>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Wilayah</th>
                    </tr>
                </thead>
                <tbody>
                    {wilayahData.length > 0 ? (
                        wilayahData.map((wilayah: any) => (
                            <tr key={wilayah.id}>
                                <td>{wilayah.id}</td>
                                <td>{wilayah.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">
                                Tidak ada data wilayah.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2 className="mt-8">Input Data Panen</h2>
            <form onSubmit={handleSubmit2}>
                <label>Tanggal Penanaman</label>
                <input
                    type="date"
                    name="tanggal_penanaman"
                    value={dataPanen.tanggal_penanaman}
                    onChange={handleChange2}
                    required
                />
                <br />
                <label>Tanggal Panen</label>
                <input
                    type="date"
                    name="tanggal_panen"
                    value={dataPanen.tanggal_panen}
                    onChange={handleChange2}
                    required
                />
                <br />
                <label>Pangan ID</label>
                <input
                    type="number"
                    name="pangan_id"
                    value={dataPanen.pangan_id}
                    onChange={handleChange2}
                    required
                />
                <br />
                <label>Hasil Panen</label>
                <input
                    type="number"
                    name="hasil_panen"
                    value={dataPanen.hasil_panen}
                    onChange={handleChange2}
                    required
                />
                <br />
                <label>Lahan ID</label>
                <input
                    type="number"
                    name="lahan_id"
                    value={dataPanen.lahan_id}
                    onChange={handleChange2}
                    required
                />
                <br />
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md font-semibold"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Tabel Pangan */}
            <h2 className="mt-8">Data Pangan</h2>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Pangan</th>
                    </tr>
                </thead>
                <tbody>
                    {panganData.length > 0 ? (
                        panganData.map((pangan: any) => (
                            <tr key={pangan.id}>
                                <td>{pangan.id}</td>
                                <td>{pangan.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">
                                Tidak ada data pangan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <a href="http://localhost:3000/pages/users/detail"><u>More Information</u></a>
        </div>
    );
}

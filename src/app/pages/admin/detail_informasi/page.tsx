"use client";
import React, { useState, useEffect } from "react";

export default function Informasi() {
    // Redirect jika tidak ada token atau role_id salah
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }
    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    // State untuk menyimpan data
    const [airData, setAirData] = useState<any[]>([]);
    const [tanahData, setTanahData] = useState<any[]>([]);
    const [suhuData, setSuhuData] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    // Fetch data dengan error handling
    const fetchData = async (endpoint: string, setData: any) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setData(Array.isArray(data.data) ? data.data : []);
            } else {
                console.error(`Error fetching ${endpoint} data:`, response.statusText);
                setData([]);
                setError(`Gagal mengambil data ${endpoint}`);
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint} data:`, error);
            setData([]);
            setError(`Terjadi kesalahan saat mengambil data ${endpoint}`);
        }
    };

    // Fungsi Fetch Data saat komponen dimuat
    useEffect(() => {
        fetchData("informasi-air", setAirData);
        fetchData("informasi-tanah", setTanahData);
        fetchData("informasi-suhu", setSuhuData);
    }, []);

    // Fungsi untuk menghapus data berdasarkan id
    const handleDelete = async (endpoint: string, id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                alert("Data berhasil dihapus!");
                fetchData(endpoint, endpoint === "informasi-air" ? setAirData :
                    endpoint === "informasi-tanah" ? setTanahData : setSuhuData);
            } else {
                console.error("Gagal menghapus data:", response.statusText);
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menghapus data:", error);
        }
    };

    return (
        <div className="p-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Tampilkan Data Air */}
            <h2 className="text-lg font-bold mb-4">Data Air</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Deskripsi</th>
                        <th className="py-2 px-4 border-b">ID Wilayah</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {airData.length > 0 ? (
                        airData.map((item: any) => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b">{item.id}</td>
                                <td className="py-2 px-4 border-b">{item.content}</td>
                                <td className="py-2 px-4 border-b">{item.wilayah_id}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete("informasi-air", item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Data Tanah */}
            <h2 className="text-lg font-bold mt-8 mb-4">Data Tanah</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Deskripsi</th>
                        <th className="py-2 px-4 border-b">ID Wilayah</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {tanahData.length > 0 ? (
                        tanahData.map((item: any) => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b">{item.id}</td>
                                <td className="py-2 px-4 border-b">{item.content}</td>
                                <td className="py-2 px-4 border-b">{item.wilayah_id}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete("informasi-tanah", item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Data Suhu */}
            <h2 className="text-lg font-bold mt-8 mb-4">Data Suhu</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Deskripsi</th>
                        <th className="py-2 px-4 border-b">ID Wilayah</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {suhuData.length > 0 ? (
                        suhuData.map((item: any) => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b">{item.id}</td>
                                <td className="py-2 px-4 border-b">{item.content}</td>
                                <td className="py-2 px-4 border-b">{item.wilayah_id}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete("informasi-suhu", item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

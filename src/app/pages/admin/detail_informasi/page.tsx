"use client";
import React, { useState, useEffect } from "react";

export default function Informasi() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }
    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    const [airData, setAirData] = useState<any[]>([]);
    const [tanahData, setTanahData] = useState<any[]>([]);
    const [suhuData, setSuhuData] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEndpoint, setCurrentEndpoint] = useState<string>("");
    const [error, setError] = useState<string>("");

    const fetchData = async (endpoint: string, setData: any) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            if (response.ok) {
                const data = await response.json();
                setData(Array.isArray(data.data) ? data.data : []);
            } else setError(`Gagal mengambil data ${endpoint}`);
        } catch (err) {
            setError(`Terjadi kesalahan saat mengambil data ${endpoint}`);
        }
    };

    const handleDelete = async (endpoint: string, id: number, setData: any) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}/${id}`, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            if (response.ok) {
                alert("Data berhasil dihapus!");
                fetchData(endpoint, setData);
            } else console.error("Gagal menghapus data");
        } catch {
            console.error("Terjadi kesalahan saat menghapus data");
        }
    };

    const handleEdit = (data: any, endpoint: string) => {
        setEditData(data);
        setCurrentEndpoint(endpoint);
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/${currentEndpoint}/${editData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    content: editData.content,
                    wilayah_id: editData.wilayah_id,
                }),
            });
            if (response.ok) {
                alert("Data berhasil diperbarui!");
                setIsEditing(false);
                if (currentEndpoint === "informasi-air") fetchData("informasi-air", setAirData);
                if (currentEndpoint === "informasi-tanah") fetchData("informasi-tanah", setTanahData);
                if (currentEndpoint === "informasi-suhu") fetchData("informasi-suhu", setSuhuData);
            } else console.error("Gagal memperbarui data");
        } catch {
            console.error("Terjadi kesalahan saat menyimpan data");
        }
    };

    useEffect(() => {
        fetchData("informasi-air", setAirData);
        fetchData("informasi-tanah", setTanahData);
        fetchData("informasi-suhu", setSuhuData);
    }, []);

    const renderTable = (data: any[], title: string, endpoint: string, setData: any) => (
        <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <table className="table-auto w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Deskripsi</th>
                        <th className="px-4 py-2 border">ID Wilayah</th>
                        <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{item.id}</td>
                                <td className="px-4 py-2 border">{item.content}</td>
                                <td className="px-4 py-2 border">{item.wilayah_id}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleEdit(item, endpoint)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(endpoint, item.id, setData)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

    return (
        <div className="p-6">
            <a href="http://localhost:3000/pages/admin/dashboard"><u>Dashboard</u></a> <br />
            {error && <p className="text-red-500">{error}</p>}
            {renderTable(airData, "Data Air", "informasi-air", setAirData)}
            {renderTable(tanahData, "Data Tanah", "informasi-tanah", setTanahData)}
            {renderTable(suhuData, "Data Suhu", "informasi-suhu", setSuhuData)}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Data</h2>
                        <label className="block mb-2">
                            Deskripsi:
                            <input
                                type="text"
                                value={editData.content}
                                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            ID Wilayah:
                            <input
                                type="number"
                                value={editData.wilayah_id}
                                onChange={(e) =>
                                    setEditData({ ...editData, wilayah_id: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveEdit}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

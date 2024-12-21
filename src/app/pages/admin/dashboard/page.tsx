"use client";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }
    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    // State untuk form wilayah
    const [wilayahData, setWilayahData] = useState<any[]>([]);
    const [currentWilayah, setCurrentWilayah] = useState<any>(null);
    const [isEditingWilayah, setIsEditingWilayah] = useState(false);
    const [newWilayahName, setNewWilayahName] = useState("");

    // State untuk form pangan
    const [panganData, setPanganData] = useState<any[]>([]);
    const [currentPangan, setCurrentPangan] = useState<any>(null);
    const [isEditingPangan, setIsEditingPangan] = useState(false);
    const [newPanganName, setNewPanganName] = useState("");

    // State untuk error
    const [error, setError] = useState<string>("");

    // Fetch data function
    const fetchData = async (endpoint: string, setData: any) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setData(data.data || []);
            } else {
                setError(`Gagal mengambil data ${endpoint}`);
            }
        } catch (err) {
            setError(`Terjadi kesalahan saat mengambil data ${endpoint}`);
        }
    };

    // Handle delete
    const handleDelete = async (endpoint: string, id: number, setData: any) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                alert("Data berhasil dihapus!");
                fetchData(endpoint, setData);
            } else {
                console.error("Gagal menghapus data");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menghapus data");
        }
    };

    // Handle edit
    const handleEdit = (data: any, endpoint: string) => {
        if (endpoint === "wilayah") {
            setCurrentWilayah(data);
            setIsEditingWilayah(true);
            setNewWilayahName(data.name);
        } else if (endpoint === "pangan") {
            setCurrentPangan(data);
            setIsEditingPangan(true);
            setNewPanganName(data.name);
        }
    };

    // Handle save edited wilayah
    const handleSaveEditWilayah = async () => {
        try {
            const response = await fetch(`http://localhost:8000/wilayah/${currentWilayah.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: newWilayahName,
                }),
            });

            if (response.ok) {
                alert("Data berhasil diperbarui!");
                setIsEditingWilayah(false);
                fetchData("wilayah", setWilayahData);
            } else {
                console.error("Gagal memperbarui data wilayah");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menyimpan data wilayah");
        }
    };

    // Handle save edited pangan
    const handleSaveEditPangan = async () => {
        try {
            const response = await fetch(`http://localhost:8000/pangan/${currentPangan.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: newPanganName,
                }),
            });

            if (response.ok) {
                alert("Data berhasil diperbarui!");
                setIsEditingPangan(false);
                fetchData("pangan", setPanganData);
            } else {
                console.error("Gagal memperbarui data pangan");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menyimpan data pangan");
        }
    };

    // Handle create new wilayah
    const handleCreateWilayah = async () => {
        try {
            const response = await fetch("http://localhost:8000/wilayah", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: newWilayahName,
                }),
            });

            if (response.ok) {
                alert("Data wilayah berhasil ditambahkan!");
                setNewWilayahName(""); // Reset input
                fetchData("wilayah", setWilayahData);
            } else {
                console.error("Gagal menambahkan data wilayah");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menambahkan data wilayah");
        }
    };

    // Handle create new pangan
    const handleCreatePangan = async () => {
        try {
            const response = await fetch("http://localhost:8000/pangan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: newPanganName,
                }),
            });

            if (response.ok) {
                alert("Data pangan berhasil ditambahkan!");
                setNewPanganName(""); // Reset input
                fetchData("pangan", setPanganData);
            } else {
                console.error("Gagal menambahkan data pangan");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menambahkan data pangan");
        }
    };

    // Fetch data for wilayah and pangan on component mount
    useEffect(() => {
        fetchData("wilayah", setWilayahData);
        fetchData("pangan", setPanganData);
    }, []);

    return (
        <div>
            {/* Error Display */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Input Form for Wilayah */}
            <div className="mt-4">
                <h3>Tambah Wilayah</h3>
                <input
                    type="text"
                    value={newWilayahName}
                    onChange={(e) => setNewWilayahName(e.target.value)}
                    placeholder="Nama Wilayah"
                    className="p-2 border"
                />
                <button onClick={handleCreateWilayah} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                    Tambah Wilayah
                </button>
            </div>

            {/* Input Form for Pangan */}
            <div className="mt-4">
                <h3>Tambah Pangan</h3>
                <input
                    type="text"
                    value={newPanganName}
                    onChange={(e) => setNewPanganName(e.target.value)}
                    placeholder="Nama Pangan"
                    className="p-2 border"
                />
                <button onClick={handleCreatePangan} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                    Tambah Pangan
                </button>
            </div>

            {/* Render Wilayah Table */}
            <div className="mt-8">
                <h2>Wilayah</h2>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Wilayah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wilayahData.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={() => handleEdit(item, "wilayah")}>Edit</button>
                                    <button onClick={() => handleDelete("wilayah", item.id, setWilayahData)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render Pangan Table */}
            <div className="mt-8">
                <h2>Pangan</h2>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Pangan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panganData.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={() => handleEdit(item, "pangan")}>Edit</button>
                                    <button onClick={() => handleDelete("pangan", item.id, setPanganData)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Editing Wilayah */}
            {isEditingWilayah && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2>Edit Wilayah</h2>
                        <input
                            type="text"
                            value={newWilayahName}
                            onChange={(e) => setNewWilayahName(e.target.value)}
                            className="p-2 border"
                        />
                        <div className="mt-4">
                            <button
                                onClick={handleSaveEditWilayah}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditingWilayah(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Editing Pangan */}
            {isEditingPangan && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2>Edit Pangan</h2>
                        <input
                            type="text"
                            value={newPanganName}
                            onChange={(e) => setNewPanganName(e.target.value)}
                            className="p-2 border"
                        />
                        <div className="mt-4">
                            <button
                                onClick={handleSaveEditPangan}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditingPangan(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

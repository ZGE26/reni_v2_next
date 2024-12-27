"use client";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }
    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    const logout = () => {
        if (localStorage.getItem("token") != null) {
            localStorage.removeItem('token');
        }
    }

    // State untuk form wilayah
    const [wilayahData, setWilayahData] = useState<any[]>([]);
    const [currentWilayah, setCurrentWilayah] = useState<any>(null);
    const [isEditingWilayah, setIsEditingWilayah] = useState(false);
    const [newWilayahName, setNewWilayahName] = useState("");
    const [editedWilayahName, setEditedWilayahName] = useState("");

    // State untuk form pangan
    const [panganData, setPanganData] = useState<any[]>([]);
    const [currentPangan, setCurrentPangan] = useState<any>(null);
    const [isEditingPangan, setIsEditingPangan] = useState(false);
    const [newPanganName, setNewPanganName] = useState("");
    const [editedPanganName, setEditedPanganName] = useState("");

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
            setEditedWilayahName(data.name); // Gunakan editedWilayahName
        } else if (endpoint === "pangan") {
            setCurrentPangan(data);
            setIsEditingPangan(true);
            setEditedPanganName(data.name); // Gunakan editedPanganName
        }
    };
    

    const handleSaveEditWilayah = async () => {
        try {
            const response = await fetch(`http://localhost:8000/wilayah/${currentWilayah.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: editedWilayahName, // Gunakan editedWilayahName
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
    
    const handleSaveEditPangan = async () => {
        try {
            const response = await fetch(`http://localhost:8000/pangan/${currentPangan.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: editedPanganName, // Gunakan editedPanganName
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
        <div className="container mx-auto p-6">
            {/* Error Display */}
            {error && <p className="text-red-500">{error}</p>}
            <a href="http://localhost:3000/pages/admin/detail_informasi"><u>Detail Informasi</u></a> <br />
            <a href="http://localhost:3000/pages/admin/informasi"><u>Informasi</u></a> <br />
            <a href="http://localhost:3000/pages/admin/artikel"><u>Artikel</u></a> <br />
            <a onClick={logout}  href="/pages/login"><u>Logout</u></a>
            {/* Input Form for Wilayah */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Tambah Wilayah</h3>
                <input
                    type="text"
                    value={newWilayahName}
                    onChange={(e) => setNewWilayahName(e.target.value)}
                    placeholder="Nama Wilayah"
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleCreateWilayah}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                    Tambah Wilayah
                </button>
            </div>

            {/* Input Form for Pangan */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Tambah Pangan</h3>
                <input
                    type="text"
                    value={newPanganName}
                    onChange={(e) => setNewPanganName(e.target.value)}
                    placeholder="Nama Pangan"
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleCreatePangan}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                    Tambah Pangan
                </button>
            </div>

            {/* Render Wilayah Table */}
            <div className="mt-8">
            <h3 className="text-lg font-bold">Data Wilayah</h3>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wilayahData.map((wilayah) => (
                            <tr key={wilayah.id}>
                                <td className="border px-4 py-2">{wilayah.id}</td>
                                <td className="border px-4 py-2">{wilayah.name}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(wilayah, "wilayah")}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete("wilayah", wilayah.id, setWilayahData)}
                                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render Pangan Table */}
            <div className="mt-8">
                <h3 className="text-lg font-bold">Data Pangan</h3>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panganData.map((pangan) => (
                            <tr key={pangan.id}>
                                <td className="border px-4 py-2">{pangan.id}</td>
                                <td className="border px-4 py-2">{pangan.name}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(pangan, "pangan")}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete("pangan", pangan.id, setPanganData)}
                                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Form Edit Wilayah */}
            {isEditingWilayah && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Edit Wilayah</h3>
                    <input
                        type="text"
                        value={editedWilayahName}
                        onChange={(e) => setEditedWilayahName(e.target.value)}
                        placeholder="Nama Wilayah"
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handleSaveEditWilayah}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>
                </div>
            )}

            {/* Form Edit Pangan */}
            {isEditingPangan && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Edit Pangan</h3>
                    <input
                        type="text"
                        value={editedPanganName}
                        onChange={(e) => setEditedPanganName(e.target.value)}
                        placeholder="Nama Pangan"
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handleSaveEditPangan}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>
                </div>
            )}

        </div>
    );
}

"use client"
import React, { useState, useEffect } from "react";

export default function Artikel() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }
    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    const [newArtikel, setNewArtikel] = useState<{
        title: string;
        content: string;
        image: string | null;
        category: string;
    }>({
        title: "",
        content: "",
        image: null,
        category: "",
    });

    const [artikelData, setArtikelData] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    const handleChangeArtikel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewArtikel({
            ...newArtikel,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setNewArtikel((prevState) => ({
                        ...prevState,
                        image: reader.result as string,
                    }));
                };
                reader.onerror = (error) => {
                    console.error("Error reading file:", error);
                };
            }
        }
    };

    const handleSubmitArtikel = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const artikelData = {
                ...newArtikel,
            };

            const response = await fetch("http://localhost:8000/artikel", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(artikelData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Artikel berhasil ditambahkan!");
                fetchArtikelData(); // Refresh the artikel list
            } else {
                alert(`Gagal: ${result.message}`);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat menambahkan artikel.");
        }
    };

    const fetchArtikelData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/artikel`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setArtikelData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError("Gagal mengambil data artikel.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil artikel.");
        }
    };

    const handleUpdateArtikel = async (artikelId: number) => {
        const updatedArtikel = {
            ...newArtikel,
        };

        try {
            const response = await fetch(`http://localhost:8000/artikel/${artikelId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedArtikel),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Artikel berhasil diperbarui!");
                fetchArtikelData(); // Refresh the artikel list
            } else {
                alert(`Gagal memperbarui artikel: ${result.message}`);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat memperbarui artikel.");
        }
    };

    const handleDeleteArtikel = async (artikelId: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            try {
                const response = await fetch(`http://localhost:8000/artikel/${artikelId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Artikel berhasil dihapus!");
                    fetchArtikelData(); // Refresh the artikel list
                } else {
                    alert(`Gagal menghapus artikel: ${result.message}`);
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                alert("Terjadi kesalahan saat menghapus artikel.");
            }
        }
    };

    useEffect(() => {
        fetchArtikelData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <a href="http://localhost:3000/pages/admin/dashboard"><u>Dashboard</u></a> <br />
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Artikel</h2>
            <form onSubmit={handleSubmitArtikel} encType="multipart/form-data" className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Judul:</label>
                    <input
                        type="text"
                        name="title"
                        value={newArtikel.title}
                        onChange={handleChangeArtikel}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Konten:</label>
                    <textarea
                        name="content"
                        value={newArtikel.content}
                        onChange={(e) => setNewArtikel({ ...newArtikel, content: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Gambar (Upload):</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori:</label>
                    <input
                        type="text"
                        name="category"
                        value={newArtikel.category}
                        onChange={handleChangeArtikel}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                    Tambah Artikel
                </button>
            </form>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">List Artikel</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Judul Artikel</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Content</th>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {artikelData.length > 0 ? (
                        artikelData.map((artikel: any) => (
                            <tr key={artikel.id} className="border-t">
                                <td className="px-6 py-4">{artikel.id}</td>
                                <td className="px-6 py-4">{artikel.title}</td>
                                <td className="px-6 py-4">{artikel.category}</td>
                                <td className="px-6 py-4">{artikel.content}</td>
                                <td className="px-6 py-4">
                                    <img src={`http://localhost:8000/${artikel.image}`} width={100} height={100} alt="Artikel" className="rounded-md" />
                                </td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateArtikel(artikel.id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteArtikel(artikel.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                Tidak ada data artikel.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

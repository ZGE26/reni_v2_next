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
        image: string | null;  // Change the type to string
        category: string;
        user_id: string;
    }>({
        title: "",
        content: "",
        image: null,  // Initialize as null
        category: "",
        user_id: "",
    });

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
                        image: reader.result as string,  // Set the base64 string
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
            // You already have the image as a base64 string in the `newArtikel.image`
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
            console.log(result);
            if (response.ok) {
                alert("Artikel berhasil ditambahkan!");
            } else {
                alert(`Gagal: ${result.message}`);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat menambahkan artikel.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Tambah Artikel</h2>
            <form onSubmit={handleSubmitArtikel} className="space-y-4">
                <div>
                    <label className="block mb-1">Judul:</label>
                    <input
                        type="text"
                        name="title"
                        value={newArtikel.title}
                        onChange={handleChangeArtikel}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Konten:</label>
                    <textarea
                        name="content"
                        value={newArtikel.content}
                        onChange={(e) => setNewArtikel({ ...newArtikel, content: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1">Gambar (Upload):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}  // Use the new handler
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Kategori:</label>
                    <input
                        type="text"
                        name="category"
                        value={newArtikel.category}
                        onChange={handleChangeArtikel}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tambah Artikel
                </button>
            </form>
        </div>
    );
}

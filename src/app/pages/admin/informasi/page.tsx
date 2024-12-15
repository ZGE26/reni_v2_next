"use client";
import React, { useState } from "react";

export default function Informasi() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }

    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    // State untuk setiap form
    const [airData, setAirData] = useState({
        content: "",
        wilayah_id: "",
    });

    const [tanahData, setTanahData] = useState({
        content: "",
        wilayah_id: "",
    });

    const [suhuData, setSuhuData] = useState({
        content: "",
        wilayah_id: "",
    });

    // Fungsi untuk menangani perubahan input pada form air
    const handleAirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAirData({
            ...airData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani perubahan input pada form tanah
    const handleTanahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTanahData({
            ...tanahData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani perubahan input pada form suhu
    const handleSuhuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSuhuData({
            ...suhuData,
            [name]: value,
        });
    };

    // Fungsi untuk submit form air
    const handleSubmitAir = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData("http://localhost:8000/informasi-air", airData, "Input Air Berhasil");
    };

    // Fungsi untuk submit form tanah
    const handleSubmitTanah = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData("http://localhost:8000/informasi-tanah", tanahData, "Input Tanah Berhasil");
    };

    // Fungsi untuk submit form suhu
    const handleSubmitSuhu = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData("http://localhost:8000/informasi-suhu", suhuData, "Input Suhu Berhasil");
    };

    // Fungsi umum untuk submit data
    const submitData = async (url: string, data: object, successMessage: string) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert(successMessage);
                window.location.reload();
            } else {
                console.error(response);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during input:", error);
            alert("Terjadi kesalahan saat input data.");
        }
    };

    return (
        <div>
            {/* Form Air */}
            <form onSubmit={handleSubmitAir}>
                <h2 className="text-lg font-bold mb-4">Form Informasi Air</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={airData.content}
                        placeholder="Masukkan Deskripsi"
                        onChange={handleAirChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={airData.wilayah_id}
                        placeholder="Masukkan ID Wilayah"
                        onChange={handleAirChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                >
                    Submit
                </button>
            </form>

            {/* Form Tanah */}
            <form onSubmit={handleSubmitTanah}>
                <h2 className="text-lg font-bold mt-8 mb-4">Form Informasi Tanah</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={tanahData.content}
                        placeholder="Masukkan Deskripsi"
                        onChange={handleTanahChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={tanahData.wilayah_id}
                        placeholder="Masukkan ID Wilayah"
                        onChange={handleTanahChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                >
                    Submit
                </button>
            </form>

            {/* Form Suhu */}
            <form onSubmit={handleSubmitSuhu}>
                <h2 className="text-lg font-bold mt-8 mb-4">Form Informasi Suhu</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={suhuData.content}
                        placeholder="Masukkan Deskripsi"
                        onChange={handleSuhuChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={suhuData.wilayah_id}
                        placeholder="Masukkan ID Wilayah"
                        onChange={handleSuhuChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

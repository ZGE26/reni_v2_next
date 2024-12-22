"use client";
import React, { useState } from "react";

export default function Informasi() {
    // Redirect jika token atau role_id tidak sesuai
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

    // Handler perubahan input
    const handleAirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAirData({ ...airData, [name]: value });
    };

    const handleTanahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTanahData({ ...tanahData, [name]: value });
    };

    const handleSuhuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSuhuData({ ...suhuData, [name]: value });
    };

    // Fungsi submit data
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
            if (response.ok) {
                alert(successMessage);
                window.location.reload();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat input data.");
        }
    };

    // Fungsi submit untuk setiap form
    const handleSubmitAir = (e: React.FormEvent) => {
        e.preventDefault();
        submitData("http://localhost:8000/informasi-air", airData, "Input Air Berhasil");
    };

    const handleSubmitTanah = (e: React.FormEvent) => {
        e.preventDefault();
        submitData("http://localhost:8000/informasi-tanah", tanahData, "Input Tanah Berhasil");
    };

    const handleSubmitSuhu = (e: React.FormEvent) => {
        e.preventDefault();
        submitData("http://localhost:8000/informasi-suhu", suhuData, "Input Suhu Berhasil");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <a href="http://localhost:3000/pages/admin/dashboard"><u>Dashboard</u></a> <br />
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Form Informasi Data
            </h1>

            {/* Form Informasi Air */}
            <form onSubmit={handleSubmitAir} className="mb-8 bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Informasi Air</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={airData.content}
                        onChange={handleAirChange}
                        placeholder="Masukkan Deskripsi"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={airData.wilayah_id}
                        onChange={handleAirChange}
                        placeholder="Masukkan ID Wilayah"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </form>

            {/* Form Informasi Tanah */}
            <form onSubmit={handleSubmitTanah} className="mb-8 bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Informasi Tanah</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={tanahData.content}
                        onChange={handleTanahChange}
                        placeholder="Masukkan Deskripsi"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={tanahData.wilayah_id}
                        onChange={handleTanahChange}
                        placeholder="Masukkan ID Wilayah"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </form>

            {/* Form Informasi Suhu */}
            <form onSubmit={handleSubmitSuhu} className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Informasi Suhu</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Deskripsi</label>
                    <input
                        type="text"
                        name="content"
                        value={suhuData.content}
                        onChange={handleSuhuChange}
                        placeholder="Masukkan Deskripsi"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">ID Wilayah</label>
                    <input
                        type="number"
                        name="wilayah_id"
                        value={suhuData.wilayah_id}
                        onChange={handleSuhuChange}
                        placeholder="Masukkan ID Wilayah"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

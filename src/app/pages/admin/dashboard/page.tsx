"use client";
import React, { useState } from "react";

export default function Dashboard() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }

    if (localStorage.getItem("role_id") !== "1") {
        window.location.href = "/pages/users/dashboard";
    }

    // State untuk form wilayah
    const [wilayahData, setWilayahData] = useState({
        name: "",
    });

    // State untuk form pangan
    const [panganData, setPanganData] = useState({
        name: "",
    });

    // Fungsi untuk menangani perubahan input form wilayah
    const handleWilayahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWilayahData({
            ...wilayahData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani perubahan input form pangan
    const handlePanganChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPanganData({
            ...panganData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani pengiriman form wilayah
    const handleWilayahSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/wilayah", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(wilayahData),
            });

            const result = await response.json();

            console.log(result);

            if (response.ok) {
                alert("Input Wilayah Berhasil");
                window.location.reload();
            } else {
                console.log(response);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during input:", error);
            alert("Terjadi kesalahan saat input wilayah.");
        }
    };

    // Fungsi untuk menangani pengiriman form pangan
    const handlePanganSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/pangan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(panganData),
            });

            const result = await response.json();

            console.log(result);

            if (response.ok) {
                alert("Input Pangan Berhasil");
                window.location.reload();
            } else {
                console.log(response);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during input:", error);
            alert("Terjadi kesalahan saat input pangan.");
        }
    };

    return (
        <div>
            {/* Form Wilayah */}
            <form onSubmit={handleWilayahSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Nama Wilayah
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="input_name"
                        value={wilayahData.name}
                        placeholder="Masukkan Nama Wilayah"
                        onChange={handleWilayahChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Form Pangan */}
            <form onSubmit={handlePanganSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Nama Pangan
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="input_name"
                        value={panganData.name}
                        placeholder="Masukkan Nama Pangan"
                        onChange={handlePanganChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <a href="/pages/admin/informasi">Halaman Informasi Wilayah</a>
        </div>
    );
}

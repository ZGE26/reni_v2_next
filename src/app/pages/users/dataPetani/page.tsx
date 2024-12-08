"use client";
import Navbar from "@/components_dashboard/Navbar";
import React from 'react';
import Link from 'next/link';
import { useState } from "react";

export default function DataPetani() {

    // Handler Agar Harus Login Terlebih Dahulu Jika Ke Halaman Ini
    if(localStorage.getItem("token") === null) {
        window.location.href = "/pages/login"
    }

    const [formatData, setFormatData] = useState({
        user_id: "",
        luas_lahan: "",
        lokasi: "",
        name: "",
        wilayah_id: "",
    });

    // Fungsi untuk menangani perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormatData({
            ...formatData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani pengiriman formulir
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kirim data ke API untuk registrasi
        try {
            const response = await fetch("http://localhost:8000/lahan", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formatData),
            });

            const result = await response.json();

            if (response.ok) {
                // Menampilkan pesan sukses
                alert("Input Lahan Berhasil!");
                console.log(result)
                // window.location.href = "/pages/users/dashboard";
            } else {
                // Menampilkan pesan error
                console.log(result)
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during input lahan:", error);
            alert("Terjadi kesalahan saat melakukan input lahan.");
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

            <label>Name</label>
            <input 
                type="text"
                name="name"
                value={formatData.name}
                placeholder="Masukkan Nama Lahan"
                onChange={handleChange}
            />

            <br />

            <label>Wilayah</label>
            <input 
                type="number"
                name="wilayah_id"
                value={formatData.wilayah_id}
                placeholder="Masukkan ID Wilayah"
                onChange={handleChange}
            />

            <br />

            {/* Submit Button */}
            <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                        >
                            Submit
                        </button>
                    </div>

            </form>
            


        </div>
    );
}
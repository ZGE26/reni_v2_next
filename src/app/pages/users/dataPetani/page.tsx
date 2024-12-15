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

    const [dataPanen, setPanen] = useState({
        tanggal_penanaman: "",
        tanggal_panen: "",
        pangan_id: "",
        user_id: "",
        hasil_panen: "",
        lahan_id: "",
    });

    // Fungsi untuk menangani perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormatData({
            ...formatData,
            [name]: value,
        });
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPanen({
            ...dataPanen,
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

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kirim data ke API untuk registrasi
        try {
            const response = await fetch("http://localhost:8000/data-panen", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPanen),
            });

            const result = await response.json();

            if (response.ok) {
                // Menampilkan pesan sukses
                alert("Input Data Panen Berhasil!");
                console.log(result)
                // window.location.href = "/pages/users/dashboard";
            } else {
                // Menampilkan pesan error
                console.log(result)
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during input lahan:", error);
            alert("Terjadi kesalahan saat melakukan input data.");
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

            <h2>Input Data Panen</h2>
            
            <form onSubmit={handleSubmit2}>
            {/* Tanggal Penanaman */}
            <label>Tanggal Penanaman</label>
            <input
                type="date"
                name="tanggal_penanaman"
                value={dataPanen.tanggal_penanaman}
                placeholder="Masukkan Tanggal Penanaman"
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <br />

            {/* Tanggal Panen */}
            <label>Tanggal Panen</label>
            <input
                type="date"
                name="tanggal_panen"
                value={dataPanen.tanggal_panen}
                placeholder="Masukkan Tanggal Panen"
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <br />

            {/* Pangan ID */}
            <label>Pangan ID</label>
            <input
                type="number"
                name="pangan_id"
                value={dataPanen.pangan_id}
                placeholder="Masukkan Pangan ID"
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <br />

            {/* Hasil Panen */}
            <label>Hasil Panen</label>
            <input
                type="number"
                name="hasil_panen"
                value={dataPanen.hasil_panen}
                placeholder="Masukkan Hasil Panen"
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <br />

            {/* Lahan ID */}
            <label>Lahan ID</label>
            <input
                type="number"
                name="lahan_id"
                value={dataPanen.lahan_id}
                placeholder="Masukkan Lahan ID"
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
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
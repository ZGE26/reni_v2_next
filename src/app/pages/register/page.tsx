"use client";

import React from "react";
import { useState } from "react";


export default function Register() {
    const [formatData, setFormatData] = useState({
        name: "",
        no_ktp: "",
        password: "",
        password_confirmation: "",
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

        // Validasi: pastikan password dan konfirmasi password cocok
        if (formatData.password !== formatData.password_confirmation) {
            alert("Password dan Konfirmasi Password tidak cocok.");
            return;
        }

        // Kirim data ke API untuk registrasi
        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formatData),
            });

            const result = await response.json();

            if (response.ok) {
                // Menampilkan pesan sukses
                alert("Registrasi berhasil!");
                window.location.href = "/pages/login";
            } else {
                // Menampilkan pesan error
                console.log(response)
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Terjadi kesalahan saat registrasi.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-green-500 p-5">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registration</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                // required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="name"
                                value={formatData.name}
                                placeholder="Enter your username"
                                onChange={handleChange}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">NIK</label>
                            <input
                                type="number"
                                name="no_ktp"
                                value={formatData.no_ktp}
                                placeholder="Masukkan Nomor KTP"
                                onChange={handleChange}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter your number"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formatData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={formatData.password_confirmation}
                                placeholder="Confirm your password"
                                onChange={handleChange}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md text-lg font-medium hover:bg-gradient-to-l transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

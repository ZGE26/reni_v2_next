"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from "react";

export default function Login() {
    const [formatData, setFormatData] = useState({
        no_ktp: "",
        password: "",
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
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formatData),
            });

            const result = await response.json();

            if (response.ok) {
                // Menampilkan pesan sukses
                console.log(result.token)
                localStorage.setItem('token', result.token);
                alert("Login berhasil!");
                window.location.href = "/pages/users/dashboard";
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-500 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">No KTP</label>
                        <input
                            type="number"
                            name='no_ktp'
                            value={formatData.no_ktp}
                            placeholder="Masukkan NIK"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={formatData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:bg-gradient-to-l"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Link to Register Page */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/pages/register" className="text-green-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

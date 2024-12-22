"use client";
import Navbar from "@/components_dashboard/Navbar";
import React, { useState, useEffect } from "react";

export default function Informasi() {
    if (localStorage.getItem("token") === null) {
        window.location.href = "/pages/login";
    }

    // State untuk semua jenis data
    const [airData, setAirData] = useState<any[]>([]);
    const [tanahData, setTanahData] = useState<any[]>([]);
    const [suhuData, setSuhuData] = useState<any[]>([]);
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
                setData(Array.isArray(data.data) ? data.data : []);
            } else {
                setError(`Gagal mengambil data ${endpoint}`);
            }
        } catch (err) {
            setError(`Terjadi kesalahan saat mengambil data ${endpoint}`);
        }
    };

    useEffect(() => {
        fetchData("informasi-air", setAirData);
        fetchData("informasi-tanah", setTanahData);
        fetchData("informasi-suhu", setSuhuData);
    }, []);

    const renderTable = (data: any[], title: string) => (
        <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Deskripsi</th>
                        <th>ID Wilayah</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.content}</td>
                                <td>{item.wilayah_id}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="p-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Render Semua Tabel */}
            {renderTable(airData, "Data Air")}
            {renderTable(tanahData, "Data Tanah")}
            {renderTable(suhuData, "Data Suhu")}
            </div>
        </div>
    );
}

"use client";

import Navbar from "@/components_dashboard/Navbar";
import Footer from "@/components/Footer";
import ChartDonut from "@/components_dashboard/ChartDonut";
import Menu from "@/components_dashboard/Menu";
import DaftarPetani from "@/components_dashboard/DaftarPetani";
import { pertanianData, getRandomColor } from '@/app/pages/data/DataBayangan';
import React, { useState, useEffect } from "react";

export default function Dashboard() {
    // Buat warna acak untuk setiap item di petaniData
    const colors = pertanianData.petaniData.map(() => getRandomColor());
    if(localStorage.getItem("token") === null) {
        window.location.href = "/pages/login"
    }

    const [artikelData, setArtikelData] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

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

    useEffect(() => {
            fetchArtikelData();
        }, []);

    return (
        <div>
            <Navbar />
            <div className="p-2 flex flex-wrap w-full gap-2 flex-col md:flex-row">
                <div className="flex-1">
                    {/* Pastikan untuk mengirim petaniData dan colors ke ChartDonut */}
                    <ChartDonut petaniData={pertanianData.petaniData} colors={colors} />
                </div>
                <div className="flex-1">
                    <DaftarPetani />
                </div>
            </div>
            {/* <Menu /> */}
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">List Artikel</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Judul Artikel</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Content</th>
                    <th className="px-6 py-3 text-left">Image</th>
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
            <Footer />
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { pertanianData } from '@/app/pages/data/DataBayangan';

// Interface untuk tipe data pertanian
interface DataPertanian {
    jenisTanaman: string;
    luasLahan: number; // dalam hektar
    hasilPanen: number; // dalam kg
    kondisiCuaca: string;
    tanggal: string;
    namaLahan: string;
    jenis_tanaman: string;
    luas_lahan: string;
    total_panen: string;
}

const AnalysisSummary: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('1-3'); // Default: bulan 1-3

    // Mengakses data dari pertanianData
    const dataPertanian = pertanianData.dataPertanian.map((item: any) => ({
        jenisTanaman: item.jenisTanaman,
        luasLahan: item.luasLahan,
        hasilPanen: item.hasilPanen,
        kondisiCuaca: item.kondisiCuaca,
        tanggal: item.tanggal,
        namaLahan: item.namaLahan,
        jenis_tanaman: item.jenisTanamanLahan,
        luas_lahan: item.luasLahanStr,
        total_panen: item.totalPanenStr,
    }));

    // Fungsi untuk menghitung total luas lahan, total hasil panen, dan rata-rata hasil panen per hektar
    const calculateAnalysis = (data: DataPertanian[]) => {
        let totalLuasLahan = 0;
        let totalHasilPanen = 0;
        let totalHasilPerHektar = 0;

        data.forEach(item => {
            totalLuasLahan += item.luasLahan;
            totalHasilPanen += item.hasilPanen;
            totalHasilPerHektar += (item.hasilPanen / item.luasLahan);
        });

        const rataHasilPerHektar = totalHasilPerHektar / data.length;

        return {
            totalLuasLahan,
            totalHasilPanen,
            rataHasilPerHektar,
        };
    };

    // Fungsi untuk memberikan saran pembagian lahan berdasarkan hasil per hektar
    const suggestLandAllocation = (data: DataPertanian[]) => {
        const sortedData = data.sort((a, b) => b.hasilPanen / b.luasLahan - a.hasilPanen / a.luasLahan);

        let suggestions: any[] = [];
        sortedData.forEach(item => {
            suggestions.push({
                namaLahan: item.namaLahan,
                jenisTanaman: item.jenis_tanaman,
                hasilPerHektar: (item.hasilPanen / item.luasLahan).toFixed(2),
            });
        });

        return suggestions;
    };

    // Fungsi untuk mengelompokkan data berdasarkan jenis tanaman
    const groupDataByJenisTanaman = (data: DataPertanian[]) => {
        return data.reduce((acc, item) => {
            if (!acc[item.jenisTanaman]) {
                acc[item.jenisTanaman] = [];
            }
            acc[item.jenisTanaman].push(item);
            return acc;
        }, {} as { [key: string]: DataPertanian[] });
    };

    // Fungsi untuk memfilter data berdasarkan bulan yang dipilih
    const filterDataByPeriod = (data: DataPertanian[], period: string) => {
        const currentDate = new Date();
        const [startMonth, endMonth] = period.split('-').map(Number);

        return data.filter(item => {
            const itemDate = new Date(item.tanggal);
            const itemMonth = itemDate.getMonth() + 1; // getMonth() is 0-indexed, so add 1
            return itemMonth >= startMonth && itemMonth <= endMonth;
        });
    };

    // Menghitung hasil analisis berdasarkan periode yang dipilih
    const filteredData = filterDataByPeriod(dataPertanian, selectedPeriod);
    const analysisResult = calculateAnalysis(filteredData);
    const landSuggestions = suggestLandAllocation(filteredData);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Hasil Analisis</h2>

            {/* Dropdown untuk memilih periode */}
            <div className="mb-4">
                <label htmlFor="period" className="block text-gray-700 font-semibold">Pilih Periode (Bulan):</label>
                <select
                    id="period"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded-md"
                >
                    <option value="1-3">Bulan 1 - 3</option>
                    <option value="4-6">Bulan 4 - 6</option>
                    <option value="7-9">Bulan 7 - 9</option>
                    <option value="10-12">Bulan 10 - 12</option>
                </select>
            </div>

            {/* Total Analisis Secara Keseluruhan */}
            <p className="text-gray-700 mb-2">
                Total Luas Lahan: <strong>{analysisResult.totalLuasLahan.toFixed(2)} ha</strong>
            </p>
            <p className="text-gray-700 mb-2">
                Total Hasil Panen: <strong>{analysisResult.totalHasilPanen.toFixed(2)} kg</strong>
            </p>
            <p className="text-gray-700 mb-2">
                Rata-rata Hasil Panen per Hektar: <strong>{analysisResult.rataHasilPerHektar.toFixed(2)} kg/ha</strong>
            </p>

            {/* Saran Pembagian Lahan dalam bentuk Tabel */}
            <h3 className="text-lg font-semibold mt-4 text-gray-800">Saran Pembagian Lahan:</h3>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-300">Nama Lahan</th>
                            <th className="px-4 py-2 border border-gray-300">Jenis Tanaman</th>
                            <th className="px-4 py-2 border border-gray-300">Hasil Panen per Hektar (kg/ha)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {landSuggestions.map((suggestion, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-gray-300">{suggestion.namaLahan}</td>
                                <td className="px-4 py-2 border border-gray-300">{suggestion.jenisTanaman}</td>
                                <td className="px-4 py-2 border border-gray-300">{suggestion.hasilPerHektar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Menampilkan Data Berdasarkan Kategori (Jenis Tanaman) */}
            <div className="mt-6">
                {Object.keys(groupDataByJenisTanaman(filteredData)).map((jenisTanaman) => (
                    <div key={jenisTanaman}>
                        <h4 className="text-lg font-semibold mt-4">Kategori: {jenisTanaman}</h4>
                        <div className="ml-4">
                            <p>Total Luas Lahan: <strong>{calculateAnalysis(groupDataByJenisTanaman(filteredData)[jenisTanaman]).totalLuasLahan.toFixed(2)} ha</strong></p>
                            <p>Total Hasil Panen: <strong>{calculateAnalysis(groupDataByJenisTanaman(filteredData)[jenisTanaman]).totalHasilPanen.toFixed(2)} kg</strong></p>
                            <p>Rata-rata Hasil Panen per Hektar: <strong>{calculateAnalysis(groupDataByJenisTanaman(filteredData)[jenisTanaman]).rataHasilPerHektar.toFixed(2)} kg/ha</strong></p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-700 mt-4">
                Berdasarkan analisis ini, hasil rata-rata per hektar dan indikator tambahan dapat digunakan sebagai acuan untuk meningkatkan produktivitas dan efisiensi pertanian.
            </p>
        </div>
    );
};

export default AnalysisSummary;

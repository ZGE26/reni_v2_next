"use client";

import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

// Fungsi untuk menghasilkan warna acak
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Chart: React.FC<{ showData?: boolean }> = ({ showData: initialShowData = false }) => {
    // Data statis yang akan digunakan
    const series = [65, 34, 45, 12, 10, 20, 15, 8, 25, 30]; // Persentase dari tanaman
    const labels = [
        "Padi",
        "Jagung",
        "Kedelai",
        "Umbi",
        "Cabai",
        "Tomat",
        "Wortel",
        "Bawang",
        "Sawi",
        "Bayam",
    ]; // Nama tanaman

    const daerah = "Bandung";

    const namaPetani = ["Arya", "Budi", "Cahya", "Dewi", "Eka", "Adit","Budi", "Gojali"]; // Nama petani

    // Menghasilkan array warna berdasarkan jumlah data
    const colors = Array.from({ length: series.length }, getRandomColor);

    // State untuk mengendalikan tampilan data tanaman
    const [showData, setShowData] = useState(initialShowData);

    // Konfigurasi opsi chart
    const options: ApexOptions = {
        chart: {
            fontFamily: "Satoshi, sans-serif",
            type: "donut",
        },
        colors: colors,
        legend: {
            show: false,
            position: "bottom",
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                    background: "transparent",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (val, { seriesIndex }) => `${labels[seriesIndex]}: ${val}%`,
            },
        },
        responsive: [
            {
                breakpoint: 2600,
                options: {
                    chart: {
                        width: 380,
                    },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    };

    return (
        <div className="flex gap-4 m-2">
            {/* Komponen Chart */}
            <div className="w-full sm:w-1/2 lg:w-2/3 xl:w-3/4 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default">
                <div className="mb-3 text-center">
                    <h5 className="text-2xl font-semibold text-black">
                        Data Tanaman Pada Daerah {daerah}
                    </h5>
                </div>

                {/* Render chart */}
                <div id="chartThree" className="mx-auto flex justify-center mb-2">
                    <ReactApexChart options={options} series={series} type="donut" />
                </div>

                {/* Kondisi untuk menampilkan data tanaman */}
                {showData && (
                    <div className="flex flex-wrap items-center justify-center gap-y-3 -mx-8">
                        {series.map((value, index) => (
                            <div className="w-full px-8 sm:w-1/2" key={index}>
                                <div className="flex items-center justify-center px-5 sm:px-12">
                                    <span
                                        className="mr-2 h-3 w-full max-w-3 rounded-full"
                                        style={{ backgroundColor: colors[index] }}
                                    ></span>
                                    <p className="w-3/4 flex justify-between text-sm font-medium text-black">
                                        <span>{labels[index]}</span>
                                        <span>{value}%</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Komponen Lain yang akan ditempatkan di samping */}
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default">
                <div className="mb-3 text-center">
                    <h5 className="text-base sm:text-2xl font-semibold text-black">
                        Daftar Petani Di Daerah {daerah}
                    </h5>
                </div>
                {/* Konten komponen lain */}
                <div>
                    <ul className="max-h-60 overflow-y-auto">
                        {namaPetani.map((nama, index) => (
                            <li key={index} className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                                <span className="text-sm line-clamp-1 font-medium">{nama}</span>
                                <span><a href="#" className="hover:text-blue-500">Detail</a></span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Chart;


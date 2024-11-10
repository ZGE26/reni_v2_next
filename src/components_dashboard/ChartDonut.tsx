"use client";

import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface PetaniData {
    jumlah: number;
    tanaman: string;
}

interface ChartDonutProps {
    petaniData: PetaniData[];
    colors: string[];
}

const ChartDonut: React.FC<ChartDonutProps> = ({ petaniData, colors }) => {

    const totalPetani = petaniData.reduce((acc, curr) => acc + curr.jumlah, 0);
    const series = petaniData.map((data) => (data.jumlah / totalPetani) * 100);
    const labels = petaniData.map((data) => data.tanaman);

    const options: ApexOptions = {
        chart: {
            fontFamily: "Satoshi, sans-serif",
            type: "donut",
        },
        colors: colors,  // Gunakan warna dari prop
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
                formatter: (val, { seriesIndex }) => `${labels[seriesIndex]}: ${val.toFixed(2)}%`,
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
        <div className="w-full rounded-lg border border-stroke bg-white px-5 pb-5 shadow-md flex flex-col">
            <div className="mb-3 text-center">
                <h5 className="text-2xl font-semibold text-black">
                    Data Tanaman Pada Daerah Bandung
                </h5>
            </div>
            <div id="chartThree" className="mx-auto flex justify-center mb-2">
                <ReactApexChart options={options} series={series} type="donut" />
            </div>
        </div>
    );
};

export default ChartDonut;

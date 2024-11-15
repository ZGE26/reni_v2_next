"use client";

import React, { useState } from "react";

const dataPertanian = [
    { tanggal: "2024-11-01", nama_lahan: "Lahan 1", jenis_tanaman: "Padi", luas_lahan: "2 Ha", total_panen: "200 kg" },
    { tanggal: "2024-11-02", nama_lahan: "Lahan 2", jenis_tanaman: "Jagung", luas_lahan: "1.5 Ha", total_panen: "150 kg" },
    { tanggal: "2024-11-03", nama_lahan: "Lahan 3", jenis_tanaman: "Kedelai", luas_lahan: "1 Ha", total_panen: "100 kg" },
];

const ProductTable: React.FC = () => {
    const [data] = useState(dataPertanian); // State awal diambil dari dataPertanian

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white rounded-md">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3">Jenis Tanaman</th>
                        <th scope="col" className="px-6 py-3">Nama Lahan</th>
                        <th scope="col" className="px-6 py-3">Luas Lahan</th>
                        <th scope="col" className="px-6 py-3">Total Panen</th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Aksi</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                    {item.tanggal}
                                </th>
                                <td className="px-6 py-4">{item.jenis_tanaman}</td>
                                <td className="px-6 py-4">{item.nama_lahan}</td>
                                <td className="px-6 py-4">{item.luas_lahan}</td>
                                <td className="px-6 py-4">{item.total_panen}</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;

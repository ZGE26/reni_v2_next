"use client";

import React, { useState } from 'react';

const dataPertanian = [
    { tanggal: '2024-11-01', jenis_tanaman: 'Padi', luas_lahan: '2' + ' ' + 'Ha' , total_panen: '200 kg' },
    { tanggal: '2024-11-02', jenis_tanaman: 'Jagung', luas_lahan: '1.5'+ ' ' + 'Ha', total_panen: '150 kg' },
    { tanggal: '2024-11-03', jenis_tanaman: 'Kedelai', luas_lahan: '1' + ' ' + 'Ha', total_panen: '100 kg' },
    // Tambahkan data lainnya sesuai kebutuhan
];

const ProductTable = () => {
    const [data, setData] = useState(dataPertanian); // Langsung menggunakan dataPertanian sebagai state awal

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-2 rounded-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tanggal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Jenis Tanaman
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Luas Lahan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Panen
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.tanggal}
                                </th>
                                <td className="px-6 py-4">
                                    {item.jenis_tanaman}
                                </td>
                                <td className="px-6 py-4">
                                    {item.luas_lahan}
                                </td>
                                <td className="px-6 py-4">
                                    {item.total_panen}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center">
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

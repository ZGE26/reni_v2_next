"use client";

import React, { useState } from "react";

const DaftarPetani: React.FC = () => {
    const [selectedKecamatan, setSelectedKecamatan] = useState<string>(""); // Menyimpan pilihan dropdown

    const kecamatan = [
        { name: "Cibiru", Tanaman: [{ nama: "Padi", jumlah: 25 }, { nama: "Jagung", jumlah: 15 }] },
        { name: "Cikutra", Tanaman: [{ nama: "Padi", jumlah: 25 }, { nama: "Jagung", jumlah: 15 }] },
        { name: "Cimahi", Tanaman: [{ nama: "Padi", jumlah: 25 }, { nama: "Jagung", jumlah: 15 }] },
        { name: "Ciparay", Tanaman: [{ nama: "Padi", jumlah: 25 }, { nama: "Jagung", jumlah: 15 }] },
    ];

    // Filter kecamatan berdasarkan pilihan dropdown
    const filteredKecamatan = selectedKecamatan
        ? kecamatan.filter((kec) => kec.name === selectedKecamatan)
        : kecamatan;

    return (
        <div className="w-full rounded-md border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-md">
            <div className="mb-3 text-center w-full">
                <h5 className="text-base sm:text-2xl font-semibold text-black">
                    Daftar Petani
                </h5>
                <select
                    className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                    value={selectedKecamatan}
                    onChange={(e) => setSelectedKecamatan(e.target.value)}
                >
                    <option value="">Semua Kecamatan</option>
                    {kecamatan.map((kec, index) => (
                        <option key={index} value={kec.name}>
                            {kec.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-y-auto h-[279px] rounded-md"> {/* Membatasi tinggi dengan scroll */}
                {filteredKecamatan.map((kec, index) => (
                    <div key={index} className="mb-5">
                        <h5 className="text-lg font-semibold text-black mb-3">
                            Kecamatan {kec.name}
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                            {kec.Tanaman.map((tanaman, idx) => (
                                <div key={idx} className="bg-gray-100 p-3 rounded-md">
                                    <p className="text-sm font-semibold text-black">
                                        {tanaman.nama}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Jumlah: {tanaman.jumlah}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DaftarPetani;

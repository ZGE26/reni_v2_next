"use client";

import { useState } from 'react';

interface CardTanamanProps {
    gambar: string;
    nama: string;
    deskripsi: string;
}

export default function CardTanaman({ nama, gambar, deskripsi }: CardTanamanProps) {
    const [showFullText, setShowFullText] = useState(false);

    // Fungsi untuk mengubah status tampilan teks
    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
            <div className="w-full h-32 md:h-60">
                <img
                    src={gambar}
                    alt={`Gambar ${nama}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full p-3">
                <h5 className="text-base sm:text-2xl font-semibold text-black">
                    {nama}
                </h5>
                <p className="text-sm sm:text-base text-gray-500">
                    {/* Potong teks jika showFullText false */}
                    {showFullText ? deskripsi : `${deskripsi.slice(0, 100)}...`}
                </p>
                {/* Tombol untuk menampilkan lebih banyak */}
                <button
                    onClick={toggleText}
                    className="text-blue-500 text-sm underline mt-1"
                >
                    {showFullText ? 'Tampilkan lebih sedikit' : 'Tampilkan semuanya'}
                </button>
            </div>
        </div>
    );
}

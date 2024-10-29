import React from 'react';

export default function InformationSection() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center m-5 px-5 md:px-20 pt-10 pb-5 gap-8">
            {/* Bagian Gambar */}
            <div className="flex-1">
                <div 
                    className="relative bg-cover bg-center bg-no-repeat rounded-lg shadow-lg overflow-hidden h-64 md:h-full" 
                    style={{ backgroundImage: "url('/Tanaman.jpg')" }}
                >
                    <img src="/Tanaman.jpg" alt="Environment" className="w-full h-full object-cover opacity-0" />
                </div>
            </div>

            {/* Bagian Konten */}
            <div className="flex-1 space-y-6 md:space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-black text-center md:text-left">
                    Tentang Rekap Tani Pertanian Berkelanjutan
                </h1>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold text-green-600">
                            Keuntungan Ekonomi
                        </h3>
                        <p className="text-gray-700">
                            Inovasi alternatif yang mendukung pertumbuhan lingkungan alami dengan pendekatan 
                            etis dan teknologi modern untuk memajukan sektor pertanian.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold text-green-600">
                            Lingkungan yang Aman
                        </h3>
                        <p className="text-gray-700">
                            Solusi inovatif yang menjaga keberlanjutan lingkungan dan memanfaatkan teknologi 
                            untuk menciptakan ekosistem pertanian yang lebih sehat dan aman.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

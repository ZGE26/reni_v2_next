"use client";

import React from "react";

const DaftarPetani: React.FC = () => {
    const daerah = "Bandung";
    const namaPetani = ["Arya", "Budi", "Cahya", "Dewi", "Eka", "Adit", "Budi", "Gojali"];

    return (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-md">
            <div className="mb-3 text-center">
                <h5 className="text-base sm:text-2xl font-semibold text-black">
                    Daftar Petani Di Daerah {daerah}
                </h5>
            </div>
            <div>
                <ul className="h-60 md:h-full overflow-y-auto">
                    {namaPetani.map((nama, index) => (
                        <li key={index} className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                            <span className="text-sm line-clamp-1 font-medium">{nama}</span>
                            <span><a href="#" className="hover:text-blue-500">Detail</a></span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DaftarPetani;

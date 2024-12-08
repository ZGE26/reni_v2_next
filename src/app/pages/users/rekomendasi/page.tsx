"use client";

import { useState } from 'react';
import Head from '@/components_dashboard/Head';
import Breadcrumb from '@/components/Breadcrumbs';
import CardTanaman from '@/components/CardTanaman';
import { pertanianData } from '../../data/DataBayangan';

export default function Rekomendasi() {
    const [kondisiTanah, setKondisiTanah] = useState('');

    // Filter tanaman berdasarkan kondisi tanah yang dipilih
    const filteredTanaman = kondisiTanah
        ? pertanianData.tanaman.filter((tanaman) => tanaman.kondisiTanah === kondisiTanah)
        : pertanianData.tanaman;


        if(localStorage.getItem("token") === null) {
            window.location.href = "/pages/login"
        }    

    return (
        <div>
            <Head page_name="Rekomendasi" />
            <div className="px-4 mt-3">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Rekomendasi", link: "/pages/users/rekomendasi" },
                ]} />
            </div>
            <div className="flex p-4 w-full flex-col md:flex-row">
                {/* Filter Berdasarkan Kondisi Tanah */}
                <div className="flex-1 w-full border p-4">
                    <label htmlFor="kondisiTanah" className="block font-semibold mb-2">Filter Berdasarkan Kondisi Tanah</label>
                    <select
                        id="kondisiTanah"
                        value={kondisiTanah}
                        onChange={(e) => setKondisiTanah(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Semua Kondisi</option>
                        <option value="kering">Kering</option>
                        <option value="lembab">Lembab</option>
                        <option value="basah">Basah</option>
                    </select>
                </div>

                {/* Daftar Tanaman dengan Scroll Horizontal pada Mobile */}
                <div className="flex flex-1 gap-3 border overflow-y-auto hj-60 md:h-screen p-4 flex-col md:flex-row md:flex-wrap justify-center">
                    {filteredTanaman.map((tanaman, index) => (
                        <div key={index} className='flex justify-center'>
                            <CardTanaman
                                nama={tanaman.nama}
                                gambar={tanaman.gambar}
                                deskripsi={tanaman.deskripsi}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

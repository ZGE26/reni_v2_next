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

    return (
        <div>
            <Head page_name="Rekomendasi" />
            <div className="px-4 mt-3">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Rekomendasi", link: "/pages/users/rekomendasi" },
                ]} />
            </div>
            <div className="flex p-4 w-full flex-col gap-4">
                {/* Filter Berdasarkan Kondisi Tanah */}
                <div className="flex-1 w-full md:w-1/3 border p-4">
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
                <div>
                    {filteredTanaman.map((tanaman, index) => (
                        <div key={index}>
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

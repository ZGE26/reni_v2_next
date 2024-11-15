"use client";

import React, { useState } from "react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const dataLahan = [
    { id: 1, namaLahan: "Lahan 1" },
    { id: 2, namaLahan: "Lahan 2" },
    { id: 3, namaLahan: "Lahan 3" },
];

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        tanggal: "",
        jenisTanaman: "",
        namaLahan: "",
        luasLahan: "",
        totalPanen: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Data yang dikirim:", formData);
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-end ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <div className="bg-white w-96 p-6 shadow-xl transform transition-transform duration-300 ease-in-out">
                <h2 className="text-xl font-semibold mb-4">Input Data Panen</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tanggal</label>
                        <input
                            type="date"
                            name="tanggal"
                            value={formData.tanggal}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nama Lahan</label>
                        <select
                            name="namaLahan"
                            value={formData.namaLahan}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Pilih Lahan</option>
                            {dataLahan.map((item) => (
                                <option key={item.id} value={item.namaLahan}>
                                    {item.namaLahan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Jenis Tanaman</label>
                        <input
                            type="text"
                            name="jenisTanaman"
                            value={formData.jenisTanaman}
                            onChange={handleChange}
                            placeholder="Masukkan jenis tanaman"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Luas Lahan (ha)</label>
                        <input
                            type="number"
                            name="luasLahan"
                            value={formData.luasLahan}
                            onChange={handleChange}
                            placeholder="Masukkan luas lahan"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Total Panen (kg)</label>
                        <input
                            type="number"
                            name="totalPanen"
                            value={formData.totalPanen}
                            onChange={handleChange}
                            placeholder="Masukkan total panen"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 mr-2 text-gray-700 border rounded hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Drawer;

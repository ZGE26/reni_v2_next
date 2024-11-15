"use client";

import React, { useState } from "react";

interface DataItem {
  jenisTanaman: string;
  luasLahan: number;
  hasilPanen: number;
  kondisiCuaca: string;
  tanggal: string; // Tanggal untuk filtering
  namaLahan: string;
  jenisTanamanLahan: string;
  luasLahanStr: string;
  totalPanenStr: string;
}

interface DataTableProps {
  data: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");

  const handleQuarterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuarter(e.target.value);
  };

  // Fungsi untuk memfilter data berdasarkan jangka waktu per 3 bulan
  const filterDataByQuarter = (data: DataItem[], quarter: string) => {
    if (!quarter) return data;

    // Menentukan bulan berdasarkan pilihan quarter
    const [startMonth, endMonth] = quarter.split("-").map((month) => parseInt(month));
    return data.filter((item) => {
      const month = new Date(item.tanggal).getMonth() + 1; // Mengambil bulan (1-12)
      return month >= startMonth && month <= endMonth;
    });
  };

  const filteredData = filterDataByQuarter(data, selectedQuarter);

  return (
    <div>
      {/* Dropdown untuk memilih jangka waktu */}
      <div className="mb-4">
        <label className="block text-gray-700">Pilih Jangka Waktu</label>
        <select
          value={selectedQuarter}
          onChange={handleQuarterChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Pilih Jangka Waktu</option>
          <option value="1-3">Januari - Maret</option>
          <option value="4-6">April - Juni</option>
          <option value="7-9">Juli - September</option>
          <option value="10-12">Oktober - Desember</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Jenis Tanaman
              </th>
              <th scope="col" className="px-6 py-3">
                Luas Lahan (ha)
              </th>
              <th scope="col" className="px-6 py-3">
                Hasil Panen (kg)
              </th>
              <th scope="col" className="px-6 py-3">
                Kondisi Cuaca
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.jenisTanaman}</td>
                  <td className="px-6 py-4">{item.luasLahan}</td>
                  <td className="px-6 py-4">{item.hasilPanen}</td>
                  <td className="px-6 py-4">{item.kondisiCuaca}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

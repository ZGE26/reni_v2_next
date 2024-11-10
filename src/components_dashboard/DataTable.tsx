interface DataItem {
    jenisTanaman: string;
    luasLahan: number;
    hasilPanen: number;
    kondisiCuaca: string;
  }
  
  interface DataTableProps {
    data: DataItem[];
  }
  
  const DataTable: React.FC<DataTableProps> = ({ data }) => {
    return (
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
            {data.length > 0 ? (
              data.map((item, index) => (
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
    );
  };
  
  export default DataTable;
  
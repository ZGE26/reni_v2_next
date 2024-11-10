// components/AnalysisSummary.js

interface AnalysisSummaryProps {
    totalLuasLahan: number;
    totalHasilPanen: number;
    rataHasilPerHektar: number;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ totalLuasLahan, totalHasilPanen, rataHasilPerHektar }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Hasil Analisis</h2>
            <p className="text-gray-700 mb-2">
                Total Luas Lahan: <strong>{totalLuasLahan.toFixed(2)} ha</strong>
            </p>
            <p className="text-gray-700 mb-2">
                Total Hasil Panen: <strong>{totalHasilPanen.toFixed(2)} kg</strong>
            </p>
            <p className="text-gray-700 mb-4">
                Rata-rata Hasil Panen per Hektar: <strong>{rataHasilPerHektar.toFixed(2)} kg/ha</strong>
            </p>
            <p className="text-gray-700">
                Berdasarkan analisis sederhana ini, rata-rata hasil panen per hektar dapat digunakan sebagai acuan dalam meningkatkan produktivitas tanaman. Perhatikan kondisi cuaca yang mungkin mempengaruhi hasil panen, terutama pada tanaman seperti padi dan kedelai.
            </p>
        </div>
    );
};

export default AnalysisSummary;

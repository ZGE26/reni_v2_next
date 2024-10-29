import Link from 'next/link';

export default function ContactInfo() {
    return (
        <div className="flex justify-center items-center pt-8 pb-8">
            <div className="bg-white p-6 rounded-lg flex w-3/4">
                <img
                    src="https://storage.googleapis.com/a1aa/image/CDUTrrfNXcxYLK9dk8O27fd58pZusJtkG1phJoQeofU58guOB.jpg"
                    alt="Anime character with white hair, wearing a pink jacket and white top, standing in an urban environment"
                    className="w-1/2 h-auto object-cover rounded-lg"
                />
                <div className="ml-6 w-1/2">
                    <h1 className="text-2xl font-bold">Fresh Environmental: Rekap Data Pertanian</h1>
                    <p className="mt-4 mb-3 text-gray-700">
                        Secara efektif mengelola e-commerce global dalam sektor pertanian dengan nilai-nilai berkelanjutan,
                        merancang solusi yang berdampak tinggi untuk pengelolaan data pertanian.
                        Secara cepat membangun koneksi antara petani dan pasar melalui portal efisien yang mendukung
                        pengambilan keputusan berbasis data.
                    </p>
                    <Link href="/pages/about" className="mt-4 bg-black text-white py-2 px-4 rounded">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
}

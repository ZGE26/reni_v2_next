export default function Section() {
    return (
        <section
            className="relative h-screen flex items-end justify-left text-white"
            style={{
                backgroundImage: "url('/Testing.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Konten utama */}
            <div className="relative p-10 rounded-lg m-5 z-10">
                <h2 className="text-green-500 text-lg mb-4">REKAP TANI</h2>
                <h1 className="text-5xl font-bold mb-4">Solusi Digital untuk <br />Pertanian yang Lebih Cerdas</h1>
                <p className="text-lg mb-6">
                    Rekap Tani adalah platform inovatif yang menggunakan teknologi modern untuk membantu petani mencatat 
                    dan mengelola hasil pertanian dengan lebih efisien, memungkinkan pencatatan hasil panen, analisis tren 
                    produksi, rekomendasi tanaman yang tepat, serta berbagi informasi dengan petani lain guna menciptakan 
                    ekosistem pertanian yang lebih produktif dan berkelanjutan.
                </p>
                <div className="flex justify-left space-x-4">
                    <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Mulai Kelolah</button>
                    <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-gray-300 hover:text-black">Selengkapnya</button>
                </div>
            </div>
        </section>
    );
}

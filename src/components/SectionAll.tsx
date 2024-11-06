interface SectionProps {
    judul: string;
}

export default function Section({ judul }: SectionProps) {
    return (
        <section
            className="relative h-screen flex items-center justify-center text-white"
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
            <div className="relative text-center rounded-lg z-10 bg-black bg-opacity-50 p-6 pl-10 pr-10">
                <h2 className="text-green-500 text-lg mb-4">Rekap Tani</h2>
                <h1 className="text-5xl font-bold mb-4">{judul}</h1>
            </div>
        </section>
    );
}

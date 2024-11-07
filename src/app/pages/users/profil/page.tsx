import Head from "@/components_dashboard/Head";

const photoLahan = ["Testing.jpeg", "Tanaman.jpg", "Logo.png"];


export default function Profil() {
    return (
        <div>
            <Head page_name="Profil" />
            <div className="flex h-screen gap-5 flex-col md:flex-row m-2">
                <div className="flex-1 flex flex-col shadow-md rounded-lg justify-center items-center p-10">

                    <div className="w-32 h-32 mb-4">
                        <img src="/Logo.png" alt="Photo Profil" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Nama Lengkap</h2>
                    <div className="p-3 w-full border-b border-gray-600">
                        <b>Alamat</b>
                        <p>Bandung, Jawa Barat</p>
                    </div>
                    <div className="p-3 w-full border-b border-gray-600">
                        <b>Lokasi Lahan</b>
                        <p>Bojongsoang</p>
                    </div>
                    <div className="p-3 w-full border-b border-gray-600">
                        <b>No Telpon</b>
                        <p>+62 813 7855 0887</p>
                    </div>
                    <div className="p-3 w-full border-b border-gray-600">
                        <b>Bio</b>
                        <div className="border border-gray-500 p-5 rounded-md">
                            <p>Seorang petani yang selalu bersemangat dalam bekerja dan selalu ingin belajar hal baru.</p>
                        </div>
                    </div>
                </div>



                <div className="flex-1 p-5 shadow-md rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Foto Lahan</h2>
                        <button className="px-2 py-1 md:px-3 md:py-2 font-bold bg-blue-600 text-white rounded-md hover:bg-blue-800">Tambah Foto</button>
                    </div>
                    <div className="p-3 border border-gray-400 rounded-md">
                        <div className="h-64 md:h-96 overflow-y-auto rounded-md flex flex-col gap-2">
                            {photoLahan.map((photo, index) => (
                                <div key={index}>
                                    <img
                                        src={`/${photo}`}
                                        alt="Photo Lahan"
                                        className="w-full h-40 md:h-56 object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
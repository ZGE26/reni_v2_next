export default function InformasiPengguna() {
    return (
        <div className="w-full bg-green-600 flex flex-row p-5 justify-evenly mt-5 mb-5 items-center text-white">
            <div className="flex flex-col justify-center items-center gap-2">
                <img src="/Tanaman.jpg" alt="logo" className="max-w-36 max-h-36 rounded-full" />
                <div className="text-center">
                    <h4 className="font-bold text-2xl">100+</h4>
                    <p>Following</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <img src="/Tanaman.jpg" alt="logo" className="max-w-26 max-h-36 rounded-full" />
                <div className="text-center">
                    <h4 className="font-bold text-2xl">5+</h4>
                    <p>Daerah</p>
                </div>
            </div>
        </div>
    );
}
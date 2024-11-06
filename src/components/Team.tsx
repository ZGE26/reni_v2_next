export default function Team() {
    return (
        <div className="w-full bg-green-600 flex justify-evenly p-10 mt-4 mb-4">
            <div className="text-center flex flex-col justify-center">
                <img src="/Logo.png" alt="Foto anggota" className="max-w-48 max-h-48 rounded-full border-2"/>
                <h2 className="font-bold text-2xl mt-3">Rahman Hakim</h2>
                <p>Job Desk</p>
            </div>
            <div className="text-center flex flex-col justify-center">
                <img src="/Logo.png" alt="Foto anggota" className="max-w-48 max-h-48 rounded-full border-2"/>
                <h2 className="font-bold text-2xl mt-3">Arya Ersi Putra</h2>
                <p>Job Desk</p>
            </div>
            <div className="text-center flex flex-col justify-center">
                <img src="/Logo.png" alt="Foto anggota" className="max-w-48 max-h-48 rounded-full border-2"/>
                <h2 className="font-bold text-xl mt-3">Rafael Abednego C.</h2>
                <p>Job Desk</p>
            </div>

        </div>
    );
}
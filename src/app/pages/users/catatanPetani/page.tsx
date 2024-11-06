export default function Pencatatan(){
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold">Pencatatan Data Tanaman</h1>
            <form>
                {/* Form untuk mencatat data tanaman baru */}
                <label>
                    Nama Tanaman:
                    <input type="text" name="nama" />
                </label>
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

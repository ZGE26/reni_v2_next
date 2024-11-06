export default function InfoReni() {
    return (
        <div className="flex justify-center items-center pt-8 pb-8">
            <div className="bg-white p-6 rounded-lg flex w-3/4">
                <img
                    src="https://storage.googleapis.com/a1aa/image/CDUTrrfNXcxYLK9dk8O27fd58pZusJtkG1phJoQeofU58guOB.jpg"
                    alt="Anime character with white hair, wearing a pink jacket and white top, standing in an urban environment"
                    className="w-1/2 max-h-52 object-cover rounded-lg"
                />
                <div className="ml-6 w-1/2" >
                    <h1 className="text-2xl font-bold">Apa itu ReNi??</h1>
                    <p className="mt-4 mb-3 text-gray-700">
                    ReNi atau Rekap Tani adalah aplikasi berbasis web yang bertujuan membantu para petani dalam mencatat, merekap, dan berbagi data pertanian secara digital. Aplikasi ini berfungsi sebagai pusat informasi pertanian dan alat bantu pengambilan keputusan berbasis data.
                    </p>
                </div>
            </div>
        </div>
    );
}
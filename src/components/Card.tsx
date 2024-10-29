interface CardProps {
    judul: string;
    deskripsi: string;
}

export default function Card({ judul, deskripsi }: CardProps) {
    return (
        <div className="max-w-72 bg-white rounded-lg shadow dark:bg-white dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src="/Testing.jpeg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{judul}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
            </div>
        </div>
    );
}

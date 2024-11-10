import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    link: string;
}

const Breadcrumb = ({ listpage }: { listpage: BreadcrumbItem[] }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {/* Menampilkan breadcrumb berdasarkan data dari listpage */}
                {listpage.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {/* Jika item bukan yang terakhir, tampilkan sebagai link */}
                        {index < listpage.length - 1 ? (
                            <div className="flex items-center">
                                <Link href={item.link}>
                                    <p className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        {item.name}
                                    </p>
                                </Link>
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 9l4-4-4-4"
                                    />
                                </svg>
                            </div>
                        ) : (
                            // Jika item terakhir, tampilkan sebagai teks tanpa link
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

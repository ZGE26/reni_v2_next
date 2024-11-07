interface HeadProps {
    page_name: string;
}

export default function Head({page_name}: HeadProps) {
    return (
        <div className="flex justify-between shadow-md p-2 items-center">
            <div className="ml-3">
                <a href="/pages/users/dashboard" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800">Kembali</a>
            </div>
            <h2 className="text-2xl font-bold">{page_name}</h2>
            <div className="max-w-12 mr-3">
                <img src="/Logo.png" alt="" />
            </div>
        </div>
    );
}
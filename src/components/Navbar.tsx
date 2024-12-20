export default function Navbar() {
    return (
        <div className="bg-black drop-shadow-lg pr-5 pl-5 pt-3 pb-3 flex flex-col md:flex-row justify-between items-center fixed top-0 left-0 right-0 z-50">
            <div className="flex flex-row gap-2 items-center">
                <img src="/Logo.png" alt="logo" className='p-2 h-12' />
                <a href="/" className="text-white font-bold text-xl">Rekap Tani</a>
            </div>
            <div className="flex gap-2 md:gap-8 items-center">
                <div className="flex items-center">
                    <a href="/" className="text-white hover:text-gray-200 transition duration-300 hover:bg-green-600 p-3 rounded-md">Home</a>
                    <a href="/pages/about" className="text-white hover:text-gray-200 transition duration-300  hover:bg-green-600 p-3 rounded-md">About</a>
                    <a href="/pages/service" className="text-white hover:text-gray-200 transition duration-300  hover:bg-green-600 p-3 rounded-md">Service</a>
                    <a href="/pages/contact" className="text-white hover:text-gray-200 transition duration-300  hover:bg-green-600 p-3 rounded-md">Contact</a>
                </div>
                <a href="/pages/login" className="px-8 py-1.5 bg-green-600 font-bold text-white rounded-xl">Login</a>
            </div>
        </div>
    );
}

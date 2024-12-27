"use client";

import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan menu

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Mengubah status menu ketika tombol ditekan
    }; 
    const logout = () => {
        if (localStorage.getItem("token") != null) {
            localStorage.removeItem('token');
        }
    }
    return (
        <nav className="bg-white border-gray-200 p-1 border shadow-sm">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/Logo.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Rekap Tani</span>
                </a>
                <button
                    onClick={toggleMenu} // Menambahkan event handler untuk tombol
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mega-menu-full"
                    aria-expanded={isOpen} // Mengatur aria-expanded berdasarkan status
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    id="mega-menu-full"
                    className={`items-center justify-between font-medium w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} // Mengatur kelas berdasarkan status
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a href="/pages/users/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/pages/users/detail_informasi" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" aria-current="page">Detail Informasi Wilayah</a>
                        </li>
                        <li>
                            <a href="/pages/users/dataPetani" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Data Pertanian</a>
                        </li>
                        <li>
                            <a onClick={logout} href="/pages/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Logout</a>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

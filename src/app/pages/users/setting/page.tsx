"use client";
import Navbar from "@/components_dashboard/Navbar";

export default function Setting() {

    if(localStorage.getItem("token") === null) {
        window.location.href = "/pages/login"
    }
    
    return (
        <div className="w-full h-screen">
            <Navbar />
            <div className="m-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Pengaturan</h2>
                <form>
                    <div>
                        <div className="mb-4 flex items-center gap-3 border rounded-md p-2 justify-center flex-col">
                            <div className="h-[100px] w-[100px] rounded-full">
                                <img src="/Logo.png" alt="Users" />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-center">Edit Your Photo</p>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center gap-3 rounded-md p-2 justify-center flex-col">
                                    <span className="flex gap-2.5">
                                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                            Delete
                                        </button>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                            Update
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input
                                type="text"
                                placeholder="Nama lengkap"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                            <input
                                type="tel"
                                placeholder="Nomor telepon"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                placeholder="Bio"
                                required
                                className="mt-1 w-full h-32 rounded-md border border-gray-300 p-2 resize-none focus:border-green-500 focus:outline-none"
                            />
                        </div>


                        <div className="mt-3">
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Simpan
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Hapus Akun
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

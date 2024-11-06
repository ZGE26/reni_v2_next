import React from "react";

export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-5">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registration</h2>

                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter your number"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-md text-lg font-medium hover:bg-gradient-to-l transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

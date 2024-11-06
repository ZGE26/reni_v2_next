"use client";

import Card from "./Card";
import { useState, useEffect } from "react";

export default function LayoutCard() {
    const cards = [
        <Card key={1} judul="Testing" deskripsi="Apakabar" />,
        <Card key={2} judul="Testing2" deskripsi="Apakabar kawan" />,
        <Card key={3} judul="Testing3" deskripsi="Deskripsi1" />,
        <Card key={4} judul="Testing4" deskripsi="Deskripsi2" />,
        <Card key={5} judul="Testing5" deskripsi="Deskripsi3" />,
        <Card key={6} judul="Testing6" deskripsi="Deskripsi4" />,
        <Card key={7} judul="Testing7" deskripsi="Deskripsi5" />,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPages, setCardsPages] = useState(3);

    useEffect(() => {
        // Check window size and update cardsPages accordingly
        const updateCardsPages = () => {
            if (window.innerWidth < 768) {
                setCardsPages(1); // Mobile view shows 1 card
            } else {
                setCardsPages(3); // Desktop view shows 3 cards
            }
        };

        updateCardsPages();
        window.addEventListener("resize", updateCardsPages);

        // Clean up event listener on component unmount
        return () => window.removeEventListener("resize", updateCardsPages);
    }, []);

    const next = () => {
        if (currentIndex + cardsPages < cards.length) {
            setCurrentIndex(currentIndex + cardsPages);
        }
    };

    const prev = () => {
        if (currentIndex - cardsPages >= 0) {
            setCurrentIndex(currentIndex - cardsPages);
        }
    };

    return (
        <div className="w-full pl-4 pr-4 md:pl-12 md:pr-12 flex justify-center items-center flex-col">
            <div className="flex flex-col items-center text-center gap-4 mb-4 w-full">
                <h1 className="text-2xl font-bold">ReNi Menyediakan Solusi Pertanian <br />Layanan Unggulan untuk Petani</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pb-8 items-center">
                {cards.slice(currentIndex, currentIndex + cardsPages)}
            </div>

            <div className="flex gap-2 p-4 md:p-2">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Prev
                </button>
                <button
                    onClick={next}
                    disabled={currentIndex + cardsPages >= cards.length}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

"use client";

interface MarqueeProps {
    text: string;
}

export default function Marquee({ text }: MarqueeProps) {
    return (
        <div className="bg-green-600 p-3 text-white overflow-hidden relative">
            <div className="marquee-inner flex">
                <h1 className="text-2xl font-bold whitespace-nowrap mr-10">{text}<span className="p-10">{text}</span>{text}<span className="p-10">{text}</span></h1>
                <h1 className="text-2xl font-bold whitespace-nowrap mr-10">{text}<span className="p-10">{text}</span>{text}<span className="p-10">{text}</span></h1>
            </div>
            <style jsx>{`
                .marquee-inner {
                    display: flex;
                    animation: scroll 10s linear infinite;
                }

                @keyframes scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </div>
    );
}

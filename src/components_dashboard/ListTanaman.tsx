import React from "react";

interface ListTanamanProps {
    series: number[];
    colors: string[];
    labels: string[];
}

const ListTanaman: React.FC<ListTanamanProps> = ({ series, colors, labels }) => {
    // Pastikan panjang array sama untuk menghindari error
    if (series.length !== colors.length || colors.length !== labels.length) {
        console.warn("Length mismatch between series, colors, and labels");
        return null;
    }

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-wrap items-center justify-center gap-y-3 py-5">
            {series.map((value, index) => (
                <div className="w-full px-8 sm:w-1/2" key={index}>
                    <div className="flex items-center justify-center px-5 sm:px-12">
                        <span
                            className="mr-2 h-3 w-full max-w-3 rounded-full"
                            style={{ backgroundColor: colors[index] }}
                        ></span>
                        <p className="w-3/4 flex justify-between text-sm font-medium text-black">
                            <span>{labels[index]}</span>
                            <span>{value.toFixed(2)}%</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListTanaman;

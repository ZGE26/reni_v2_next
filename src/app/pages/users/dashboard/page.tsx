import Navbar from "@/components_dashboard/Navbar";
import Footer from "@/components/Footer";
import ChartDonut from "@/components_dashboard/ChartDonut";
import Menu from "@/components_dashboard/Menu";
import DaftarPetani from "@/components_dashboard/DaftarPetani";
import { pertanianData, getRandomColor } from '@/app/pages/data/DataBayangan';

export default function Dashboard() {
    // Buat warna acak untuk setiap item di petaniData
    const colors = pertanianData.petaniData.map(() => getRandomColor());

    return (
        <div>
            <Navbar />
            <div className="p-2 flex flex-wrap w-full gap-2 flex-col md:flex-row">
                <div className="flex-1">
                    {/* Pastikan untuk mengirim petaniData dan colors ke ChartDonut */}
                    <ChartDonut petaniData={pertanianData.petaniData} colors={colors} />
                </div>
                <div className="flex-1">
                    <DaftarPetani />
                </div>
            </div>
            <Menu />
            <Footer />
        </div>
    );
}

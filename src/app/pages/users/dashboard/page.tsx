import Navbar from "@/components_dashboard/Navbar";
import Footer from "@/components/Footer";
import Chart from "@/components_dashboard/Chart";
import Menu from "@/components_dashboard/Menu";

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <Chart showData={false} />
            <Menu />
            <Footer />
        </div>
    );
}
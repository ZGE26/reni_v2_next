import LayoutCard from "@/components/LayoutCard";
import InformasiPengguna from "@/components/InformasiPengguna";
import ContactInfo from "@/components/ContactInfo";

export default function About() {
    return (
        <div>
            <h1>Ini about</h1>
            <LayoutCard />
            <InformasiPengguna />
            <ContactInfo />
        </div>
    );
}
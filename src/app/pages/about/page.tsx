import Navbar from "@/components/Navbar";
import SectionAll from "@/components/SectionAll";
import InfoReni from "@/components/InfoReni";
import Team from "@/components/Team";
import Information from "@/components/Information";
import InformasiPengguna from "@/components/InformasiPengguna";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <div>
            <Navbar />
            <SectionAll judul="About Us" />
            <InfoReni />
            <Team />
            <Information />
            <InformasiPengguna />
            <ContactInfo />
            <Footer />
        </div>
    );
}
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Marquee from "@/components/Marquee";
import Information from "@/components/Information";
import LayoutCard from "@/components/LayoutCard";
import InformasiPengguna from "@/components/InformasiPengguna";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Section />
      <Marquee text="Welcome to Rekap Tani" />
      <Information />
      <LayoutCard />
      <InformasiPengguna />
      <ContactInfo />
      <Footer />
    </div>
  );
}

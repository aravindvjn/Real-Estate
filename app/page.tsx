import Footer from "@/components/footer/footer";
import DescriptionSection from "@/components/home-page/description-section";
import FindPropertiesByCities from "@/components/home-page/find-properties";
import HeroSection from "@/components/home-page/hero-section";
import Suggestions from "@/components/home-page/suggestions";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <DescriptionSection />
      <Suggestions />
      <FindPropertiesByCities />
      <Footer />
    </Container>
  );
}

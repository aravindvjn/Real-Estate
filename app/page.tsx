import HeroSection from "@/components/home-page/hero-section";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="p-1 md:p-2 lg:p-5">
      <HeroSection />
    </Container>
  );
}

import Footer from "@/components/footer/footer";
import DescriptionSection from "@/components/home-page/description-section";
import FindPropertiesByCities from "@/components/home-page/find-properties";
import HeroSection from "@/components/home-page/hero-section";
import Suggestions from "@/components/home-page/suggestions";
import Container from "@/components/ui/container";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <DescriptionSection />
      <Suspense
        fallback={
          <p className="my-[100px] text-center opacity-50 text-[10px]">Loading...</p>
        }
      >
        <Suggestions />
      </Suspense>
      <FindPropertiesByCities />
      <Footer />
    </Container>
  );
}

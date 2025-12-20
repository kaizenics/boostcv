
import { Hero } from "@/components/hero";
import { NavbarComponent } from "@/components/navbar";
import { About } from "@/components/about";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <Hero />
      <About />
      <FAQ />
      <Footer />
    </>
  );
}

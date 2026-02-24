import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Certifications />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;


import './Home.css';
import Hero from "../components/Hero";
import CpSection from "../components/CpSection";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Portfolio() {


  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-slate-950 text-slate-200 min-h-screen">

      <Header></Header>
      <Hero></Hero>
      <CpSection></CpSection>
      <Projects></Projects>
      <Skills></Skills>
      <Contact></Contact>
      <Footer></Footer>

    </div>
  );
}

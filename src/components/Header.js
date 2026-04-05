import React, { useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = ["about", "cp", "projects", "skills", "contact"];


function Header() {

  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const [typedText, setTypedText] = useState("");


  useEffect(() => {
    const handleScroll = () => {
      for (const s of NAV_LINKS) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) { setActiveSection(s); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };


  return (
    <header>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{ background: "rgba(15,23,42,0.9)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("about")} className="font-syne text-lg font-800 text-white tracking-tight">
            Mezbah<span style={{ color: "#6366f1" }}>.</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className={`nav-link text-sm capitalize pb-1 ${activeSection === link ? "active text-white font-medium" : "text-slate-500 hover:text-slate-300"}`}>
                {link}
              </button>
            ))}
          </div>
          <button className="hidden md:block text-sm text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ background: "#6366f1" }}
            onClick={() => scrollTo("contact")}>
            Hire me
          </button>
          <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mobile-menu border-t border-white/5 bg-slate-950 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} className="text-left text-sm text-slate-400 hover:text-white capitalize transition-colors">{link}</button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );}

export default Header;

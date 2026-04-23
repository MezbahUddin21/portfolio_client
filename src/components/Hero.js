import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';




const ROLES = ["Software Engineer", "Competitive Programmer", "Full-Stack Developer"];


function Hero() {
  const [programmingStats, setProgrammingStats] = useState([]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const [typedText, setTypedText] = useState("");



  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/programming');
        setProgrammingStats(res.data.stats || []);
        // setAchievements(res.data.achievements || []);
      } catch (err) {
        console.error('Unable to load programming stats', err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
        if (charIdx + 1 === current.length) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setTypedText(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
        if (charIdx - 1 === 0) { setIsDeleting(false); setRoleIdx(r => (r + 1) % ROLES.length); }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, roleIdx]);

  return (
    <>
      {/* HERO */}
      <section id="about" className="min-h-screen flex items-center relative dot-grid pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 60%)" }} />
        <div className="absolute top-32 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 section-fade">
              <div className="inline-flex items-center gap-2.5 mb-7 px-3.5 py-1.5 rounded-full border border-emerald-500/20" style={{ background: "rgba(52,211,153,0.06)" }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">Available for opportunities</span>
              </div>
              <h1 className="font-syne text-5xl md:text-6xl lg:text-7xl font-800 leading-tight mb-5">
                <span className="gradient-text">Mezbah Uddin Maruf</span>
              </h1>
              <div className="text-lg md:text-xl text-slate-500 mb-2 h-8 flex items-center gap-1">
                <span className="text-slate-300 font-medium">{typedText}</span>
                <span className="cursor-blink" />
              </div>
              <p className="text-slate-500 text-base leading-relaxed max-w-xl mt-4 mb-10">
                I spend mornings grinding hard algorithmic problems and evenings building polished, high-performance web applications. Pupil on Codeforces. 1200+ problems solved. CS undergrad at GUB.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("projects")} className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  View Projects
                </button>
                <button onClick={() => scrollTo("contact")} className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all">
                  Get in touch ↗
                </button>
              </div>
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/5">
                <div>
                  <div className="font-syne text-2xl font-700 text-white">{programmingStats.reduce((sum, stat) => sum + parseInt(stat.solved || 0), 0)}+</div>
                  <div className="text-xs text-slate-600 mt-0.5">Problems solved</div>
                </div>
                <div>
                  <div className="font-syne text-2xl font-700 text-white">{programmingStats.length}+</div>
                  <div className="text-xs text-slate-600 mt-0.5">Platforms</div>
                </div>
                <div>
                  <div className="font-syne text-2xl font-700 text-white">2025</div>
                  <div className="text-xs text-slate-600 mt-0.5">ICPC Regionalist</div>
                </div>
              </div>
            </div>

            {/* Profile card */}
            <div className="lg:col-span-2 section-fade" style={{ animationDelay: "0.15s" }}>
              <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.025)" }}>
                <div className="h-28 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.5) 50%, rgba(6,182,212,0.35) 100%)" }}>
                  <div className="absolute inset-0 dot-grid opacity-20" />
                </div>
                <div className="px-6 pb-6 -mt-1">
                  <div className="w-16 h-16 rounded-2xl -mt-8 mb-4 flex items-center justify-center font-syne font-800 text-xl text-white border-2 border-slate-950" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    <img src="/me.jpeg" alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div className="font-semibold text-white text-lg leading-tight">Mezbah Uddin Maruf</div>
                  <div className="text-sm text-slate-500 mb-5">Software Engineer · GUB,2026</div>
                  <div className="space-y-3.5">
                    {programmingStats.map((stat,index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{stat.platform}</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ color: stat.color, background: `${stat.color}15` }}>{stat.rank} . {stat.rating}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

    );
}

export default Hero;

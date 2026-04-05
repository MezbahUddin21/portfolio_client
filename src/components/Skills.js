import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Skills() {

  const [skills, setSkills] = useState({});


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('/api/skills');
        const skillsObj = {};
        response.data.forEach(skill => {
          skillsObj[skill.category] = skill.skills;
        });
        setSkills(skillsObj);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);





  return (
    <>
       
      {/* SKILLS */}
      <section id="skills" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-line mb-4" />
            <h2 className="font-syne text-3xl font-700 text-white mb-2">Skills</h2>
            <p className="text-slate-500 text-sm">Technologies and areas of expertise</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="rounded-xl border border-white/6 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#818cf8" }}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

    );
}

export default Skills;

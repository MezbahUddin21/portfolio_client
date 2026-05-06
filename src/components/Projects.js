import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
// import '.'





const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
);


function Projects() {

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [allTechnologies, setAllTechnologies] = useState([]);


  


  useEffect(() => {
        const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get('/api/projects');
            setProjects(response.data);

            // Extract unique technologies
            const techSet = new Set();
            response.data.forEach((project) => {
            if (project.technologies) {
                project.technologies.forEach((tech) => techSet.add(tech));
            }
            });
            setAllTechnologies(Array.from(techSet).sort());
            setFilteredProjects(response.data);

            // setTimeout(()=>{
            //   console.log(22);
            // }, 50000);

        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchProjects();
    
    },[]);


  useEffect(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by technology
    if (selectedTech !== 'all') {
      filtered = filtered.filter((project) =>
        project.technologies && project.technologies.includes(selectedTech)
      );
    }

    setFilteredProjects(filtered);
  }, [searchQuery, selectedTech, projects]);

  if (loading) {
    return (
    <>
      <section className="text-sm py-24 border-t border-white/5" >
      
        <div className="max-w-6xl mx-auto px-6">

           <div className="mb-14">
            <div className="section-line mb-4"/>
            <h2 className="font-syne text-3xl font-700 text-white mb-2">Projects</h2>
            <p className="text-slate-400 text-sm">Selected web applications and developer tools</p>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/5 rounded focus:border-secondary focus:ring-0 bg-dark text-white placeholder-primary placeholder-opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">🔍︎</span>
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            <button
              className={`filter-pill rounded p-2 ${selectedTech === 'all' ? 'filter-pill-active' : ''}`}
              onClick={() => setSelectedTech('all')}
            >
              All Projects ({0})
            </button>
            {[...Array(8)].map((_,i) => (
              <button
                key={i}
                className={`filter-pill p-2 rounded w-20 ${selectedTech === i ? 'filter-pill-active' : ''}`}
                
              >
                
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="pt-15 pb-24">

      {/* <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-primary border border-secondary rounded-xl shadow animate-pulse"
            ></div>
          ))}
        </div>
      </div> */}

        <div className="max-w-6xl mx-auto px-6">
         
          <div className="grid md:grid-cols-2 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className=" h-40 card-hover rounded-xl border border-white/6 p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
    );


  }



  return (
    <>

      {/* Filters Section */}
      
      <section className="text-sm py-24 border-t border-white/5" >
      
        <div className="max-w-6xl mx-auto px-6">

           <div className="mb-14">
            <div className="section-line mb-4"/>
            <h2 className="font-syne text-3xl font-700 text-white mb-2">Projects</h2>
            <p className="text-slate-400 text-sm">Selected web applications and developer tools</p>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/5 rounded focus:border-secondary focus:ring-0 bg-dark text-white placeholder-primary placeholder-opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">🔍︎</span>
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            <button
              className={`filter-pill rounded p-2 ${selectedTech === 'all' ? 'filter-pill-active' : ''}`}
              onClick={() => setSelectedTech('all')}
            >
              All Projects ({projects.length})
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                className={`filter-pill p-2 rounded ${selectedTech === tech ? 'filter-pill-active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech} ({projects.filter((p) => p.technologies?.includes(tech)).length})
              </button>
            ))}
          </div>
        </div>
      </section>

        {/* PROJECTS */}

      <section id="projects" className="pt-15 pb-24">
        <div className="max-w-6xl mx-auto px-6">
         
          <div className="grid md:grid-cols-2 gap-5">
            {filteredProjects.map((p, i) => (
              <div key={p._id} className="card-hover rounded-xl border border-white/6 p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="project-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-700 font-mono tracking-wider ">Adden in {p.createdAt.slice(0,4).trim()}</span>
                    <h3 className="font-syne text-xl font-700 text-white mt-0.5">{p.title}</h3>
                  </div>
                  <div className="flex gap-2 text-slate-600">
                    <a href={p.githubLink} className="hover:text-slate-300 transition-colors p-1" title="GitHub"><GithubIcon /></a>
                    <a href={p.liveLink} className="hover:text-slate-300 transition-colors p-1" title="Live demo"><ArrowIcon /></a>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description.length > 120 ? `${p.description.slice(0, 120).trim()}...` : p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.technologies.map((tag,idx) => <span key={idx} className="tag" onClick={()=> setSelectedTech(tag)}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

    );
}

export default Projects;

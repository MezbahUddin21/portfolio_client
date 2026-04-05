import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('/api/projects');
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
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-primary border border-secondary rounded-xl shadow animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark">
      {/* Hero Section */}
      <section
        className="py-20 bg-gradient-to-br from-secondary to-accent text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 400\"><defs><pattern id=\"grid\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><path d=\"M 40 0 L 0 0 0 40\" fill=\"none\" stroke=\"rgba(255,255,255,.1)\" stroke-width=\"1\"/></pattern></defs><rect width=\"1200\" height=\"400\" fill=\"url(%23grid)\" /></svg>')",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 animate-slideInDown">
            My Project Portfolio
          </h1>
          <p className="text-lg opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Explore a selection of web applications and projects I&apos;ve built
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-10 bg-primary shadow">
        <div className="max-w-7xl mx-auto px-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-secondary rounded-full focus:border-secondary focus:ring-0 bg-dark text-white placeholder-primary placeholder-opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">🔍</span>
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className={`px-4 py-2 rounded-full transition ${
                selectedTech === 'all'
                  ? 'bg-gradient-to-br from-secondary to-accent text-white'
                  : 'bg-dark text-secondary border border-secondary hover:bg-secondary hover:text-white'
              }`}
              onClick={() => setSelectedTech('all')}
            >
              All Projects ({projects.length})
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                className={`px-4 py-2 rounded-full transition ${
                  selectedTech === tech
                    ? 'bg-gradient-to-br from-secondary to-accent text-white'
                    : 'bg-dark text-secondary border border-secondary hover:bg-secondary hover:text-white'
                }`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech} ({projects.filter((p) => p.technologies?.includes(tech)).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="bg-primary border border-secondary rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 bg-gradient-to-br from-secondary to-accent">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex flex-wrap gap-4">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-secondary text-white rounded-full text-sm hover:bg-opacity-80 transition"
                          >
                            🌐 Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-accent text-white rounded-full text-sm hover:bg-opacity-80 transition"
                          >
                            💻 View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-primary text-opacity-70 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies &&
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-dark text-secondary rounded-full text-xs cursor-pointer hover:bg-secondary hover:text-dark transition border border-secondary"
                            onClick={() => setSelectedTech(tech)}
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                    <div className="text-primary text-opacity-50 text-xs">
                      {project.createdAt && (
                        <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-primary border border-secondary p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2 text-secondary">No projects found</h3>
              <p className="text-primary text-opacity-70 mb-4">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : 'No projects in this category'}
              </p>
              <button
                className="px-6 py-2 bg-gradient-to-br from-secondary to-accent text-white rounded-full transition"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTech('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="bg-primary border border-secondary rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 bg-gradient-to-br from-secondary to-accent">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex flex-wrap gap-4">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-secondary text-white rounded-full text-sm hover:bg-opacity-80 transition"
                          >
                            🌐 Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-accent text-white rounded-full text-sm hover:bg-opacity-80 transition"
                          >
                            💻 View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-primary text-opacity-70 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies &&
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-dark text-secondary rounded-full text-xs cursor-pointer hover:bg-secondary hover:text-dark transition border border-secondary"
                            onClick={() => setSelectedTech(tech)}
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                    <div className="text-primary text-opacity-50 text-xs">
                      {project.createdAt && (
                        <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-primary border border-secondary p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2 text-secondary">No projects found</h3>
              <p className="text-primary text-opacity-70 mb-4">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : 'No projects in this category'}
              </p>
              <button
                className="px-6 py-2 bg-gradient-to-br from-secondary to-accent text-white rounded-full transition"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTech('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;

import React from 'react';
import axios from 'axios';

function Footer() {

  const downloadCV = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/cv/download', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CV download failed', error);
      alert('CV download failed. Please reload and try again.');
    }
  };


  return (
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-syne font-700 text-white">Mezbah<span style={{ color: "#6366f1" }}>.</span></div>
          <div className="text-xs text-slate-700">© 2025 Mezbah Uddin Maruf · Built with React & Express </div>
          <div className="flex gap-6 text-xs text-slate-600">
            {[
              { name: "GitHub", href: "https://github.com/MezbahUddin21" },
              { name: "LinkedIn", href: "https://linkedin.com/in/mezbah21" },
              { name: "Resume", href: "/api/cv/download", isDownload: true }
            ].map(l => (
              <a
                key={l.name}
                href={l.isDownload ? '#!' : l.href}
                className="hover:text-slate-400 transition-colors"
                {...(l.isDownload ? { onClick: downloadCV } : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
  );
}

export default Footer;

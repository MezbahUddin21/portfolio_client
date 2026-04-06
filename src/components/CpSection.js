import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CpSection() {
  const [cpStats, setCpStats] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, highlightsRes] = await Promise.all([
          axios.get('/api/programming'),
          axios.get('/api/highlights'),
        ]);

        setCpStats(progRes.data?.stats || []);

        const loadedHighlights = Array.isArray(highlightsRes.data)
          ? highlightsRes.data.map((item) => item.highlights || item.text || '')
          : [];

        setAchievements(loadedHighlights.filter(Boolean));
      } catch (error) {
        console.error('Unable to load competitive programming data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const problemsSolved = cpStats.map((stat) => ({
    label: stat.platform || 'Unknown',
    solved: Number(stat.solved) || 0,
    color: stat.color || '#6366f1',
  }));

  const totalSolved = problemsSolved.reduce((sum, stat) => sum + stat.solved, 0);

  return (
    <section id="cp" className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <div className="section-line mb-4" />
          <h2 className="font-syne text-3xl font-700 text-white mb-2">Competitive Programming</h2>
          <p className="text-slate-500 text-sm">Contest history and performance across major platforms</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-xl border border-white/6 bg-white/5 animate-pulse"
              />
            ))
          ) : cpStats.length > 0 ? (
            cpStats.map((stat) => (
              <div
                key={stat.platform}
                className="stat-card rounded-xl p-5 border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-600 font-medium tracking-wider uppercase">{stat.platform}</span>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${stat.color || '#6366f1'}15`, color: stat.color || '#6366f1' }}
                  >
                    {stat.rank || 'N/A'}
                  </span>
                </div>
                <div>
                  <span>Max Rating </span>
                  <span className="font-syne text-3xl font-700 text-white mb-1">{stat.rating || '0'}</span>
                </div>
                <div className="text-xs text-slate-600 font-mono">No of Contest: {stat.contests || '0'}+</div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-slate-400">No programming stats available yet.</div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="rounded-xl border border-white/6 p-6"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <h3 className="text-sm font-semibold text-white mb-5">Highlights</h3>
            <div className="space-y-3.5">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-3 rounded-full bg-white/10 animate-pulse" />
                ))
              ) : achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: '#6366f1' }}
                    />
                    <span className="text-sm text-slate-400 leading-relaxed">{achievement}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400">No highlights found.</div>
              )}
            </div>
          </div>

          <div
            className="rounded-xl border border-white/6 p-6"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <h3 className="text-sm font-semibold text-white mb-5">Problems Solved</h3>
            <div className="space-y-5">
              {problemsSolved.length > 0 ? (
                problemsSolved.map((platform) => (
                  <div key={platform.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">{platform.label}</span>
                      <span className="text-slate-300 font-medium">{platform.solved}+</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full progress-bar"
                        style={{ width: `${Math.min((platform.solved / 900) * 100, 100)}%`, background: platform.color }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400">No problems-solved data available yet.</div>
              )}
              <div className="pt-3 border-t border-white/5 text-sm text-slate-500">
                Total across all platforms: <span className="text-white font-semibold">{totalSolved || '0'}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CpSection;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function ProgrammingStats() {
  const [programmingStats, setProgrammingStats] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/programming');
        setProgrammingStats(res.data.stats || []);
        setAchievements(res.data.achievements || []);
      } catch (err) {
        console.error('Unable to load programming stats', err);
      }
    };

    fetchStats();
  }, []);

  return (

    
    <section className="py-20 bg-gradient-to-br from-primary to-dark">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-2">
          Competitive Programming
        </h2>
        <p className="text-center text-white text-opacity-70 mb-12">
          Track record across leading competdfdfitive programming platforms
        </p>

        {/* Achievements Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-dark border border-secondary p-6 rounded-xl text-center shadow transition-transform transform hover:-translate-y-2 animate-scaleInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-4">{achievement.icon}</div>
              <h3 className="text-2xl font-extrabold text-secondary mb-1">
                {achievement.value}
              </h3>

              <p className='text-white'>huidfsddffsdf</p>
              <p className="text-primary text-opacity-70 text-sm">{achievement.title}</p>
            </div>
          ))}
        </div>

        {/* Programming Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programmingStats.map((stat, index) => (
            <a
              key={index}
              href={stat.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark border border-secondary rounded-xl p-6 shadow transition-transform transform hover:-translate-y-2 animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <h3 className="text-xl font-semibold text-secondary">{stat.platform}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-primary text-opacity-70">Rating</span>
                  <span className="text-secondary font-bold">{stat.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary text-opacity-70">Rank</span>
                  <span className="text-secondary font-bold">{stat.rank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary text-opacity-70">Problems</span>
                  <span className="text-secondary font-bold">{stat.solved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary text-opacity-70">Contests</span>
                  <span className="text-secondary font-bold">{stat.contests}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-secondary text-right">
                <span className="text-secondary font-semibold">View Profile →</span>
              </div>
            </a>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="bg-dark border border-secondary p-8 rounded-xl shadow">
          <h4 className="text-xl font-bold mb-4 text-secondary">Quick Stats</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="text-2xl">🎯</span>
              <span className="text-primary text-opacity-70">
                Specialized in algorithms, data structures, and competitive programming
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-2xl">📈</span>
              <span className="text-primary text-opacity-70">
                Consistent performer across multiple platforms with progressive growth
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-2xl">⚙️</span>
              <span className="text-primary text-opacity-70">
                Proficient in C++, Python, and Java for competitive programming
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-2xl">🏅</span>
              <span className="text-primary text-opacity-70">
                Multiple contest victories and problem-solving excellence
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProgrammingStats;

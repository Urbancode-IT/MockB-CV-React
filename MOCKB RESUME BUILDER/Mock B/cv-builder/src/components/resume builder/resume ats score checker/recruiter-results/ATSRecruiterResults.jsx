import React from 'react';
import './ATSRecruiterResults.css';

function getBarColor(pct) {
  if (pct >= 75) return '#22c55e';
  if (pct >= 50) return '#D4C77A';
  if (pct >= 30) return '#f97316';
  return '#ef4444';
}

export default function ATSRecruiterResults({ results }) {
  if (!results || results.length === 0) return null;
  return (
    <section className="results-section recruiter-results-section" style={{ paddingBottom: '8rem' }}>
      <h2 className="section-heading">AI Candidates Leaderboard</h2>
      <p className="section-sub">Resumes sorted by ATS matching score</p>
      <div className="recruiter-table-wrap">
        <table className="recruiter-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Candidate Name</th>
              <th>Match Score</th>
              <th>Primary Skills</th>
              <th>Match Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={res.id}>
                <td style={{ fontWeight: 'bold', color: index === 0 ? '#D4C77A' : '#fff' }}>#{index + 1}</td>
                <td>{res.candidateName}</td>
                <td style={{ fontWeight: 'bold', color: getBarColor(res.score) }}>{res.score}%</td>
                <td>{res.topSkill}</td>
                <td>
                  <span className={`match-badge ${res.score >= 80 ? 'match-high' : res.score >= 65 ? 'match-mid' : 'match-low'}`}>
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

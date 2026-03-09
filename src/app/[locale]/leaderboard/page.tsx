'use client';
import { useState } from 'react';
import { Trophy, TrendingUp, Star, Zap, Bot, Medal, ChevronRight, ArrowUp } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PROJECTS, USERS } from '@/lib/data';

const TABS = ['weekly', 'all-time', 'by-category'] as const;
type Tab = typeof TABS[number];

function rankColor(rank: number) {
  if (rank === 1) return '#fbbf24';
  if (rank === 2) return '#94a3b8';
  if (rank === 3) return '#b45309';
  return 'var(--text-secondary)';
}

function rankEmoji(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>('weekly');
  const [userTab, setUserTab] = useState<'projects' | 'creators'>('projects');

  const ranked = [...PROJECTS]
    .sort((a, b) => {
      if (tab === 'weekly') return (b.stars * 0.7 + b.views * 0.001) - (a.stars * 0.7 + a.views * 0.001);
      if (tab === 'all-time') return b.aiScore * 50 + b.stars - (a.aiScore * 50 + a.stars);
      return b.aiScore - a.aiScore;
    });

  const sortedUsers = [...USERS].sort((a, b) => b.aiScore - a.aiScore);

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <Trophy size={32} className="text-yellow-400" />
          <h1 className="text-4xl font-bold section-title">Leaderboard</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          The most-loved AI-generated projects and top vibe builders
        </p>
      </div>

      {/* Tab: projects vs creators */}
      <div className="flex gap-2 mb-6 justify-center">
        <button onClick={() => setUserTab('projects')} className={`tab-btn px-6 ${userTab === 'projects' ? 'active' : ''}`}>
          🚀 Projects
        </button>
        <button onClick={() => setUserTab('creators')} className={`tab-btn px-6 ${userTab === 'creators' ? 'active' : ''}`}>
          👑 Creators
        </button>
      </div>

      {userTab === 'projects' && (
        <>
          {/* Period tabs */}
          <div className="flex gap-1 mb-6 justify-center p-1 rounded-xl glass" style={{ maxWidth: 'fit-content', margin: '0 auto 24px' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`tab-btn capitalize ${tab === t ? 'active' : ''}`}>
                {t === 'weekly' ? '🔥 Weekly' : t === 'all-time' ? '⭐ All-Time' : '🗂️ By Category'}
              </button>
            ))}
          </div>

          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {/* 2nd */}
            <div className="glass-card p-4 text-center flex flex-col items-center mt-6">
              <div className={`bg-gradient-to-br ${ranked[1]?.previewColor} w-12 h-12 rounded-xl mb-3 flex items-center justify-center`}>
                <span className="text-xl">🥈</span>
              </div>
              <div className="font-semibold text-sm truncate w-full text-center">{ranked[1]?.title}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>@{ranked[1]?.author}</div>
              <div className="flex items-center gap-1 mt-2 text-sm font-bold" style={{ color: '#94a3b8' }}>
                <Star size={12} className="fill-current" />
                {ranked[1]?.stars.toLocaleString()}
              </div>
            </div>

            {/* 1st */}
            <div className="glass-card p-4 text-center flex flex-col items-center neon-border" style={{ borderColor: 'rgba(251,191,36,0.4)', boxShadow: '0 0 30px rgba(251,191,36,0.1)' }}>
              <div className="text-2xl mb-2">👑</div>
              <div className={`bg-gradient-to-br ${ranked[0]?.previewColor} w-14 h-14 rounded-2xl mb-3 flex items-center justify-center`}>
                <span className="text-2xl">🥇</span>
              </div>
              <div className="font-bold text-sm truncate w-full text-center">{ranked[0]?.title}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>@{ranked[0]?.author}</div>
              <div className="flex items-center gap-1 mt-2 font-bold" style={{ color: '#fbbf24' }}>
                <Star size={14} className="fill-current" />
                {ranked[0]?.stars.toLocaleString()}
              </div>
            </div>

            {/* 3rd */}
            <div className="glass-card p-4 text-center flex flex-col items-center mt-6">
              <div className={`bg-gradient-to-br ${ranked[2]?.previewColor} w-12 h-12 rounded-xl mb-3 flex items-center justify-center`}>
                <span className="text-xl">🥉</span>
              </div>
              <div className="font-semibold text-sm truncate w-full text-center">{ranked[2]?.title}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>@{ranked[2]?.author}</div>
              <div className="flex items-center gap-1 mt-2 text-sm font-bold" style={{ color: '#b45309' }}>
                <Star size={12} className="fill-current" />
                {ranked[2]?.stars.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Full table */}
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {['Rank', 'Project', 'Category', 'AI Tools', 'Stars', 'AI Score', 'Downloads'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--text-secondary)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ranked.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b transition-colors hover:bg-white/2"
                    style={{ borderColor: 'var(--border-color)', background: i < 3 ? `rgba(139,92,246,0.03)` : '' }}
                  >
                    <td className="px-4 py-3 font-bold" style={{ color: rankColor(i + 1), fontFamily: 'Space Grotesk' }}>
                      {rankEmoji(i + 1)}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/projects/${p.id}`} className="flex items-center gap-2 hover:text-purple-400 group">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.previewColor} shrink-0`} />
                        <div>
                          <div className="font-semibold group-hover:text-purple-400 transition-colors">{p.title}</div>
                          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>@{p.author}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-purple text-xs">{p.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {p.aiTools.slice(0, 2).map(t => (
                          <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{
                            background: 'rgba(139,92,246,0.1)',
                            color: '#a78bfa',
                            border: '1px solid rgba(139,92,246,0.2)',
                            fontFamily: 'Space Mono',
                          }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 font-semibold">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        {p.stars.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="progress-bar flex-1" style={{ width: '60px' }}>
                          <div className="progress-fill" style={{ width: `${p.aiScore}%` }} />
                        </div>
                        <span className="font-bold text-xs" style={{ color: '#a78bfa' }}>{p.aiScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                      {p.downloads.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {userTab === 'creators' && (
        <div className="space-y-3 max-w-2xl mx-auto">
          {sortedUsers.map((user, i) => (
            <Link key={user.id} href={`/profile/${user.username}`}>
              <div className="glass-card p-5 flex items-center gap-4 cursor-pointer hover:border-purple-500/30 transition-all">
                <div className="w-8 text-center font-bold text-lg" style={{ color: rankColor(i + 1), fontFamily: 'Space Grotesk' }}>
                  {rankEmoji(i + 1)}
                </div>
                <img src={user.avatar} alt={user.displayName} className="avatar w-12 h-12" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{user.displayName}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>@{user.username}</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {user.badges.slice(0, 2).map(b => (
                      <span key={b.id} className="badge badge-purple text-xs">{b.emoji} {b.name}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold gradient-text" style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem' }}>
                    {user.aiScore.toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI Score</div>
                  <div className="text-xs mt-1" style={{ color: '#10b981' }}>🔥 {user.streak}d streak</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

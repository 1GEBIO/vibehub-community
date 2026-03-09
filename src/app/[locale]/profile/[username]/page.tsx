'use client';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Star, Users, Zap, Calendar, Flame, GitFork, Bot, Award, Link2, Settings, ShieldCheck, ExternalLink } from 'lucide-react';
import { USERS, PROJECTS } from '@/lib/data';
import { MOCK_CONNECTED_ACCOUNTS, PLATFORMS } from '@/lib/platforms';
import ProjectCard from '@/components/ProjectCard';

interface Props { params: Promise<{ username: string }> }

const RARITY_COLOR = {
  common: 'badge-cyan',
  rare: 'badge-purple',
  epic: 'badge-pink',
  legendary: 'badge-orange',
};

export default function ProfilePage({ params }: Props) {
  const { username } = use(params);
  const user = USERS.find(u => u.username === username);
  if (!user) notFound();

  const userProjects = PROJECTS.filter(p => p.author === username);

  // Show connected platforms only for vibe_alice (our demo user); others get empty
  const connectedAccounts = username === 'vibe_alice' ? MOCK_CONNECTED_ACCOUNTS : [];

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ── LEFT: Profile card ── */}
        <div className="lg:col-span-1 space-y-5">
          {/* Avatar + identity */}
          <div className="glass-card p-6 text-center">
            <div className="relative inline-block mb-4">
              <img src={user.avatar} alt={user.displayName} className="avatar w-24 h-24 mx-auto" />
              <div
                className="absolute bottom-0 right-0 px-2 py-1 rounded-full text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: 'white' }}
              >
                🔥 {user.streak}d
              </div>
            </div>
            <h1 className="text-xl font-bold section-title">{user.displayName}</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>@{user.username}</p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{user.bio}</p>

            <div className="flex justify-center gap-4 mt-4 py-4 border-y" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-center">
                <div className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>{user.followers.toLocaleString()}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>{user.following.toLocaleString()}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Following</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="btn-primary flex-1">Follow</button>
              {username === 'vibe_alice' && (
                <Link href="/settings/connections">
                  <button className="btn-ghost px-3 py-2" title="Manage connected accounts">
                    <Settings size={15} />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* ── Connected Platforms ── */}
          {connectedAccounts.length > 0 && (
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Link2 size={14} className="text-cyan-400" />
                  Connected Platforms
                </h3>
                <Link href="/settings/connections" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-0.5">
                  Manage <ExternalLink size={10} />
                </Link>
              </div>
              <div className="space-y-2">
                {connectedAccounts.map(account => {
                  const platform = PLATFORMS.find(p => p.id === account.platformId);
                  if (!platform) return null;
                  return (
                    <div
                      key={account.platformId}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors"
                      style={{ background: `${platform.color}10`, border: `1px solid ${platform.color}25` }}
                    >
                      <span className="text-base">{platform.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate">
                          @{account.username}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {platform.name}
                          {account.publicRepos !== undefined && ` · ${account.publicRepos} repos`}
                          {account.models !== undefined && ` · ${account.models} models`}
                          {account.deployments !== undefined && ` · ${account.deployments} deploys`}
                        </div>
                      </div>
                      {account.verified && (
                        <span title="Verified">
                          <ShieldCheck size={12} className="text-green-400 shrink-0" />
                        </span>
                      )}
                      {account.primaryForImport && (
                        <span className="text-yellow-400 text-xs shrink-0" title="Primary import source">⭐</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <Link href="/settings/connections">
                <button className="btn-ghost w-full mt-3 text-xs flex items-center justify-center gap-1.5">
                  <Link2 size={11} />
                  Connect more platforms
                </button>
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="font-semibold text-sm">Stats</h3>
            {[
              { icon: Zap, label: 'AI Score', value: user.aiScore.toLocaleString(), color: '#8b5cf6' },
              { icon: Star, label: 'Total Stars', value: user.totalStars.toLocaleString(), color: '#fbbf24' },
              { icon: GitFork, label: 'Projects', value: user.projects, color: '#06b6d4' },
              { icon: Flame, label: 'Streak', value: `${user.streak} days`, color: '#f97316' },
              { icon: Calendar, label: 'Joined', value: user.joinedAt, color: '#10b981' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-sm">
                <s.icon size={15} style={{ color: s.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span className="ml-auto font-semibold">{s.value}</span>
              </div>
            ))}
          </div>

          {/* AI Tools */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Bot size={15} className="text-purple-400" /> Preferred Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.tools.map(t => (
                <span key={t} className="badge badge-purple">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="lg:col-span-3 space-y-6">
          {/* AI Score bar */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <Zap size={16} className="text-purple-400" />
                AI Score Breakdown
              </h2>
              <span className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                {user.aiScore.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Project Quality', value: Math.min(100, Math.round(user.aiScore / 150)), color: '#8b5cf6' },
                { label: 'Community Impact', value: Math.min(100, Math.round(user.totalStars / 200)), color: '#ec4899' },
                { label: 'Consistency', value: Math.min(100, user.streak * 1.5), color: '#10b981' },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>{m.label}</span>
                    <span style={{ color: m.color }}>{m.value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.value}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}99)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform contribution highlights (only if connected) */}
          {connectedAccounts.length > 0 && (
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Link2 size={16} className="text-cyan-400" />
                Platform Contributions
                <span className="badge badge-cyan">{connectedAccounts.length} linked</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {connectedAccounts.map(account => {
                  const platform = PLATFORMS.find(p => p.id === account.platformId)!;
                  const metric =
                    account.publicRepos !== undefined ? { val: account.publicRepos, label: 'repos' } :
                    account.models !== undefined ? { val: account.models, label: 'models' } :
                    account.deployments !== undefined ? { val: account.deployments, label: 'deploys' } :
                    account.packages !== undefined ? { val: account.packages, label: 'pkgs' } :
                    account.posts !== undefined ? { val: account.posts, label: 'posts' } :
                    { val: '—', label: 'linked' };

                  return (
                    <div
                      key={account.platformId}
                      className="glass-card p-4 text-center"
                      style={{ borderColor: `${platform.color}30` }}
                    >
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <div className="font-bold text-lg" style={{ color: platform.color, fontFamily: 'Space Grotesk' }}>
                        {metric.val}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{metric.label}</div>
                      <div className="text-xs font-medium mt-1">{platform.name}</div>
                      {account.verified && (
                        <div className="flex items-center justify-center gap-0.5 mt-1 text-xs text-green-400">
                          <ShieldCheck size={9} />verified
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Award size={16} className="text-yellow-400" />
              Badges
              <span className="badge badge-orange">{user.badges.length}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {user.badges.map(badge => (
                <div
                  key={badge.id}
                  className="glass-card p-4 text-center hover:scale-105 transition-transform"
                  style={{ borderColor: badge.rarity === 'legendary' ? 'rgba(251,191,36,0.4)' : badge.rarity === 'epic' ? 'rgba(139,92,246,0.4)' : undefined }}
                >
                  <div className="text-3xl mb-2">{badge.emoji}</div>
                  <div className="font-semibold text-xs" style={{ fontFamily: 'Space Grotesk' }}>{badge.name}</div>
                  <div className="mt-1">
                    <span className={`badge ${RARITY_COLOR[badge.rarity]}`}>{badge.rarity}</span>
                  </div>
                  <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{badge.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              🚀 Projects
              <span className="badge badge-purple">{userProjects.length}</span>
            </h2>
            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <div className="text-4xl mb-3">🏗️</div>
                <p style={{ color: 'var(--text-secondary)' }}>No projects yet — time to vibe!</p>
                <Link href="/submit">
                  <button className="btn-primary mt-4">Submit First Project</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

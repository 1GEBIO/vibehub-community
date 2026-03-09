'use client';
import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Star, GitFork, Eye, Download, Bot, ChevronDown, ChevronRight,
  Copy, Share2, Play, Users, Sparkles, ArrowRight, Check, Code2, Zap, MessageSquare
} from 'lucide-react';
import { PROJECTS } from '@/lib/data';

interface Props { params: Promise<{ id: string }> }

const CURATION_COLORS: Record<string, string> = {
  'Creative App': 'badge-pink',
  'Dev Tool': 'badge-cyan',
  'Utility': 'badge-green',
  'Agent': 'badge-green',
  'Game': 'badge-cyan',
  'Art': 'badge-pink',
};

export default function ProjectDetail({ params }: Props) {
  const { id } = use(params);
  const project = PROJECTS.find(p => p.id === id);
  if (!project) notFound();

  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(project.stars);
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const [promptOpen, setPromptOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'run'>('overview');
  const [collab, setCollab] = useState('');
  const [collabMessages, setCollabMessages] = useState([
    { user: 'vibe_alice', msg: 'I tweaked the streaming logic —*/} should be 30% faster now.', time: '2m ago' },
    { user: 'vibe_bob', msg: 'Can we add a model selector dropdown? 🤔', time: '5m ago' },
    { user: 'AI Assistant', msg: '💡 Suggestion: Moving the state to a Zustand store would enable undo/redo.', time: '8m ago', isAI: true },
  ]);

  const handleStar = () => {
    setStarred(!starred);
    setStarCount(c => starred ? c - 1 : c + 1);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCollab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collab.trim()) return;
    setCollabMessages(prev => [{ user: 'You', msg: collab, time: 'just now' }, ...prev]);
    setCollab('');
  };

  const badgeClass = CURATION_COLORS[project.aiCurationBadge] || 'badge-purple';
  const scorePercent = project.aiScore;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/explore" className="hover:text-purple-400 transition-colors">Explore</Link>
        <ChevronRight size={14} />
        <span className="badge badge-purple">{project.category}</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)' }}>{project.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT: Main content ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <div className={`rounded-2xl overflow-hidden relative bg-gradient-to-br ${project.previewColor}`} style={{ height: '220px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-3">
                  {project.category === 'Game' ? '🎮' : project.category === 'Art' ? '🎨' : project.category === 'Agent' ? '🤖' : project.category === 'Data' ? '📊' : '⚡'}
                </div>
                <div className="badge badge-purple ai-badge">{project.aiCurationBadge}</div>
              </div>
            </div>
            {/* Hot */}
            {project.isHot && (
              <div className="absolute top-4 left-4 badge badge-red">🔥 Hot</div>
            )}
            {/* AI Score */}
            <div className="absolute top-4 right-4 glass rounded-xl px-3 py-2 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ background: `conic-gradient(#8b5cf6 ${scorePercent}%, rgba(255,255,255,0.04) ${scorePercent}%)` }}
              >
                <div className="absolute w-5 h-5 rounded-full" style={{ background: 'rgba(10,10,30,0.95)' }} />
                <span className="relative text-xs font-bold" style={{ color: '#a78bfa', fontFamily: 'Space Mono', fontSize: '9px' }}>{scorePercent}</span>
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: '#a78bfa' }}>AI Score</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{project.aiCurationNote.split(';')[0]}</div>
              </div>
            </div>
          </div>

          {/* Title + author */}
          <div>
            <div className="flex items-start flex-wrap gap-3 mb-2">
              <h1 className="text-3xl font-bold section-title">{project.title}</h1>
              {project.isFeatured && <span className="badge badge-purple mt-1.5">⭐ Featured</span>}
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <Link href={`/profile/${project.author}`}>
                <img src={project.authorAvatar} alt={project.author} className="avatar w-6 h-6" />
              </Link>
              <Link href={`/profile/${project.author}`} className="hover:text-purple-400 transition-colors text-sm">
                @{project.author}
              </Link>
              <span>·</span>
              <span className="text-sm">{project.license}</span>
              <span>·</span>
              <span className="text-sm">{project.language}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 py-4 border-y" style={{ borderColor: 'var(--border-color)' }}>
            {[
              { icon: Star, value: starCount.toLocaleString(), label: 'Stars', color: '#fbbf24' },
              { icon: GitFork, value: project.forks.toLocaleString(), label: 'Forks', color: '#06b6d4' },
              { icon: Eye, value: project.views.toLocaleString(), label: 'Views', color: '#8b5cf6' },
              { icon: Download, value: project.downloads.toLocaleString(), label: 'Downloads', color: '#10b981' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon size={16} style={{ color: s.color }} />
                <span className="font-semibold text-sm">{s.value}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            {(['overview', 'code', 'run'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn flex-1 capitalize ${activeTab === tab ? 'active' : ''}`}>
                {tab === 'overview' ? '📋 Overview' : tab === 'code' ? '💻 Code' : '▶️ Run'}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-base font-semibold mb-3">About this project</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{project.longDescription}</p>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-base font-semibold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => <span key={t} className="tag-pill"># {t}</span>)}
                </div>
              </div>

              {/* AI Tools */}
              <div>
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Bot size={16} className="text-purple-400" /> AI Tools Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.aiTools.map(t => (
                    <span key={t} className="badge badge-purple">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Generated Codebase</h2>
                <button onClick={handleCopy} className="btn-ghost flex items-center gap-1.5">
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">
                <div style={{ color: 'rgba(139,92,246,0.5)' }}>{`// ${project.title} — ${project.language}`}</div>
                <div style={{ color: 'rgba(139,92,246,0.5)' }}>{`// Generated by: ${project.aiTools.join(', ')}`}</div>
                <br />
                {project.language === 'TypeScript' || project.language === 'JavaScript' ? (
                  <>
                    <div><span style={{ color: '#f472b6' }}>import</span> <span style={{ color: '#34d399' }}>{`{ useState, useEffect }`}</span> <span style={{ color: '#f472b6' }}>from</span> <span style={{ color: '#fbbf24' }}>&apos;react&apos;</span>;</div>
                    <br />
                    <div><span style={{ color: '#f472b6' }}>export default function</span> <span style={{ color: '#60a5fa' }}>App</span>() {`{`}</div>
                    <div style={{ paddingLeft: '20px' }}><span style={{ color: '#f472b6' }}>const</span> [state, setState] = <span style={{ color: '#60a5fa' }}>useState</span>(null);</div>
                    <div style={{ paddingLeft: '20px' }}><span style={{ color: '#f472b6' }}>{`// ... ${project.description}`}</span></div>
                    <div>{`}`}</div>
                  </>
                ) : project.language === 'Python' ? (
                  <>
                    <div><span style={{ color: '#f472b6' }}>from</span> <span style={{ color: '#34d399' }}>typing</span> <span style={{ color: '#f472b6' }}>import</span> Optional, List</div>
                    <br />
                    <div><span style={{ color: '#f472b6' }}>class</span> <span style={{ color: '#60a5fa' }}>VibeProject</span>:</div>
                    <div style={{ paddingLeft: '20px' }}><span style={{ color: '#fbbf24' }}>&quot;&quot;&quot;{project.description}&quot;&quot;&quot;</span></div>
                  </>
                ) : (
                  <>
                    <div><span style={{ color: '#f472b6' }}>fn</span> <span style={{ color: '#60a5fa' }}>main</span>() {"{"}</div>
                    <div style={{ paddingLeft: '20px' }}><span style={{ color: '#f472b6' }}>println!</span>(<span style={{ color: '#fbbf24' }}>&quot;{project.title}&quot;</span>);</div>
                    <div>{"}"}</div>
                  </>
                )}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                📦 Full source available via fork. {project.forks.toLocaleString()} forks so far.
              </p>
            </div>
          )}

          {activeTab === 'run' && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Play size={16} className="text-green-400" /> Live Preview
              </h2>
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ height: '280px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.previewColor} mx-auto mb-4 flex items-center justify-center`}>
                    <Play size={32} className="text-white" />
                  </div>
                  <p className="font-semibold mb-2">{project.title}</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Click to launch in sandbox</p>
                  <button className="btn-primary flex items-center gap-2 mx-auto">
                    <Play size={14} />
                    Run in Sandbox
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Prompt Chain ── */}
          <div className="glass-card p-5">
            <button
              className="w-full flex items-center justify-between"
              onClick={() => setPromptOpen(!promptOpen)}
            >
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" /> Prompt Chain
                <span className="badge badge-orange">{project.promptChain.length} prompts</span>
              </h2>
              <ChevronDown size={16} style={{ transform: promptOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {promptOpen && (
              <div className="mt-4 space-y-3">
                {project.promptChain.map((prompt, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.4)' }}
                      >
                        {i + 1}
                      </div>
                      {i < project.promptChain.length - 1 && (
                        <div className="w-0.5 flex-1 bg-purple-500/20" style={{ minHeight: '16px' }} />
                      )}
                    </div>
                    <div className="prompt-node flex-1 mb-0 mt-0.5">{prompt}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── AI Feedback ── */}
          <div className="glass-card p-5" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
            <button
              className="w-full flex items-center justify-between"
              onClick={() => setFeedbackOpen(!feedbackOpen)}
            >
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-green-400" />
                AI Feedback
                <span className="badge badge-green">Auto-generated</span>
              </h2>
              <ChevronDown size={16} style={{ transform: feedbackOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {feedbackOpen && (
              <div className="mt-4 space-y-3">
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                  🤖 Our AI curator analyzed this project and generated the following improvement suggestions:
                </p>
                {project.aiFeedback.map((tip, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-sm"
                    style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', color: 'var(--text-primary)', lineHeight: '1.7' }}
                  >
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Collaboration Panel ── */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
              <Users size={16} className="text-cyan-400" /> Collaboration
              <span className="badge badge-cyan">{project.collaborators.length + 1} active</span>
            </h2>
            <div className="flex gap-1 mb-4">
              {[project.author, ...project.collaborators].map((user, i) => (
                <div key={user} className="flex items-center -ml-2 first:ml-0">
                  <img
                    src={`https:{/*api.dicebear.com/7.x/avataaars/svg?seed=${user}&backgroundColor=b6e3f4`}
                    alt={user}
                    className="avatar w-8 h-8"
                    title={`@${user}`}
                  />
                </div>
              ))}
              <button className="w-8 h-8 rounded-full -ml-2 flex items-center justify-center text-xs font-bold border border-dashed"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>+</button>
            </div>
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
              {collabMessages.map((m, i) => (
                <div key={i} className="p-3 rounded-xl text-sm" style={{
                  background: m.isAI ? 'rgba(139,92,246,0.07)' : 'rgba(255,255,255,0.03)',
                  border: m.isAI ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span className="font-medium" style={{ color: m.isAI ? '#a78bfa' : '#60a5fa' }}>{m.user}</span>
                  <span className="text-xs ml-2" style={{ color: 'var(--text-secondary)' }}>{m.time}</span>
                  <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{m.msg}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleCollab} className="flex gap-2">
              <input
                value={collab}
                onChange={e => setCollab(e.target.value)}
                placeholder="Suggest an edit or ask the team..."
                className="input-field text-sm py-2"
              />
              <button type="submit" className="btn-primary px-3 py-2">
                <MessageSquare size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="space-y-5">
          {/* Repo Link */}
          <div className="glass-card p-4 space-y-3">
            <button
              onClick={handleStar}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${starred ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400' : 'btn-primary'}`}
            >
              <Star size={16} className={starred ? 'fill-yellow-400' : ''} />
              {starred ? 'Starred' : 'Star'} · {starCount.toLocaleString()}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-secondary flex items-center justify-center gap-1.5 py-2.5 text-sm">
                <GitFork size={14} />
                Fork
              </button>
              <button className="btn-secondary flex items-center justify-center gap-1.5 py-2.5 text-sm">
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>

          {/* Project Info */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-semibold text-sm">Project Info</h3>
            {[
              { label: 'Language', value: project.language },
              { label: 'License', value: project.license },
              { label: 'Created', value: project.createdAt },
              { label: 'Updated', value: project.updatedAt },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>

          {/* App Execution Banner */}
          <div className="glass-card p-4" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Bot size={16} className="text-purple-400" />
              <h3 className="font-semibold text-sm">AI Curation</h3>
              <span className="badge badge-purple ai-badge">Auto</span>
            </div>
            <div className={`badge ${badgeClass} mb-3 text-xs`}>{project.aiCurationBadge}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.aiCurationNote}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--text-secondary)' }}>AI Quality Score</span>
                <span className="font-bold" style={{ color: '#a78bfa' }}>{project.aiScore}/100</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${project.aiScore}%` }} />
              </div>
            </div>
          </div>

          {/* Collaborators */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-3">Team</h3>
            <div className="space-y-2">
              {[project.author, ...project.collaborators].map((user, i) => (
                <Link key={user} href={`/profile/${user}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                  <img
                    src={`https:{/*api.dicebear.com/7.x/avataaars/svg?seed=${user}&backgroundColor=b6e3f4`}
                    alt={user}
                    className="avatar w-7 h-7"
                  />
                  <span className="text-sm">@{user}</span>
                  {i === 0 && <span className="badge badge-purple ml-auto text-xs">Author</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* More from author */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-3">More from @{project.author}</h3>
            {PROJECTS.filter(p => p.author === project.author && p.id !== project.id).slice(0, 2).map(p => (
              <Link key={p.id} href={`/projects/${p.id}`} className="flex items-center gap-3 mb-3 hover:text-purple-400 transition-colors group">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.previewColor} shrink-0`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-purple-400">{p.title}</div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <Star size={10} className="text-yellow-400" />
                    {p.stars.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

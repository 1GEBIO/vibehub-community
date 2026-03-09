'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Zap, Star, Users, Bot, TrendingUp, Sparkles, ChevronRight, Upload } from 'lucide-react';
import { PROJECTS, USERS, STATS, CATEGORIES } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

const HERO_PHRASES = [
  'Vibe Coding',
  'Prompt Engineering',
  'AI-First Development',
  'Zero-Manual Coding',
  'Generative Dev',
];

export default function HomePage() {
  const t = useTranslations('Home');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed !== HERO_PHRASES[phraseIdx]) {
        timeout = setTimeout(() => setDisplayed(HERO_PHRASES[phraseIdx].slice(0, displayed.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed === '') {
        timeout = setTimeout(() => {
          setTyping(true);
          setPhraseIdx((prev) => (prev + 1) % HERO_PHRASES.length);
        }, 100);
      } else {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, phraseIdx]);

  const featured = PROJECTS.filter(p => p.isFeatured).slice(0, 3);
  const trending = [...PROJECTS].sort((a, b) => b.stars - a.stars).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 pt-32 pb-32 text-center">
        {/* Announcement pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 neon-border text-sm"
          style={{ background: 'rgba(139,92,246,0.08)', color: '#c4b5fd' }}>
          <Sparkles size={14} className="text-purple-400" />
          <span>AI Curation v2 is live — smarter project scoring</span>
          <ChevronRight size={14} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
          {t('hero_title_1')}
          <br />
          <span className="gradient-text">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}>
          {t('hero_desc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/explore">
            <button className="btn-primary flex items-center gap-2 text-base px-8 py-3">
              <Zap size={18} />
              {t('explore_btn')}
              <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="/submit">
            <button className="btn-secondary flex items-center gap-2 text-base px-8 py-3">
              <Upload size={16} />
              {t('submit_btn')}
            </button>
          </Link>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { label: 'Projects', value: STATS.totalProjects.toLocaleString(), color: 'from-violet-600 to-pink-600', icon: '🚀' },
            { label: 'Builders', value: STATS.totalUsers.toLocaleString(), color: 'from-cyan-600 to-blue-600', icon: '👾' },
            { label: 'Stars Given', value: `${(STATS.totalStars / 1000).toFixed(0)}K`, color: 'from-yellow-500 to-orange-600', icon: '⭐' },
            { label: 'Prompts Used', value: `${(STATS.promptsGenerated / 1000000).toFixed(1)}M`, color: 'from-green-500 to-teal-600', icon: '🧠' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text`}
                style={{ WebkitTextFillColor: 'transparent', fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold section-title">Browse by Vibe</h2>
          <Link href="/explore" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="cat-scroll">
          {CATEGORIES.map(cat => (
            <Link key={cat.name} href={`/explore?category=${encodeURIComponent(cat.name)}`}>
              <div
                className="shrink-0 glass-card px-5 py-3 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                style={{ minWidth: '160px' }}
              >
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>{cat.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{cat.count} projects</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold section-title flex items-center gap-2">
              <Sparkles size={18} className="text-purple-400" />
              Featured Vibes
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Handpicked by our AI curator</p>
          </div>
          <Link href="/explore" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* ─── TRENDING ─────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold section-title flex items-center gap-2">
            <TrendingUp size={18} className="text-pink-400" />
            Trending Now
          </h2>
          <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
            Full leaderboard <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trending.map((p, i) => <ProjectCard key={p.id} project={p} rank={i + 1} />)}
        </div>
      </section>

      {/* ─── AI CURATION EXPLAINER ────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="orb" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, #8b5cf6, transparent)', top: '-100px', right: '-100px', opacity: 0.2 }} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="badge badge-purple mb-4 ai-badge">🤖 AI-Powered</div>
              <h2 className="text-3xl font-bold mb-4 section-title">
                Your Projects,<br />
                <span className="gradient-text">Curated by AI</span>
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Every uploaded project is automatically analyzed by our LLM curator.
                It classifies your work, scores its quality, and generates actionable
                improvement suggestions — all in seconds.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🏷️', title: 'Auto-Classification', desc: 'LLM reads your code and tags it precisely' },
                  { icon: '📊', title: 'AI Quality Score', desc: 'Multi-dimensional scoring: creativity, utility, craft' },
                  { icon: '💡', title: 'Improvement Hints', desc: 'Specific, actionable AI feedback on every project' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{f.icon}</span>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{f.title}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="prompt-node">
                <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>AI CURATOR INPUT</span>
                <p className="mt-1">Analyzing: NeuralChat UI — TypeScript, 4.2K lines, glassmorphism chat interface...</p>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-6 bg-purple-500/40"></div>
                  <Bot size={20} className="text-purple-400 animate-pulse" />
                  <div className="w-0.5 h-6 bg-purple-500/40"></div>
                </div>
              </div>
              <div className="prompt-node" style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                <span style={{ color: 'rgba(52,211,153,0.6)', fontSize: '10px' }}>AI CURATOR OUTPUT</span>
                <p className="mt-1">Category: Creative App · Score: 96/100 · Tag: production-ready, streaming, llm-ui</p>
                <p className="mt-1">💡 Suggestion: Memoize MessageBubble for 40% perf improvement...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOP CREATORS ─────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold section-title flex items-center gap-2">
            <Star size={18} className="text-yellow-400" />
            Top Creators
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USERS.map((user, i) => (
            <Link key={user.id} href={`/profile/${user.username}`}>
              <div className="glass-card p-5 flex items-center gap-4 cursor-pointer">
                <div className="relative">
                  <img src={user.avatar} alt={user.displayName} className="avatar w-12 h-12" />
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b45309', color: '#000' }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ fontFamily: 'Space Grotesk' }}>{user.displayName}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>@{user.username}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <Star size={10} className="text-yellow-400" />
                      {user.totalStars.toLocaleString()}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--accent-purple)' }}>
                      🔥 {user.streak}d streak
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>{user.aiScore.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI Score</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 mb-32">
        <div
          className="rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, #8b5cf6, transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.1 }} />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 section-title">
              Ready to drop your <span className="gradient-text">first vibe?</span>
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Join 18,420 builders who let AI do the heavy lifting.
              Upload your prompt-to-code project and get instant AI feedback.
            </p>
            <Link href="/submit">
              <button className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
                <Zap size={18} />
                Start Vibing
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

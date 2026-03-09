'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import {
  Link2, Link2Off, Check, ArrowRight, Download, RefreshCw,
  ShieldCheck, Zap, AlertCircle, ChevronRight, Star, ExternalLink, Settings
} from 'lucide-react';
import {
  PLATFORMS, MOCK_CONNECTED_ACCOUNTS, MOCK_IMPORTABLE_REPOS,
  ConnectedAccount, Platform, PlatformId, PLATFORM_CATEGORY_LABELS
} from '@/lib/platforms';

// ── Colour helper ──────────────────────────────────────────────────────────────
function platformBg(color: string) {
  return `${color}18`;
}

// ── Platform card ──────────────────────────────────────────────────────────────
function PlatformCard({
  platform,
  connected,
  onConnect,
  onDisconnect,
  isPrimary,
  onSetPrimary,
}: {
  platform: Platform;
  connected?: ConnectedAccount;
  onConnect: (id: PlatformId) => void;
  onDisconnect: (id: PlatformId) => void;
  isPrimary: boolean;
  onSetPrimary: (id: PlatformId) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConnect(platform.id);
    }, 1800);
  };

  const isConnected = !!connected;

  return (
    <div
      className="glass-card p-5 flex flex-col gap-4 transition-all"
      style={{
        borderColor: isConnected ? `${platform.color}40` : undefined,
        boxShadow: isConnected ? `0 0 20px ${platform.color}10` : undefined,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: `bg-gradient-to-br ${platform.gradient}`, backgroundColor: platformBg(platform.color), border: `1px solid ${platform.color}30` }}
        >
          {platform.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ fontFamily: 'Space Grotesk' }}>{platform.name}</span>
            {isConnected && (
              <span className="badge badge-green text-xs py-0.5">
                <Check size={9} className="inline mr-0.5" />Connected
              </span>
            )}
            {isPrimary && isConnected && (
              <span className="badge badge-purple text-xs py-0.5">⭐ Primary</span>
            )}
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
            {PLATFORM_CATEGORY_LABELS[platform.category]}
          </span>
        </div>
      </div>

      {/* Connected identity */}
      {isConnected && connected && (
        <div className="flex items-center gap-2 p-3 rounded-xl"
          style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          {connected.avatar && (
            <img src={connected.avatar} alt={connected.username} className="avatar w-7 h-7" />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">@{connected.username}</div>
            <div className="flex gap-3 text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {connected.publicRepos !== undefined && <span>📁 {connected.publicRepos} repos</span>}
              {connected.models !== undefined && <span>🧠 {connected.models} models</span>}
              {connected.spaces !== undefined && <span>🌐 {connected.spaces} spaces</span>}
              {connected.deployments !== undefined && <span>▲ {connected.deployments} deploys</span>}
              {connected.packages !== undefined && <span>📦 {connected.packages} packages</span>}
              {connected.followers !== undefined && <span>👥 {connected.followers.toLocaleString()} followers</span>}
              {connected.verified && (
                <span className="flex items-center gap-0.5 text-green-400">
                  <ShieldCheck size={10} />Verified
                </span>
              )}
            </div>
          </div>
          <span className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>
            since {connected.connectedAt}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {platform.description}
      </p>

      {/* Features */}
      <div className="space-y-1.5">
        {platform.features.map(f => (
          <div key={f} className="flex items-start gap-2 text-xs" style={{ color: isConnected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            <Check size={11} className={`mt-0.5 shrink-0 ${isConnected ? 'text-green-400' : 'text-gray-600'}`} />
            {f}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
        {!isConnected ? (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-2.5 text-sm"
            id={`connect-${platform.id}`}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 14, height: 14 }} />
                Connecting…
              </>
            ) : (
              <>
                <Link2 size={14} />
                Connect {platform.name}
              </>
            )}
          </button>
        ) : (
          <>
            {!isPrimary && (
              <button
                onClick={() => onSetPrimary(platform.id)}
                className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 py-2"
              >
                <Star size={12} />
                Set as Primary
              </button>
            )}
            <button
              className="btn-ghost text-xs flex items-center gap-1.5 py-2 px-3"
              style={{ color: '#06b6d4' }}
              title="Re-sync account data"
            >
              <RefreshCw size={12} />
            </button>
            <button
              onClick={() => onDisconnect(platform.id)}
              className="btn-ghost text-xs flex items-center gap-1.5 py-2 px-3"
              style={{ color: '#f87171' }}
            >
              <Link2Off size={12} />
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Import repo card ───────────────────────────────────────────────────────────
function ImportRepoCard({ repo, onImport, imported }: {
  repo: typeof MOCK_IMPORTABLE_REPOS[0];
  onImport: (id: string) => void;
  imported: boolean;
}) {
  const platform = PLATFORMS.find(p => p.id === repo.platform)!;

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all"
      style={{
        background: imported ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${imported ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      {/* Platform icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
        style={{ background: platformBg(platform.color), border: `1px solid ${platform.color}30` }}
      >
        {platform.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm truncate" style={{ fontFamily: 'Space Mono', color: '#c4b5fd' }}>
            {repo.name}
          </span>
          {repo.isAIDetected && (
            <span className="badge badge-purple text-xs py-0.5">
              🤖 AI-gen · {repo.aiConfidence}%
            </span>
          )}
          {!repo.isAIDetected && (
            <span className="badge badge-orange text-xs py-0.5">
              <AlertCircle size={9} className="inline" /> Manual code?
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>{repo.description}</p>
        <div className="flex gap-3 text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          <span>· {repo.language}</span>
          <span className="flex items-center gap-0.5">
            <Star size={10} className="text-yellow-400" />{repo.stars.toLocaleString()}
          </span>
          <span>updated {repo.updatedAt}</span>
        </div>
      </div>

      {/* Import button */}
      <button
        onClick={() => onImport(repo.id)}
        disabled={imported || !repo.isAIDetected}
        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
          imported
            ? 'text-green-400 border border-green-400/30 bg-green-400/10'
            : !repo.isAIDetected
            ? 'opacity-30 cursor-not-allowed btn-ghost'
            : 'btn-primary'
        }`}
        title={!repo.isAIDetected ? 'Repo not detected as AI-generated' : undefined}
      >
        {imported ? (
          <><Check size={12} />Imported</>
        ) : (
          <><Download size={12} />Import</>
        )}
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ConnectionsPage() {
  const [connected, setConnected] = useState<ConnectedAccount[]>(MOCK_CONNECTED_ACCOUNTS);
  const [primaryId, setPrimaryId] = useState<PlatformId>('github');
  const [imported, setImported] = useState<string[]>(['r1', 'r2']); // pre-imported
  const [activeTab, setActiveTab] = useState<'accounts' | 'import' | 'sso'>('accounts');
  const [categoryFilter, setCategoryFilter] = useState<Platform['category'] | 'all'>('all');
  const [disconnectConfirm, setDisconnectConfirm] = useState<PlatformId | null>(null);

  const connectedIds = useMemo(() => new Set(connected.map(c => c.platformId)), [connected]);

  const handleConnect = (platformId: PlatformId) => {
    const platform = PLATFORMS.find(p => p.id === platformId)!;
    const newAccount: ConnectedAccount = {
      platformId,
      username: `vibe_alice_${platformId}`,
      displayName: 'Alice Chen',
      connectedAt: new Date().toISOString().split('T')[0],
      verified: true,
      primaryForImport: false,
      publicRepos: platformId === 'gitlab' ? 22 : undefined,
      packages: platformId === 'npm' ? 8 : undefined,
      deployments: platformId === 'vercel' ? 17 : undefined,
      posts: platformId === 'devto' ? 14 : undefined,
    };
    setConnected(prev => [...prev, newAccount]);
  };

  const handleDisconnect = (platformId: PlatformId) => {
    if (disconnectConfirm === platformId) {
      setConnected(prev => prev.filter(c => c.platformId !== platformId));
      if (primaryId === platformId) setPrimaryId('github');
      setDisconnectConfirm(null);
    } else {
      setDisconnectConfirm(platformId);
      setTimeout(() => setDisconnectConfirm(null), 4000);
    }
  };

  const filteredPlatforms = PLATFORMS.filter(p =>
    categoryFilter === 'all' || p.category === categoryFilter
  );

  const importRepos = MOCK_IMPORTABLE_REPOS.filter(r =>
    connectedIds.has(r.platform)
  );

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-24 py-10">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/profile/vibe_alice" className="hover:text-purple-400 transition-colors">Profile</Link>
        <ChevronRight size={14} />
        <Settings size={14} />
        <span style={{ color: 'var(--text-primary)' }}>Connected Accounts</span>
      </div>

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold section-title flex items-center gap-3 mb-2">
          <Link2 size={28} className="text-purple-400" />
          Connected Accounts
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Link your developer and social platforms to VibeHub — one login, every platform.
          We never store passwords; all connections use official OAuth 2.0.
        </p>
      </div>

      {/* ── SSO Notice ── */}
      <div
        className="glass-card p-4 mb-6 flex items-start gap-3"
        style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.05)' }}
      >
        <ShieldCheck size={18} className="text-purple-400 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold text-sm mb-0.5">Single Sign-On (SSO) — One VibeHub account</div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            All your connected platforms appear on your profile under one identity.
            You can sign in to VibeHub using any of your connected accounts — no separate passwords needed.
            Disconnect any platform at any time without losing your VibeHub data.
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', maxWidth: 'fit-content' }}
      >
        {[
          { id: 'accounts', label: '🔗 Platform Links', count: connected.length },
          { id: 'import', label: '📥 Import Projects', count: importRepos.filter(r => r.isAIDetected).length },
          { id: 'sso', label: '🔐 Sign-In Methods' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: activeTab === tab.id ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.07)', color: activeTab === tab.id ? '#c4b5fd' : 'var(--text-secondary)' }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════ TAB: ACCOUNTS */}
      {activeTab === 'accounts' && (
        <>
          {/* Summary bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Connected', value: connected.length, color: '#10b981', icon: '🔗' },
              { label: 'Available', value: PLATFORMS.length - connected.length, color: '#8b5cf6', icon: '➕' },
              { label: 'Verified', value: connected.filter(c => c.verified).length, color: '#06b6d4', icon: '✅' },
              { label: 'Primary', value: 1, color: '#fbbf24', icon: '⭐' },
            ].map(s => (
              <div key={s.label} className="glass-card p-3 flex items-center gap-2">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-bold text-lg" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div className="cat-scroll mb-5">
            {(['all', 'dev', 'ai', 'deploy', 'social'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`tag-pill shrink-0 capitalize ${categoryFilter === cat ? 'active' : ''}`}
              >
                {cat === 'all' ? '🌐 All Platforms' :
                  cat === 'dev' ? '🔧 Dev Tools' :
                  cat === 'ai' ? '🤖 AI Platforms' :
                  cat === 'deploy' ? '🚀 Deployment' : '💬 Social'}
              </button>
            ))}
          </div>

          {/* Platform grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlatforms.map(platform => (
              <div key={platform.id} className="relative">
                {disconnectConfirm === platform.id && (
                  <div
                    className="absolute inset-0 z-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(239,68,68,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(239,68,68,0.4)' }}
                  >
                    <div className="text-center p-4">
                      <div className="text-lg mb-2">⚠️</div>
                      <div className="font-semibold text-sm mb-1">Confirm disconnect?</div>
                      <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                        You can reconnect anytime without losing data
                      </p>
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleDisconnect(platform.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 font-semibold">
                          Yes, disconnect
                        </button>
                        <button onClick={() => setDisconnectConfirm(null)} className="btn-ghost text-xs px-3 py-1.5">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <PlatformCard
                  platform={platform}
                  connected={connected.find(c => c.platformId === platform.id)}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  isPrimary={primaryId === platform.id}
                  onSetPrimary={setPrimaryId}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════ TAB: IMPORT */}
      {activeTab === 'import' && (
        <div className="space-y-5">
          <div className="glass-card p-4" style={{ borderColor: 'rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.04)' }}>
            <div className="flex items-start gap-2">
              <Download size={16} className="text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm mb-0.5">One-click Project Import</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Our AI scans your connected repositories and detects which ones are AI-generated (confidence score shown).
                  Only AI-generated projects can be imported — keeping VibeHub 100% vibe.
                </p>
              </div>
            </div>
          </div>

          {importRepos.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <div className="text-4xl mb-3">🔌</div>
              <div className="font-semibold mb-2">No connected platforms yet</div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Connect GitHub or Hugging Face to import your AI projects
              </p>
              <button onClick={() => setActiveTab('accounts')} className="btn-primary">
                Connect Platforms →
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  Detected Repositories
                  <span className="badge badge-cyan">{importRepos.length} found</span>
                  <span className="badge badge-green">{importRepos.filter(r => r.isAIDetected).length} AI-gen</span>
                </h2>
                <button className="btn-ghost text-xs flex items-center gap-1.5">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              <div className="space-y-2.5">
                {importRepos.map(repo => (
                  <ImportRepoCard
                    key={repo.id}
                    repo={repo}
                    onImport={id => setImported(prev => [...prev, id])}
                    imported={imported.includes(repo.id)}
                  />
                ))}
              </div>

              <div
                className="text-center p-4 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}
              >
                Don&apos;t see a repo? Try refreshing or connect more platforms in the <button onClick={() => setActiveTab('accounts')} className="text-purple-400 hover:text-purple-300 underline">Platform Links</button> tab.
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ TAB: SSO */}
      {activeTab === 'sso' && (
        <div className="space-y-5">
          <div className="glass-card p-4" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
            <h2 className="font-semibold flex items-center gap-2 mb-1">
              <ShieldCheck size={16} className="text-purple-400" />
              Sign-In Methods
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Choose which platforms can be used to log in to VibeHub. No password required for any of them.
            </p>
          </div>

          <div className="space-y-3">
            {connected.map(account => {
              const platform = PLATFORMS.find(p => p.id === account.platformId)!;
              const isLoginEnabled = ['github', 'huggingface', 'discord', 'x'].includes(account.platformId);
              return (
                <div
                  key={account.platformId}
                  className="glass-card p-4 flex items-center gap-4"
                  style={{ borderColor: isLoginEnabled ? `${platform.color}30` : undefined }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: platformBg(platform.color), border: `1px solid ${platform.color}30` }}
                  >
                    {platform.icon}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-sm flex items-center gap-2">
                      {platform.name}
                      {isLoginEnabled && <span className="badge badge-green text-xs">SSO Enabled</span>}
                      {!isLoginEnabled && <span className="badge badge-orange text-xs">Data Only</span>}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      @{account.username} · connected {account.connectedAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Toggle switch */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sign in</span>
                      <div
                        className="relative w-9 h-5 rounded-full cursor-pointer transition-all"
                        style={{ background: isLoginEnabled ? '#8b5cf6' : 'rgba(255,255,255,0.1)' }}
                        role="switch"
                        aria-checked={isLoginEnabled}
                      >
                        <div
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                          style={{ left: isLoginEnabled ? '18px' : '2px' }}
                        />
                      </div>
                    </div>
                    {account.verified && <ShieldCheck size={14} className="text-green-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          {connected.length === 0 && (
            <div className="glass-card p-8 text-center">
              <div className="text-4xl mb-3">🔐</div>
              <div className="font-semibold mb-2">No accounts connected</div>
              <button onClick={() => setActiveTab('accounts')} className="btn-primary mt-2">
                Connect Platforms →
              </button>
            </div>
          )}

          <div
            className="glass-card p-4 flex items-start gap-3"
            style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}
          >
            <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Privacy note:</strong> VibeHub only reads your public profile info and repository list.
              We never access private repos, read your code, or post on your behalf without explicit action.
              All OAuth tokens are encrypted at rest and rotated every 30 days.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

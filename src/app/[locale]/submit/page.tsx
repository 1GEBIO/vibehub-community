'use client';
import { useState } from 'react';
import { Upload, ChevronRight, Bot, Sparkles, Check, Zap, Plus, X, ArrowRight, Link2, Download, AlertCircle, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { MOCK_IMPORTABLE_REPOS, PLATFORMS } from '@/lib/platforms';

const STEPS = ['Project Info', 'AI Details', 'Prompt Chain', 'Preview & Submit'];

const AI_TOOLS_LIST = ['Cursor', 'GitHub Copilot', 'v0.dev', 'Claude', 'GPT-4', 'Gemini', 'Midjourney', 'Stable Diffusion', 'Replit AI', 'Tabnine'];
const CATEGORIES = ['Creative App', 'Dev Tool', 'AI Model', 'Agent', 'Template', 'Game', 'Art', 'Data', 'Utility', 'API'];
const LANGUAGES = ['TypeScript', 'Python', 'JavaScript', 'Rust', 'Go', 'Solidity', 'Swift', 'Dart'];

// Only AI-detected repos
const AI_REPOS = MOCK_IMPORTABLE_REPOS.filter(r => r.isAIDetected);

interface FormData {
  title: string;
  description: string;
  category: string;
  language: string;
  aiTools: string[];
  license: string;
  tags: string;
  prompts: string[];
  repoUrl: string;
  demoUrl: string;
}

// Simulated AI tag suggestions
const AI_TAG_SUGGESTIONS = ['llm', 'ui', 'streaming', 'react', 'production-ready', 'dark-theme', 'api', 'cli', 'glassmorphism', 'real-time'];

// Simulated AI validation messages
const AI_VALIDATION_MSGS = [
  '✅ Project appears to be AI-generated (high code pattern coherence)',
  '✅ Prompt chain detected and validated',
  '✅ AI tool signatures confirmed in code style',
  '🔍 Classified as: Creative App · Quality: High',
  '💡 AI Score estimate: 87/100',
];

export default function SubmitPage() {
  const [step, setStep] = useState(0);
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [showAiTags, setShowAiTags] = useState(false);
  const [showImport, setShowImport] = useState(true);   // platform import panel
  const [importedRepo, setImportedRepo] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    language: '',
    aiTools: [],
    license: 'MIT',
    tags: '',
    prompts: [''],
    repoUrl: '',
    demoUrl: '',
  });

  const update = (key: keyof FormData, val: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const toggleTool = (tool: string) => {
    const next = form.aiTools.includes(tool)
      ? form.aiTools.filter(t => t !== tool)
      : [...form.aiTools, tool];
    update('aiTools', next);
  };

  const addPrompt = () => {
    if (newPrompt.trim()) {
      update('prompts', [...form.prompts.filter(Boolean), newPrompt.trim()]);
      setNewPrompt('');
    }
  };

  const removePrompt = (i: number) => {
    update('prompts', form.prompts.filter((_, idx) => idx !== i));
  };

  const generateAiTags = () => {
    const suggested = AI_TAG_SUGGESTIONS.sort(() => Math.random() - 0.5).slice(0, 5);
    setAiTags(suggested);
    setShowAiTags(true);
  };

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidated(true);
    }, 2400);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const importRepo = (repoId: string) => {
    const repo = AI_REPOS.find(r => r.id === repoId);
    if (!repo) return;
    const platform = PLATFORMS.find(p => p.id === repo.platform);
    update('title', repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    update('description', repo.description);
    update('language', repo.language);
    update('repoUrl', `https://${repo.platform === 'github' ? 'github.com/alice-chen-dev' : 'huggingface.co/alice-ai'}/${repo.name}`);
    setImportedRepo(repoId);
    setShowImport(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold section-title mb-4">Vibe Submitted!</h2>
        <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: '#a78bfa' }}>{form.title || 'Your project'}</strong> is now under AI curation.
        </p>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          You&apos;ll receive AI quality score and feedback within 30 seconds. Welcome to the community!
        </p>
        <div className="glass-card p-6 mb-8 text-left space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Bot size={16} className="text-purple-400 animate-pulse" />
            AI Curator is analyzing your project...
          </h3>
          {AI_VALIDATION_MSGS.map((msg, i) => (
            <div key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{msg}</div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <a href="/explore" className="btn-primary flex items-center gap-2">
            <Zap size={15} />
            Explore Projects
          </a>
          <button onClick={() => { setSubmitted(false); setStep(0); setValidated(false); }} className="btn-secondary">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-12 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Upload size={24} className="text-purple-400" />
          <h1 className="text-3xl font-bold section-title">Submit Your Vibe</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Share your 100% AI-generated project with the community
        </p>
      </div>

      {/* ── Platform Import Banner ── */}
      {importedRepo ? (
        <div
          className="glass-card p-4 mb-6 flex items-center gap-3"
          style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)' }}
        >
          <Check size={16} className="text-green-400 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-sm text-green-400">Imported from platform</span>
            <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>
              — form pre-filled. Review and continue.
            </span>
          </div>
          <button
            onClick={() => { setImportedRepo(null); setShowImport(true); }}
            className="text-xs" style={{ color: 'var(--text-secondary)' }}
          >
            Change
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <button
            onClick={() => setShowImport(v => !v)}
            className="w-full glass-card p-4 flex items-center gap-3 text-left hover:border-purple-500/30 transition-all"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <Link2 size={15} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Import from connected platform</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Auto-fill from GitHub or Hugging Face — no re-typing needed
              </div>
            </div>
            <span className="text-xs badge badge-cyan shrink-0">{AI_REPOS.length} AI repos found</span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{showImport ? '▲' : '▼'}</span>
          </button>

          {showImport && (
            <div
              className="rounded-2xl overflow-hidden mt-1"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
            >
              <div className="space-y-2 p-3">
                {AI_REPOS.map(repo => {
                  const platform = PLATFORMS.find(p => p.id === repo.platform)!;
                  return (
                    <div
                      key={repo.id}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                        style={{ background: `${platform.color}15`, border: `1px solid ${platform.color}25` }}
                      >
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ fontFamily: 'Space Mono', color: '#c4b5fd' }}>
                            {repo.name}
                          </span>
                          <span className="badge badge-purple text-xs py-0.5">
                            🤖 {repo.aiConfidence}% AI
                          </span>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{repo.description}</p>
                        <div className="flex gap-2 text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          <span>{repo.language}</span>
                          <span className="flex items-center gap-0.5"><Star size={9} className="text-yellow-400" />{repo.stars.toLocaleString()}</span>
                          <span className="text-purple-400">{platform.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => importRepo(repo.id)}
                        className="btn-primary text-xs px-3 py-2 flex items-center gap-1 shrink-0"
                      >
                        <Download size={11} />
                        Import
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-3 border-t text-xs flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                Don&apos;t see a repo? Try refreshing or connect more platforms in the <button onClick={() => setShowImport(false)} className="text-purple-400 hover:text-purple-300 underline">Platform Links</button> tab.
                <button onClick={() => setShowImport(false)} className="text-xs hover:text-white">
                  Fill manually instead →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step indicator */}

      <div className="step-indicator mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`step-dot ${i < step ? 'completed' : i === step ? 'active' : ''}`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'completed' : ''}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="text-center flex-1" style={{ maxWidth: `${100/STEPS.length}%` }}>
            <div className="text-xs truncate" style={{ color: i === step ? '#a78bfa' : 'var(--text-secondary)' }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Step 0: Project Info */}
      {step === 0 && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Project Information</h2>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Project Title *</label>
            <input
              type="text"
              placeholder="e.g. NeuralChat UI"
              value={form.title}
              onChange={e => update('title', e.target.value)}
              className="input-field"
              id="submit-title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Short Description *</label>
            <textarea
              placeholder="One-line pitch: what does it do and why is it cool?"
              value={form.description}
              onChange={e => update('description', e.target.value)}
              className="input-field"
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Category *</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className="input-field" style={{ cursor: 'pointer' }} id="submit-category">
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Primary Language</label>
              <select value={form.language} onChange={e => update('language', e.target.value)} className="input-field" style={{ cursor: 'pointer' }} id="submit-language">
                <option value="">Select language</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Tags</label>
              <button
                type="button"
                onClick={generateAiTags}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles size={11} /> AI Suggest Tags
              </button>
            </div>
            <input
              type="text"
              placeholder="comma-separated: react, chat, streaming"
              value={form.tags}
              onChange={e => update('tags', e.target.value)}
              className="input-field"
            />
            {showAiTags && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI suggests:</span>
                {aiTags.map(t => (
                  <button
                    key={t}
                    onClick={() => update('tags', form.tags ? `${form.tags}, ${t}` : t)}
                    className="tag-pill text-xs"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Repo URL</label>
              <input type="url" placeholder="github.com/..." value={form.repoUrl} onChange={e => update('repoUrl', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Demo URL</label>
              <input type="url" placeholder="yourapp.vercel.app" value={form.demoUrl} onChange={e => update('demoUrl', e.target.value)} className="input-field" />
            </div>
          </div>
        </div>
      )}

      {/* Step 1: AI Details */}
      {step === 1 && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Bot size={18} className="text-purple-400" /> AI Tool Details
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Select every AI tool you used. This helps our curator score your workflow.
          </p>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>AI Tools Used *</label>
            <div className="flex flex-wrap gap-2">
              {AI_TOOLS_LIST.map(tool => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`tag-pill ${form.aiTools.includes(tool) ? 'active' : ''} flex items-center gap-1`}
                >
                  {form.aiTools.includes(tool) && <Check size={10} />}
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>License</label>
            <select value={form.license} onChange={e => update('license', e.target.value)} className="input-field" style={{ cursor: 'pointer', width: 'auto' }}>
              {['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause', 'CC0'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="glass-card p-4" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)' }}>
            <div className="flex items-start gap-2">
              <Bot size={16} className="text-purple-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm mb-1">AI-Generated Pledge</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  By submitting, you confirm this project was created using AI tools with minimal or no manual code authoring.
                  VibeHub is exclusively for prompt-to-code and AI-assisted generation workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Prompt Chain */}
      {step === 2 && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" /> Prompt Chain
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Share the prompts you used to generate this project. This is the most valuable part &mdash; it&apos;s what makes VibeHub unique!
          </p>

          <div className="space-y-3">
            {form.prompts.filter(Boolean).map((p, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
                  {i + 1}
                </div>
                <div className="prompt-node flex-1">{p}</div>
                <button onClick={() => removePrompt(i)} className="mt-1 shrink-0">
                  <X size={14} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <textarea
              value={newPrompt}
              onChange={e => setNewPrompt(e.target.value)}
              placeholder="Paste a prompt you used (e.g. 'Create a dark-themed chat UI with streaming support...')"
              className="input-field flex-1 text-sm"
              rows={3}
              onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) addPrompt(); }}
              style={{ resize: 'vertical' }}
            />
          </div>
          <button onClick={addPrompt} className="btn-ghost flex items-center gap-1.5 text-sm">
            <Plus size={14} />
            Add Prompt (⌘+Enter)
          </button>
        </div>
      )}

      {/* Step 3: Preview & Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg mb-4">Project Preview</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Title', value: form.title || '—' },
                { label: 'Category', value: form.category || '—' },
                { label: 'Language', value: form.language || '—' },
                { label: 'AI Tools', value: form.aiTools.join(', ') || '—' },
                { label: 'Prompts', value: `${form.prompts.filter(Boolean).length} prompt(s)` },
                { label: 'Tags', value: form.tags || '—' },
              ].map(r => (
                <div key={r.label} className="flex gap-4">
                  <span className="w-24 shrink-0" style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Validation */}
          <div className="glass-card p-6" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Bot size={16} className="text-green-400" />
              AI Validation
            </h2>

            {!validated && !validating && (
              <div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Run our AI check to verify this project meets VibeHub&apos;s standards.
                </p>
                <button onClick={handleValidate} className="btn-primary flex items-center gap-2">
                  <Sparkles size={15} />
                  Run AI Validation
                </button>
              </div>
            )}

            {validating && (
              <div className="flex items-center gap-3">
                <div className="spinner" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI is analyzing your project...</span>
              </div>
            )}

            {validated && (
              <div className="space-y-2">
                {AI_VALIDATION_MSGS.map((msg, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm" style={{ color: i < 3 ? '#34d399' : 'var(--text-secondary)' }}>
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!validated}
            className={`w-full btn-primary text-base py-4 flex items-center justify-center gap-2 ${!validated ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <Upload size={18} />
            Submit to VibeHub
            <ArrowRight size={16} />
          </button>
          {!validated && (
            <p className="text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
              Complete AI validation before submitting
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`btn-secondary ${step === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          ← Back
        </button>
        {step < STEPS.length - 1 && (
          <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} className="btn-primary flex items-center gap-2">
            Next <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

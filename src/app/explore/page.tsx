'use client';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Zap, Grid3X3, List } from 'lucide-react';
import { PROJECTS, CATEGORIES, Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

const SORT_OPTIONS = [
  { value: 'trending', label: '🔥 Trending' },
  { value: 'stars', label: '⭐ Most Starred' },
  { value: 'ai_score', label: '🤖 AI Score' },
  { value: 'newest', label: '🆕 Newest' },
  { value: 'downloads', label: '📥 Downloads' },
];

const AI_TOOLS = ['Cursor', 'GitHub Copilot', 'v0.dev', 'Claude', 'GPT-4', 'Gemini', 'Stable Diffusion', 'Replit AI'];
const LANGUAGES = ['TypeScript', 'Python', 'JavaScript', 'Rust', 'Go', 'Solidity'];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [sort, setSort] = useState('trending');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let results = [...PROJECTS];
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.author.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) results = results.filter(p => p.category === selectedCategory);
    if (selectedTool) results = results.filter(p => p.aiTools.some(t => t === selectedTool));
    if (selectedLang) results = results.filter(p => p.language === selectedLang);

    switch (sort) {
      case 'stars': results.sort((a, b) => b.stars - a.stars); break;
      case 'ai_score': results.sort((a, b) => b.aiScore - a.aiScore); break;
      case 'newest': results.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
      case 'downloads': results.sort((a, b) => b.downloads - a.downloads); break;
      default: results.sort((a, b) => (b.stars * 0.6 + b.views * 0.001 + b.aiScore * 10) - (a.stars * 0.6 + a.views * 0.001 + a.aiScore * 10));
    }
    return results;
  }, [search, selectedCategory, selectedTool, selectedLang, sort]);

  const activeFilters = [selectedCategory, selectedTool, selectedLang].filter(Boolean).length;

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-40 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold section-title mb-2">Explore Projects</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {PROJECTS.length}+ AI-generated projects and counting
        </p>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, tag, author, or tool..."
            className="input-field pl-11"
            id="explore-search"
          />
          {search && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearch('')}>
              <X size={14} style={{ color: 'var(--text-secondary)' }} />
            </button>
          )}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input-field"
          style={{ width: 'auto', minWidth: '160px', cursor: 'pointer' }}
          id="explore-sort"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="btn-ghost flex items-center gap-2"
          id="explore-filter-btn"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilters > 0 && (
            <span
              className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ background: 'var(--accent-purple)', color: 'white' }}
            >
              {activeFilters}
            </span>
          )}
        </button>

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setView('grid')}
            className={`p-2.5 ${view === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:bg-white/5'} transition-colors`}
          >
            <Grid3X3 size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2.5 ${view === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:bg-white/5'} transition-colors`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Expanded filters */}
      {filtersOpen && (
        <div className="glass-card p-5 mb-6 space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>FILTER BY</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Category</p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
                    className={`tag-pill ${selectedCategory === cat.name ? 'active' : ''}`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>AI Tool</p>
              <div className="flex flex-wrap gap-1.5">
                {AI_TOOLS.map(tool => (
                  <button
                    key={tool}
                    onClick={() => setSelectedTool(selectedTool === tool ? '' : tool)}
                    className={`tag-pill ${selectedTool === tool ? 'active' : ''}`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Language</p>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(selectedLang === lang ? '' : lang)}
                    className={`tag-pill ${selectedLang === lang ? 'active' : ''}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {activeFilters > 0 && (
            <button
              onClick={() => { setSelectedCategory(''); setSelectedTool(''); setSelectedLang(''); }}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <X size={12} /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Category pills shortcut */}
      <div className="cat-scroll mb-6">
        <button
          onClick={() => setSelectedCategory('')}
          className={`tag-pill shrink-0 ${!selectedCategory ? 'active' : ''}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            className={`tag-pill shrink-0 ${selectedCategory === cat.name ? 'active' : ''}`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
        <Zap size={13} className="text-purple-400" />
        <span>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</span>
        {activeFilters > 0 && <span className="badge badge-purple">{activeFilters} filter{activeFilters > 1 ? 's' : ''} active</span>}
      </div>

      {/* Project grid */}
      {filtered.length > 0 ? (
        <div className={view === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'flex flex-col gap-3'
        }>
          {filtered.map(p => (
            <div key={p.id} className={view === 'list' ? 'w-full' : ''}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try different keywords or clear your filters</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedTool(''); setSelectedLang(''); }}
            className="btn-primary mt-4"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}

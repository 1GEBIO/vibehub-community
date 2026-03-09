import { Link } from '@/i18n/routing';
import { Star, GitFork, Eye, Zap, Bot, Users } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  rank?: number;
}

const CATEGORY_BADGE_MAP: Record<string, string> = {
  'Creative App': 'badge-pink',
  'Dev Tool': 'badge-cyan',
  'AI Model': 'badge-purple',
  'Agent': 'badge-green',
  'Template': 'badge-orange',
  'Game': 'badge-cyan',
  'Art': 'badge-pink',
  'Data': 'badge-orange',
  'Utility': 'badge-green',
  'API': 'badge-purple',
};

const TOOL_COLORS: Record<string, string> = {
  'Cursor': '#8b5cf6',
  'GitHub Copilot': '#10b981',
  'v0.dev': '#06b6d4',
  'Claude': '#f59e0b',
  'GPT-4': '#10b981',
  'Gemini': '#3b82f6',
  'Midjourney': '#ec4899',
  'Stable Diffusion': '#f97316',
  'Replit AI': '#8b5cf6',
  'Tabnine': '#06b6d4',
};

export default function ProjectCard({ project, rank }: ProjectCardProps) {
  const badgeClass = CATEGORY_BADGE_MAP[project.category] || 'badge-purple';
  const scorePercent = project.aiScore;
  const conicColor = `conic-gradient(#8b5cf6 ${scorePercent}%, rgba(255,255,255,0.04) ${scorePercent}%)`;

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="glass-card overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Color preview strip */}
        <div className={`bg-gradient-to-br ${project.previewColor} relative`} style={{ height: '120px' }}>
          {/* Rank badge */}
          {rank && (
            <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm rank-${rank}`}
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
              {rank}
            </div>
          )}

          {/* Hot badge */}
          {project.isHot && (
            <div className="absolute top-3 right-3 badge badge-red ai-badge">
              🔥 Hot
            </div>
          )}

          {/* AI Score ring */}
          <div className="absolute bottom-3 right-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: conicColor }}
            >
              <div
                className="absolute w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(10,10,30,0.9)' }}
              >
                <span className="text-xs font-bold" style={{ color: '#a78bfa', fontFamily: 'Space Mono' }}>
                  {project.aiScore}
                </span>
              </div>
            </div>
          </div>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.6\'/%3E%3C/svg%3E")' }}>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                by <span className="text-purple-400">{project.author}</span>
              </p>
            </div>
            <span className={`badge ${badgeClass} shrink-0`}>{project.category}</span>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* AI Tools used */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Bot size={10} style={{ color: 'var(--text-secondary)' }} />
            {project.aiTools.map(tool => (
              <span
                key={tool}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: `${TOOL_COLORS[tool] || '#8b5cf6'}15`,
                  color: TOOL_COLORS[tool] || '#a78bfa',
                  border: `1px solid ${TOOL_COLORS[tool] || '#8b5cf6'}30`,
                  fontSize: '10px',
                  fontFamily: 'Space Mono',
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag-pill"># {tag}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-auto pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <Star size={11} className="text-yellow-400" />
              {project.stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <GitFork size={11} style={{ color: '#06b6d4' }} />
              {project.forks.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <Eye size={11} />
              {project.views.toLocaleString()}
            </span>
            {project.collaborators.length > 0 && (
              <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>
                <Users size={11} style={{ color: '#10b981' }} />
                {project.collaborators.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

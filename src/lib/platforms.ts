// ── Platform Connection Types ─────────────────────────────────────────────────

export type PlatformId =
  | 'github'
  | 'huggingface'
  | 'gitlab'
  | 'npm'
  | 'replit'
  | 'vercel'
  | 'devto'
  | 'producthunt'
  | 'discord'
  | 'x';

export interface Platform {
  id: PlatformId;
  name: string;
  description: string;
  icon: string;           // emoji or svg path key
  color: string;          // brand hex
  gradient: string;
  category: 'dev' | 'social' | 'deploy' | 'ai';
  features: string[];     // what linking unlocks
  authUrl: string;        // simulated OAuth URL
  docsUrl: string;
}

export interface ConnectedAccount {
  platformId: PlatformId;
  username: string;
  displayName: string;
  avatar?: string;
  connectedAt: string;
  publicRepos?: number;
  followers?: number;
  models?: number;         // HF models count
  spaces?: number;         // HF spaces
  packages?: number;       // npm packages
  deployments?: number;    // Vercel deployments
  posts?: number;          // dev.to posts
  verified: boolean;
  primaryForImport: boolean; // used as default source for project imports
}

// ── Platform Registry ─────────────────────────────────────────────────────────

export const PLATFORMS: Platform[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Import repos, sync stars, show contribution graph. Auto-detect AI-generated repos.',
    icon: '🐙',
    color: '#f0f6fc',
    gradient: 'from-gray-700 to-gray-900',
    category: 'dev',
    features: [
      'One-click repo import to VibeHub',
      'Auto-sync star count from GitHub',
      'Show GitHub contribution heatmap on profile',
      'Detect Copilot/Cursor usage from git history',
    ],
    authUrl: 'https://github.com/login/oauth/authorize',
    docsUrl: 'https://docs.github.com/en/developers/apps/building-oauth-apps',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Link HF models and Spaces. Import model cards as VibeHub projects automatically.',
    icon: '🤗',
    color: '#ff9d00',
    gradient: 'from-yellow-500 to-orange-600',
    category: 'ai',
    features: [
      'Import HF models & Spaces as projects',
      'Show model download counts on profile',
      'Sync HF follower badges',
      'Display model cards in project detail',
    ],
    authUrl: 'https://huggingface.co/oauth/authorize',
    docsUrl: 'https://huggingface.co/docs/hub/oauth',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Mirror your GitLab repositories and CI/CD pipeline metadata on VibeHub.',
    icon: '🦊',
    color: '#fc6d26',
    gradient: 'from-orange-500 to-red-600',
    category: 'dev',
    features: [
      'Import GitLab projects & snippets',
      'Display CI/CD badge on project cards',
      'Sync MR/issue stats to profile',
      'Self-hosted instance support',
    ],
    authUrl: 'https://gitlab.com/oauth/authorize',
    docsUrl: 'https://docs.gitlab.com/ee/api/oauth2.html',
  },
  {
    id: 'npm',
    name: 'npm',
    description: 'Showcase your published packages. Auto-link npm packages to VibeHub projects.',
    icon: '📦',
    color: '#cb3837',
    gradient: 'from-red-600 to-red-800',
    category: 'dev',
    features: [
      'Show weekly download count on cards',
      'Link packages to source VibeHub project',
      'Verified publisher badge on profile',
      'Auto-update version changelog',
    ],
    authUrl: 'https://www.npmjs.com/login',
    docsUrl: 'https://docs.npmjs.com/cli/v10/commands/npm-login',
  },
  {
    id: 'replit',
    name: 'Replit',
    description: 'One-click run any VibeHub project in a Replit workspace. Import Repls directly.',
    icon: '🔄',
    color: '#f26207',
    gradient: 'from-orange-500 to-yellow-500',
    category: 'dev',
    features: [
      'Run sandbox powered by Replit',
      'Import existing Repls as VibeHub projects',
      'Show real-time fork count from Replit',
      '"Open in Replit" button on every project',
    ],
    authUrl: 'https://replit.com/auth/oauth',
    docsUrl: 'https://docs.replit.com/hosting/deployments/oauth2',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy VibeHub projects to Vercel in one click. Show live deployment status.',
    icon: '▲',
    color: '#ffffff',
    gradient: 'from-slate-700 to-slate-900',
    category: 'deploy',
    features: [
      '"Deploy to Vercel" button on project page',
      'Live deployment status indicators',
      'Preview URL auto-linked to project',
      'Bandwidth & function usage stats',
    ],
    authUrl: 'https://vercel.com/oauth/authorize',
    docsUrl: 'https://vercel.com/docs/integrations/creating-an-integration/oauth2',
  },
  {
    id: 'devto',
    name: 'DEV.to',
    description: 'Cross-post project write-ups to DEV.to. Import your DEV posts as project descriptions.',
    icon: '📝',
    color: '#3b49df',
    gradient: 'from-indigo-500 to-blue-600',
    category: 'social',
    features: [
      'One-click cross-post to DEV.to',
      'Import DEV articles as project README',
      'Show DEV reaction count on profile',
      'Auto-tag with matching DEV tags',
    ],
    authUrl: 'https://dev.to/oauth/authorize',
    docsUrl: 'https://developers.forem.com/api',
  },
  {
    id: 'producthunt',
    name: 'Product Hunt',
    description: 'Link your Product Hunt launches. Show upvote count and featured badges.',
    icon: '🚀',
    color: '#da552f',
    gradient: 'from-orange-600 to-red-500',
    category: 'social',
    features: [
      'Show PH upvote count on project cards',
      '"Product of the Day" badge display',
      'Auto-share launches to VibeHub feed',
      'Link PH maker profile to VibeHub profile',
    ],
    authUrl: 'https://api.producthunt.com/v2/oauth/authorize',
    docsUrl: 'https://api.producthunt.com/v2/docs',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Link your Discord for community features. Verify membership in builder servers.',
    icon: '💬',
    color: '#5865f2',
    gradient: 'from-indigo-500 to-violet-600',
    category: 'social',
    features: [
      'Discord role verification badge on profile',
      'Join VibeHub Discord with one click',
      'Show mutual builder server memberships',
      'Real-time collab notifications via webhook',
    ],
    authUrl: 'https://discord.com/oauth2/authorize',
    docsUrl: 'https://discord.com/developers/docs/topics/oauth2',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    description: 'Auto-tweet project launches. Import your X bio and follower count to profile.',
    icon: '✕',
    color: '#e7e9ea',
    gradient: 'from-gray-800 to-black',
    category: 'social',
    features: [
      'One-click tweet for new project submission',
      'Show X follower count on profile',
      'Import X bio to VibeHub bio',
      'Auto-thread for project updates',
    ],
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    docsUrl: 'https://developer.twitter.com/en/docs/authentication/oauth-2-0',
  },
];

// ── Mock connected accounts for vibe_alice ────────────────────────────────────

export const MOCK_CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    platformId: 'github',
    username: 'alice-chen-dev',
    displayName: 'Alice Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gh-alice&backgroundColor=b6e3f4',
    connectedAt: '2025-11-02',
    publicRepos: 48,
    followers: 1240,
    verified: true,
    primaryForImport: true,
  },
  {
    platformId: 'huggingface',
    username: 'alice-ai',
    displayName: 'Alice Chen',
    connectedAt: '2025-12-15',
    models: 7,
    spaces: 12,
    followers: 890,
    verified: true,
    primaryForImport: false,
  },
  {
    platformId: 'vercel',
    username: 'alice-chen',
    displayName: 'Alice Chen',
    connectedAt: '2026-01-08',
    deployments: 34,
    verified: true,
    primaryForImport: false,
  },
  {
    platformId: 'discord',
    username: 'alice.vibe',
    displayName: 'Alice • Vibe Coder',
    connectedAt: '2026-01-20',
    verified: true,
    primaryForImport: false,
  },
];

// ── Simulated importable repos from GitHub ────────────────────────────────────

export interface ImportableRepo {
  id: string;
  platform: PlatformId;
  name: string;
  description: string;
  language: string;
  stars: number;
  isAIDetected: boolean;  // AI detects if it looks AI-generated
  aiConfidence: number;   // 0-100
  visibility: 'public' | 'private';
  updatedAt: string;
}

export const MOCK_IMPORTABLE_REPOS: ImportableRepo[] = [
  {
    id: 'r1',
    platform: 'github',
    name: 'neural-chat-ui',
    description: 'AI chat interface built with v0.dev — glassmorphism dark theme',
    language: 'TypeScript',
    stars: 4821,
    isAIDetected: true,
    aiConfidence: 97,
    visibility: 'public',
    updatedAt: '2026-03-01',
  },
  {
    id: 'r2',
    platform: 'github',
    name: 'moodsync-journal',
    description: 'Emotion-adaptive journaling PWA — Replit AI generated',
    language: 'JavaScript',
    stars: 2680,
    isAIDetected: true,
    aiConfidence: 94,
    visibility: 'public',
    updatedAt: '2026-03-04',
  },
  {
    id: 'r3',
    platform: 'github',
    name: 'data-pipeline-utils',
    description: 'Internal data processing utilities',
    language: 'Python',
    stars: 12,
    isAIDetected: false,
    aiConfidence: 31,
    visibility: 'public',
    updatedAt: '2026-02-10',
  },
  {
    id: 'r4',
    platform: 'github',
    name: 'vibehub-prompt-templates',
    description: 'Collection of prompt templates used to generate my projects',
    language: 'Markdown',
    stars: 340,
    isAIDetected: true,
    aiConfidence: 88,
    visibility: 'public',
    updatedAt: '2026-03-07',
  },
  {
    id: 'r5',
    platform: 'huggingface',
    name: 'alice-ai/sentiment-detector',
    description: 'Fine-tuned BERT for real-time sentiment analysis — used in MoodSync',
    language: 'Python',
    stars: 890,
    isAIDetected: true,
    aiConfidence: 91,
    visibility: 'public',
    updatedAt: '2026-03-02',
  },
  {
    id: 'r6',
    platform: 'huggingface',
    name: 'alice-ai/style-transfer-space',
    description: 'Gradio space for neural style transfer — zero-shot from GPT-4 spec',
    language: 'Python',
    stars: 1240,
    isAIDetected: true,
    aiConfidence: 96,
    visibility: 'public',
    updatedAt: '2026-02-28',
  },
];

export const PLATFORM_CATEGORY_LABELS: Record<Platform['category'], string> = {
  dev: '🔧 Developer Tools',
  ai: '🤖 AI Platforms',
  deploy: '🚀 Deployment',
  social: '💬 Social',
};

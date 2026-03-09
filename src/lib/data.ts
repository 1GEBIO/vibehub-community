// Mock data for the AI Vibe Community Platform

export type AITool = 'Cursor' | 'GitHub Copilot' | 'v0.dev' | 'Claude' | 'GPT-4' | 'Gemini' | 'Midjourney' | 'Stable Diffusion' | 'Replit AI' | 'Tabnine';
export type Category = 'Creative App' | 'Dev Tool' | 'AI Model' | 'Game' | 'Template' | 'API' | 'Agent' | 'Art' | 'Data' | 'Utility';
export type Language = 'TypeScript' | 'Python' | 'JavaScript' | 'Rust' | 'Go' | 'Solidity' | 'Swift' | 'Dart';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  author: string;
  authorAvatar: string;
  category: Category;
  aiTools: AITool[];
  language: Language;
  stars: number;
  forks: number;
  views: number;
  downloads: number;
  aiScore: number; // 0-100
  tags: string[];
  previewImage: string;
  previewColor: string;
  promptChain: string[];
  aiFeedback: string[];
  aiCurationBadge: string;
  aiCurationNote: string;
  createdAt: string;
  updatedAt: string;
  isHot: boolean;
  isFeatured: boolean;
  license: string;
  collaborators: string[];
  price?: number; // if in marketplace
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  projects: number;
  totalStars: number;
  aiScore: number;
  badges: Badge[];
  joinedAt: string;
  followers: number;
  following: number;
  tools: AITool[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface MarketItem {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  sales: number;
  previewColor: string;
  tags: string[];
  includes: string[];
  featured: boolean;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=alice&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=bob&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=carol&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=dave&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=eve&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=frank&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=grace&backgroundColor=b6e3f4',
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'NeuralChat UI',
    description: 'A stunning AI chat interface generated entirely by v0.dev with Claude refinements. Zero manual code.',
    longDescription: 'NeuralChat UI is a production-ready chat interface built from a single detailed prompt. The entire codebase—components, animations, and API integration—was generated autonomously by v0.dev with subsequent refinements from Claude. Features real-time streaming, multi-model support, and a glassmorphism design.',
    author: 'vibe_alice',
    authorAvatar: AVATARS[0],
    category: 'Creative App',
    aiTools: ['v0.dev', 'Claude'],
    language: 'TypeScript',
    stars: 4821,
    forks: 382,
    views: 28430,
    downloads: 1920,
    aiScore: 96,
    tags: ['chat', 'ui', 'streaming', 'llm', 'react'],
    previewImage: '',
    previewColor: 'from-violet-600 to-pink-600',
    promptChain: [
      'Create a futuristic AI chat interface with glassmorphism design, dark theme, and support for multiple LLM models',
      'Add real-time streaming message rendering with animated typing indicator and markdown support',
      'Integrate message history sidebar with search, pinning, and export to JSON functionality',
      'Polish animations: fade-in messages, smooth scroll, hover states on all interactive elements',
    ],
    aiFeedback: [
      '✨ Consider adding keyboard shortcuts (Cmd+K for model switch, Cmd+L for clear) to boost power-user UX.',
      '⚡ The message list re-renders on every token—memoize MessageBubble for 40%+ perf boost.',
      '🎨 Add a "dark/vibrant" theme toggle; your glassmorphism palette would pop in both modes.',
      '🔒 Token counting before send would prevent silent truncation on long conversations.',
    ],
    aiCurationBadge: 'Creative App',
    aiCurationNote: 'High design quality, strong UI/UX patterns, production-ready structure',
    createdAt: '2026-02-14',
    updatedAt: '2026-03-01',
    isHot: true,
    isFeatured: true,
    license: 'MIT',
    collaborators: ['vibe_bob', 'vibe_carol'],
    price: undefined,
  },
  {
    id: '2',
    title: 'PromptForge CLI',
    description: 'A Rust-based CLI tool for managing, versioning, and testing prompt chains. 100% Cursor-generated.',
    longDescription: 'PromptForge CLI is a developer tool that treats prompts as first-class code artifacts. Version them with Git, A/B test variants, and pipe outputs between models. Built entirely with Cursor in Rust for blazing fast performance.',
    author: 'vibe_bob',
    authorAvatar: AVATARS[1],
    category: 'Dev Tool',
    aiTools: ['Cursor', 'GPT-4'],
    language: 'Rust',
    stars: 3150,
    forks: 245,
    views: 19200,
    downloads: 3400,
    aiScore: 91,
    tags: ['cli', 'rust', 'prompts', 'versioning', 'devtool'],
    previewImage: '',
    previewColor: 'from-orange-500 to-red-600',
    promptChain: [
      'Build a Rust CLI with clap for managing prompt templates with TOML config files',
      'Add Git-like versioning: prompt commit, diff, branch, and merge for prompt evolution tracking',
      'Implement parallel model testing: run same prompt on GPT-4, Claude, Gemini simultaneously',
      'Add a beautiful TUI dashboard using ratatui to visualize prompt performance metrics',
    ],
    aiFeedback: [
      '🦀 The TOML parser could use serde_valid for schema validation—prevents malformed prompt configs.',
      '📊 Add a JSONL export format for your benchmark results; works directly with eval frameworks.',
      '🔄 Prompt branching is great! Consider adding automatic deduplication via embedding similarity.',
      '⚡ Parallel model calls should use tokio::join! instead of sequential await for true concurrency.',
    ],
    aiCurationBadge: 'Dev Tool',
    aiCurationNote: 'Solid architecture, potential for wide developer adoption, excellent CLI UX',
    createdAt: '2026-01-20',
    updatedAt: '2026-02-28',
    isHot: true,
    isFeatured: true,
    license: 'Apache-2.0',
    collaborators: ['vibe_dave'],
    price: undefined,
  },
  {
    id: '3',
    title: 'DreamCanvas',
    description: 'Browser-based infinite canvas for AI-generated art. Generate, arrange, and combine images live.',
    longDescription: 'DreamCanvas turns your browser into an infinite creative workspace. Describe anything, generate instantly via Stable Diffusion, and arrange pieces into compositions—all without leaving the canvas. The entire app was built from prompts using Claude and v0.',
    author: 'vibe_carol',
    authorAvatar: AVATARS[2],
    category: 'Art',
    aiTools: ['Claude', 'Stable Diffusion', 'v0.dev'],
    language: 'TypeScript',
    stars: 5920,
    forks: 710,
    views: 45000,
    downloads: 2800,
    aiScore: 98,
    tags: ['art', 'canvas', 'generative', 'stable-diffusion', 'creative'],
    previewImage: '',
    previewColor: 'from-pink-500 to-purple-600',
    promptChain: [
      'Create an infinite canvas web app with pan/zoom using CSS transforms, React, and Zustand state',
      'Add floating prompt input nodes that trigger Stable Diffusion image generation in-place',
      'Implement drag-and-drop image arrangement with snap-to-grid and alignment guides',
      'Add layer system with blend modes, opacity sliders, and non-destructive filter effects',
    ],
    aiFeedback: [
      '🎨 Add "style inheritance": child nodes can inherit parent prompt styles for coherent compositions.',
      '💾 IndexedDB persistence would let users resume sessions—canvas state is currently lost on refresh.',
      '🖼️ Consider WebGL rendering via PixiJS for handling 100+ image nodes without canvas lag.',
      '🤝 Real-time collaboration via CRDTs (Yjs) would make this the Figma of AI art.',
    ],
    aiCurationBadge: 'Creative App',
    aiCurationNote: 'Highest creativity score in category; viral potential; production-grade UX',
    createdAt: '2026-02-01',
    updatedAt: '2026-03-05',
    isHot: true,
    isFeatured: true,
    license: 'MIT',
    collaborators: ['vibe_alice', 'vibe_eve'],
    price: undefined,
  },
  {
    id: '4',
    title: 'AgentOS',
    description: 'A Python framework for orchestrating multi-agent AI workflows. Auto-generated architecture by GPT-4.',
    longDescription: 'AgentOS is a lightweight Python framework for building supervisor-worker agent systems. Chain agents with typed contracts, auto-retry on failure, and built-in observability. The entire design pattern was emergent from GPT-4 after describing the problem space.',
    author: 'vibe_dave',
    authorAvatar: AVATARS[3],
    category: 'Agent',
    aiTools: ['GPT-4', 'GitHub Copilot'],
    language: 'Python',
    stars: 2890,
    forks: 430,
    views: 22000,
    downloads: 5100,
    aiScore: 89,
    tags: ['agents', 'python', 'orchestration', 'llm', 'framework'],
    previewImage: '',
    previewColor: 'from-green-500 to-teal-600',
    promptChain: [
      'Design a Python framework where AI agents communicate via typed message passing with Pydantic schemas',
      'Implement a supervisor agent that spawns and manages worker agents with automatic load balancing',
      'Add built-in retry logic with exponential backoff and fallback model selection on rate limits',
      'Create a web dashboard for real-time agent monitoring using FastAPI + WebSocket + React',
    ],
    aiFeedback: [
      '🔧 Add agent "personas" – system prompt templates that agents inherit, reducing boilerplate.',
      '📡 The message bus could support Redis pub/sub for distributed multi-machine agent networks.',
      '🧪 Generate synthetic test tasks from the task schema—you already have the types, use them.',
      '📊 Expose OpenTelemetry traces natively; your observability hooks are halfway there already.',
    ],
    aiCurationBadge: 'Agent',
    aiCurationNote: 'Strong technical depth; fills real gap in agent tooling ecosystem',
    createdAt: '2026-01-05',
    updatedAt: '2026-02-20',
    isHot: false,
    isFeatured: true,
    license: 'MIT',
    collaborators: ['vibe_frank'],
    price: undefined,
  },
  {
    id: '5',
    title: 'VibePong',
    description: 'Neon pong game with AI opponents of varying personalities. Built from scratch by Cursor in 1 hour.',
    longDescription: 'VibePong reinvents the classic with four distinct AI personalities (Aggressive, Defensive, Chaotic, Zen) and neon visual effects. The game logic, rendering engine, and AI behaviors were all generated by Cursor AI across a single session.',
    author: 'vibe_eve',
    authorAvatar: AVATARS[4],
    category: 'Game',
    aiTools: ['Cursor'],
    language: 'TypeScript',
    stars: 1840,
    forks: 290,
    views: 31000,
    downloads: 8900,
    aiScore: 85,
    tags: ['game', 'canvas', 'ai-opponent', 'neon', 'fun'],
    previewImage: '',
    previewColor: 'from-cyan-500 to-blue-600',
    promptChain: [
      'Create a neon-themed Pong game using Canvas API with glowing ball trail effects and particle explosions',
      'Implement 4 distinct AI personalities: Aggressive (fast), Defensive (predictive), Chaotic (random), Zen (slow but perfect)',
      'Add power-ups: slow-ball, wide-paddle, ghost-ball that passes through walls once',
      'Create a tournament mode with bracket system and AI commentator messages between rounds',
    ],
    aiFeedback: [
      '🎮 Add gamepad API support—this is literally made for controller input.',
      '🌐 WebRTC peer-to-peer would enable real-time 2-player multiplayer without a server.',
      '🎵 Generate procedural chiptune music that reacts to game state (tempo increases near end).',
      '📱 The canvas scaling breaks on mobile; use devicePixelRatio for crisp rendering.',
    ],
    aiCurationBadge: 'Game',
    aiCurationNote: 'Exceptional fun factor; creative AI personality system; viral shareability',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-25',
    isHot: false,
    isFeatured: false,
    license: 'MIT',
    collaborators: [],
    price: undefined,
  },
  {
    id: '6',
    title: 'DataVibe',
    description: 'Drop any CSV, get beautiful interactive charts instantly. AI picks the best visualization for your data.',
    longDescription: 'DataVibe uses an LLM to analyze your data structure and automatically suggest the most insightful visualizations. The entire app was generated by Claude with Gemini handling the data analysis logic.',
    author: 'vibe_frank',
    authorAvatar: AVATARS[5],
    category: 'Data',
    aiTools: ['Claude', 'Gemini'],
    language: 'Python',
    stars: 2200,
    forks: 180,
    views: 17500,
    downloads: 4200,
    aiScore: 88,
    tags: ['data', 'visualization', 'csv', 'charts', 'analysis'],
    previewImage: '',
    previewColor: 'from-yellow-500 to-orange-600',
    promptChain: [
      'Build a Streamlit app that accepts CSV uploads and auto-detects column types (numeric, categorical, temporal)',
      'Use GPT-4 to analyze column relationships and suggest the top 3 most insightful chart types',
      'Render interactive Plotly charts with custom color themes and exportable SVG/PNG options',
      'Add natural language query: "Show me correlation between age and salary" generates chart automatically',
    ],
    aiFeedback: [
      '📊 Cache LLM analysis results by data fingerprint—repeated uploads of same CSV waste tokens.',
      '🤖 Add anomaly detection: highlight outliers automatically with LLM-generated explanations.',
      '📤 Shareable URL with encoded data would enable viral "look at this trend I found" moment.',
      '⚡ Pyarrow for CSV parsing is 10x faster than pandas for large files.',
    ],
    aiCurationBadge: 'Utility',
    aiCurationNote: 'High practical utility; excellent AI-human synergy in design; broad appeal',
    createdAt: '2026-01-28',
    updatedAt: '2026-03-02',
    isHot: true,
    isFeatured: false,
    license: 'GPL-3.0',
    collaborators: ['vibe_alice'],
    price: undefined,
  },
  {
    id: '7',
    title: 'SmartContract Forge',
    description: 'Describe your DeFi protocol in plain English, get audited Solidity. Powered by GPT-4 + static analysis.',
    longDescription: 'SmartContract Forge bridges the gap between DeFi ideas and production-ready code. Describe your protocol semantics, and the AI generates gas-optimized Solidity with built-in security patterns. Includes AI-powered audit simulation.',
    author: 'vibe_grace',
    authorAvatar: AVATARS[6],
    category: 'Dev Tool',
    aiTools: ['GPT-4', 'Claude'],
    language: 'Solidity',
    stars: 3400,
    forks: 520,
    views: 25000,
    downloads: 1800,
    aiScore: 93,
    tags: ['defi', 'solidity', 'smart-contracts', 'web3', 'audit'],
    previewImage: '',
    previewColor: 'from-indigo-500 to-violet-600',
    promptChain: [
      'Parse natural language DeFi protocol descriptions into structured specs (token mechanics, governance, fees)',
      'Generate gas-optimized Solidity implementing the spec with OpenZeppelin building blocks',
      'Run static analysis via Slither patterns (reentrancy, integer overflow, access control) and flag issues',
      'Generate comprehensive test suite in Hardhat with edge cases derived from the protocol specification',
    ],
    aiFeedback: [
      '🔒 Add formal verification hints via Certora patterns—show users which invariants to verify.',
      '⛽ Gas profiling comparison (before/after optimization) would be extremely valuable for users.',
      '🧪 Fuzz testing integration via Foundry would dramatically increase test coverage quality.',
      '📚 Auto-generate NatSpec documentation from the protocol description—it\'s already structured.',
    ],
    aiCurationBadge: 'Dev Tool',
    aiCurationNote: 'Addresses critical Web3 dev pain point; high technical quality; strong ecosystem fit',
    createdAt: '2026-02-18',
    updatedAt: '2026-03-06',
    isHot: true,
    isFeatured: false,
    license: 'MIT',
    collaborators: ['vibe_dave', 'vibe_bob'],
    price: undefined,
  },
  {
    id: '8',
    title: 'MoodSync',
    description: 'A mobile-first journaling app that adapts its UI mood, color palette, and prompts based on your writing tone.',
    longDescription: 'MoodSync detects emotional tone in real-time as you type and shifts the entire visual environment to match—calming blues for sadness, energetic oranges for excitement. Built by Replit AI in a single session.',
    author: 'vibe_alice',
    authorAvatar: AVATARS[0],
    category: 'Creative App',
    aiTools: ['Replit AI', 'Claude'],
    language: 'JavaScript',
    stars: 2680,
    forks: 195,
    views: 19800,
    downloads: 6700,
    aiScore: 90,
    tags: ['journal', 'sentiment', 'ux', 'mobile', 'wellbeing'],
    previewImage: '',
    previewColor: 'from-rose-500 to-pink-600',
    promptChain: [
      'Build a journaling PWA where text input triggers real-time sentiment analysis using BERT',
      'Dynamically shift CSS variables (hue, saturation) based on detected emotion categories',
      'Generate contextual writing prompts that gently guide toward reflection based on detected mood',
      'Add weekly mood timeline visualization with AI-written insights about emotional patterns',
    ],
    aiFeedback: [
      '🧠 Use a local ONNX model for sentiment—avoids API round-trips, works offline, more private.',
      '🌈 Haptic feedback patterns on mobile that correlate with mood shifts would be immersive.',
      '📊 Month/year mood heatmap (like GitHub contribution graph) adds compelling habit formation.',
      '🔐 End-to-end encryption is essential for a journaling app; add it before marketing.',
    ],
    aiCurationBadge: 'Creative App',
    aiCurationNote: 'Innovative emotional UX; strong wellbeing angle; highly differentiated concept',
    createdAt: '2026-02-22',
    updatedAt: '2026-03-04',
    isHot: false,
    isFeatured: false,
    license: 'MIT',
    collaborators: ['vibe_carol'],
    price: undefined,
  },
];

export const USERS: User[] = [
  {
    id: 'u1',
    username: 'vibe_alice',
    displayName: 'Alice Chen',
    avatar: AVATARS[0],
    bio: 'Full-stack dev who codes exclusively with AI. 0 manual keystrokes, only vibes.',
    projects: 12,
    totalStars: 8240,
    aiScore: 9420,
    badges: [
      { id: 'b1', name: 'Prompt Wizard', emoji: '🧙', description: 'Mastery of complex prompt chains', rarity: 'legendary' },
      { id: 'b2', name: '100x Vibe', emoji: '⚡', description: '100 AI-generated projects', rarity: 'epic' },
      { id: 'b3', name: 'Top Creator', emoji: '🏆', description: 'Ranked #1 weekly', rarity: 'rare' },
      { id: 'b4', name: 'Early Viber', emoji: '🌱', description: 'Joined in the first 100 members', rarity: 'rare' },
    ],
    joinedAt: '2025-11-01',
    followers: 2840,
    following: 182,
    tools: ['v0.dev', 'Claude', 'Cursor'],
    streak: 42,
  },
  {
    id: 'u2',
    username: 'vibe_bob',
    displayName: 'Bob Martinez',
    avatar: AVATARS[1],
    bio: 'Rust enthusiast. If Cursor can\'t build it, it shouldn\'t be built.',
    projects: 8,
    totalStars: 5200,
    aiScore: 7840,
    badges: [
      { id: 'b5', name: 'Rust Vibe', emoji: '🦀', description: '10+ Rust projects generated', rarity: 'epic' },
      { id: 'b6', name: 'Tool Master', emoji: '🔧', description: 'Used 5 different AI tools', rarity: 'common' },
    ],
    joinedAt: '2025-12-10',
    followers: 1520,
    following: 340,
    tools: ['Cursor', 'GPT-4', 'GitHub Copilot'],
    streak: 28,
  },
  {
    id: 'u3',
    username: 'vibe_carol',
    displayName: 'Carol Kim',
    avatar: AVATARS[2],
    bio: 'AI artist & creative technologist. Every pixel was dreamed by a model.',
    projects: 18,
    totalStars: 11500,
    aiScore: 12300,
    badges: [
      { id: 'b7', name: 'Art Vibe', emoji: '🎨', description: 'Top 5 most-starred art projects', rarity: 'legendary' },
      { id: 'b8', name: 'Viral Creator', emoji: '🚀', description: 'Project hit 5K stars in 24h', rarity: 'legendary' },
      { id: 'b9', name: 'Collab King', emoji: '👥', description: '50+ collaborative projects', rarity: 'epic' },
    ],
    joinedAt: '2025-10-20',
    followers: 5200,
    following: 290,
    tools: ['Claude', 'Stable Diffusion', 'Midjourney', 'v0.dev'],
    streak: 61,
  },
];

export const MARKET_ITEMS: MarketItem[] = [
  {
    id: 'm1',
    title: 'SaaS Starter Prompt Pack',
    description: 'Complete prompt chain to generate a full SaaS app with auth, billing, dashboard, and landing page.',
    author: 'vibe_alice',
    authorAvatar: AVATARS[0],
    category: 'Template',
    price: 29,
    originalPrice: 49,
    rating: 4.9,
    sales: 840,
    previewColor: 'from-violet-600 to-pink-600',
    tags: ['saas', 'starter', 'prompts', 'nextjs', 'stripe'],
    includes: ['50+ curated prompts', 'Component prompt library', 'API route templates', 'Deployment checklist'],
    featured: true,
  },
  {
    id: 'm2',
    title: 'AI Game Engine Prompts',
    description: 'Prompt templates for generating complete 2D games: physics, AI opponents, level generation, sound design.',
    author: 'vibe_eve',
    authorAvatar: AVATARS[4],
    category: 'Template',
    price: 19,
    rating: 4.7,
    sales: 420,
    previewColor: 'from-cyan-600 to-blue-600',
    tags: ['game', 'canvas', 'physics', 'ai-opponent'],
    includes: ['30+ game mechanic prompts', 'Level generator prompts', 'Sound design descriptions', 'Asset style guides'],
    featured: true,
  },
  {
    id: 'm3',
    title: 'DeFi Protocol Generator',
    description: 'Advanced prompt chain for generating audited Solidity smart contracts from protocol descriptions.',
    author: 'vibe_grace',
    authorAvatar: AVATARS[6],
    category: 'Template',
    price: 79,
    originalPrice: 120,
    rating: 4.8,
    sales: 190,
    previewColor: 'from-indigo-600 to-violet-600',
    tags: ['web3', 'defi', 'solidity', 'audit', 'smart-contracts'],
    includes: ['Protocol design prompts', 'Security audit prompts', 'Test generation prompts', '5 DeFi pattern templates'],
    featured: false,
  },
  {
    id: 'm4',
    title: 'Data Dashboard Prompt Kit',
    description: 'Generate beautiful analytics dashboards from any dataset with these structured prompt sequences.',
    author: 'vibe_frank',
    authorAvatar: AVATARS[5],
    category: 'Template',
    price: 24,
    rating: 4.6,
    sales: 310,
    previewColor: 'from-yellow-500 to-orange-600',
    tags: ['dashboard', 'data', 'charts', 'analytics'],
    includes: ['Chart selection prompts', 'Layout design prompts', 'Color theme generators', 'KPI prompt templates'],
    featured: false,
  },
  {
    id: 'm5',
    title: 'Agent Orchestration Templates',
    description: 'Production-ready prompt patterns for building multi-agent AI systems with supervisor-worker architecture.',
    author: 'vibe_dave',
    authorAvatar: AVATARS[3],
    category: 'Agent',
    price: 49,
    originalPrice: 89,
    rating: 4.9,
    sales: 560,
    previewColor: 'from-green-600 to-teal-600',
    tags: ['agents', 'orchestration', 'llm', 'python', 'framework'],
    includes: ['Agent design patterns', 'Task decomposition prompts', 'Error handling templates', 'Monitoring setup prompts'],
    featured: true,
  },
  {
    id: 'm6',
    title: 'Creative UI Vibe Pack',
    description: 'Aesthetic prompt system for generating premium dark-theme UIs with glassmorphism and neon effects.',
    author: 'vibe_carol',
    authorAvatar: AVATARS[2],
    category: 'Template',
    price: 15,
    rating: 4.8,
    sales: 1200,
    previewColor: 'from-pink-600 to-purple-600',
    tags: ['ui', 'design', 'glassmorphism', 'dark-theme', 'aesthetic'],
    includes: ['Design system prompts', 'Component library prompts', 'Animation prompts', 'Color palette generators'],
    featured: true,
  },
];

export const CATEGORIES: { name: Category; emoji: string; color: string; count: number }[] = [
  { name: 'Creative App', emoji: '🎨', color: 'badge-pink', count: 342 },
  { name: 'Dev Tool', emoji: '🔧', color: 'badge-cyan', count: 218 },
  { name: 'AI Model', emoji: '🧠', color: 'badge-purple', count: 156 },
  { name: 'Agent', emoji: '🤖', color: 'badge-green', count: 134 },
  { name: 'Template', emoji: '📋', color: 'badge-orange', count: 289 },
  { name: 'Game', emoji: '🎮', color: 'badge-cyan', count: 98 },
  { name: 'Art', emoji: '🖼️', color: 'badge-pink', count: 185 },
  { name: 'Data', emoji: '📊', color: 'badge-orange', count: 121 },
  { name: 'Utility', emoji: '⚡', color: 'badge-green', count: 203 },
  { name: 'API', emoji: '🔌', color: 'badge-purple', count: 87 },
];

export const STATS = {
  totalProjects: 2183,
  totalUsers: 18420,
  totalStars: 892000,
  promptsGenerated: 4200000,
  aiToolsIntegrated: 24,
  countriesRepresented: 84,
};

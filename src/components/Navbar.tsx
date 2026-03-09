'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Search, Bell, Upload, Menu, X, Zap, Trophy, ShoppingBag, Compass, Settings, Link2, LogOut, ChevronDown, Globe, BookOpen } from 'lucide-react';

const NAV_LINKS = [
  { href: '/explore', key: 'explore', icon: Compass },
  { href: '/leaderboard', key: 'leaderboard', icon: Trophy },
  { href: '/marketplace', key: 'marketplace', icon: ShoppingBag },
  { href: '/guide', key: 'guide', icon: BookOpen },
];

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('en');
  
  useEffect(() => {
    setCurrentLang(document.documentElement.lang || 'en');
  }, []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 h-20 flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <span
            className="font-bold text-lg gradient-text hidden sm:block"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            VibeHub
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: searchFocused ? '#8b5cf6' : 'var(--text-secondary)' }}
          />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="input-field pl-10 py-2 text-sm"
            style={{ borderRadius: '100px', fontSize: '13px', height: '36px' }}
          />
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-4">
          {NAV_LINKS.map(({ href, key, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                {t(key as 'explore' | 'leaderboard' | 'marketplace' | 'guide')}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          {/* Language Toggle */}
          <button
            onClick={() => {
              const nextLocale = currentLang === 'en' ? 'zh' : 'en';
              router.replace(pathname, {locale: nextLocale});
            }}
            className="hidden md:flex items-center gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Language Toggle"
          >
            <Globe size={16} />
            <span className="text-xs font-bold uppercase">{currentLang}</span>
          </button>

          <button
            className="relative p-2 rounded-lg transition-colors hidden md:flex"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: '#ec4899' }}
            />
          </button>

          <Link href="/submit" className="btn-primary hidden md:flex items-center gap-1.5 text-sm py-2 px-4">
            <Upload size={14} />
            {t('submit')}
          </Link>

          {/* Profile dropdown */}
          <div className="relative hidden md:block">
            <Show when="signed-in">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9 border border-white/10 shadow-sm rounded-xl',
                  }
                }}
              />
            </Show>
            <Show when="signed-out">
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-secondary text-sm py-2 px-4 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transition-shadow">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-2"
          style={{ borderColor: 'var(--border-color)', background: 'rgba(5,5,16,0.95)' }}
        >
          <div className="relative mb-3">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search projects..."
              className="input-field pl-10 py-2 text-sm"
              style={{ borderRadius: '100px', fontSize: '13px', height: '36px' }}
            />
          </div>
          {NAV_LINKS.map(({ href, key, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={15} />
              {t(key as 'explore' | 'leaderboard' | 'marketplace' | 'guide')}
            </Link>
          ))}
          <Link href="/submit" className="btn-primary flex items-center justify-center gap-2 mt-3" onClick={() => setMobileOpen(false)}>
            <Upload size={14} />
            Submit Project
          </Link>
        </div>
      )}
    </header>
  );
}

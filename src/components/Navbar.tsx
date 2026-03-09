'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Search, Bell, Upload, Menu, X, Zap, Trophy, ShoppingBag, Compass, Settings, Link2, LogOut, ChevronDown, Globe } from 'lucide-react';

const NAV_LINKS = [
  { href: '/explore', key: 'explore', icon: Compass },
  { href: '/leaderboard', key: 'leaderboard', icon: Trophy },
  { href: '/marketplace', key: 'marketplace', icon: ShoppingBag },
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
                {t(key as 'explore' | 'leaderboard' | 'marketplace')}
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
          <div className="relative hidden md:block" onMouseLeave={() => setProfileOpen(false)}>
            <button
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5"
              onClick={() => setProfileOpen(o => !o)}
              aria-label="Account menu"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=alice&backgroundColor=b6e3f4"
                alt="Profile"
                className="avatar w-9 h-9"
              />
              <ChevronDown size={14} style={{ color: 'var(--text-secondary)', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
                style={{ background: 'rgba(10,10,30,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                {/* User info */}
                <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="font-semibold text-sm">Alice Chen</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>@vibe_alice</div>
                  <div className="mt-1.5 flex gap-1">
                    <span className="badge badge-purple" style={{ fontSize: '9px' }}>🐙 GitHub</span>
                    <span className="badge badge-orange" style={{ fontSize: '9px' }}>🤗 HF</span>
                    <span className="badge badge-green" style={{ fontSize: '9px' }}>▲ Vercel</span>
                  </div>
                </div>
                {/* Menu items */}
                {[
                  { href: '/profile/vibe_alice', icon: '👤', label: 'View Profile' },
                  { href: '/settings/connections', icon: '🔗', label: 'Connected Accounts', badge: '4' },
                  { href: '/submit', icon: '⬆️', label: 'Submit Project' },
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)}>
                    <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5">
                      <span>{item.icon}</span>
                      <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto badge badge-purple" style={{ fontSize: '9px' }}>{item.badge}</span>
                      )}
                    </div>
                  </Link>
                ))}
                <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-red-500/10">
                    <LogOut size={13} style={{ color: '#f87171' }} />
                    <span style={{ color: '#f87171' }}>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
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
              {t(key as 'explore' | 'leaderboard' | 'marketplace')}
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

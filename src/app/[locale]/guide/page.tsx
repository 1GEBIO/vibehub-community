'use client';
import { useTranslations } from 'next-intl';
import { Compass, Upload, ShoppingBag, Trophy, ArrowRight, BookOpen, Star, ShieldCheck, Zap } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function GuidePage() {
  const t = useTranslations('Guide');

  return (
    <div className="relative min-h-screen pt-32 pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="orb" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, #8b5cf6, transparent)', top: '-20%', right: '-10%', opacity: 0.1 }} />
      <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, #ec4899, transparent)', bottom: '-10%', left: '-10%', opacity: 0.1 }} />
      
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}>
            <BookOpen size={16} />
            <span className="text-sm font-medium">Official Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight section-title" style={{ fontFamily: 'Space Grotesk' }}>
            {t('title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          
          {/* Section 1 */}
          <div className="glass-card p-10 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))', border: '1px solid rgba(139,92,246,0.2)' }}>
              <Compass size={28} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              {t('section1_title')}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('section1_desc')}
            </p>
            <div className="mt-8 flex gap-3">
              <span className="badge badge-purple px-3 py-1.5 rounded-lg text-xs"><Zap size={12} className="inline mr-1"/> AI Score</span>
              <span className="badge badge-orange px-3 py-1.5 rounded-lg text-xs">Cursor / v0 Tools</span>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass-card p-10 hover:shadow-[0_0_30px_rgba("236,72,153",0.1)] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(236,72,153,0.05))', border: '1px solid rgba(236,72,153,0.2)' }}>
              <Upload size={28} className="text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              {t('section2_title')}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('section2_desc')}
            </p>
            <div className="mt-8 flex gap-3">
              <span className="badge badge-green px-3 py-1.5 rounded-lg text-xs"><ShieldCheck size={12} className="inline mr-1"/> Auto Verification</span>
            </div>
          </div>

          {/* Section 3 */}
          <div className="glass-card p-10 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)' }}>
              <ShoppingBag size={28} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              {t('section3_title')}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('section3_desc')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="glass-card p-10 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Trophy size={28} className="text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              {t('section4_title')}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('section4_desc')}
            </p>
            <div className="mt-8 flex gap-3">
              <span className="badge badge-orange px-3 py-1.5 rounded-lg text-xs"><Star size={12} className="inline mr-1 text-yellow-400"/> Star Ratings</span>
            </div>
          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="h-px w-full max-w-sm mx-auto mb-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
          <Link href="/explore">
            <button className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow">
              {t('ready_btn')}
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

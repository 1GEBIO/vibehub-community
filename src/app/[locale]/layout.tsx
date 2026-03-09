import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/routing';

export const metadata: Metadata = {
  title: "VibeHub — AI-Generated Projects Community",
  description: "The creative marketplace for 100% AI-generated projects. Discover, share, and sell work built entirely by AI tools.",
  keywords: "vibe coding, AI generated, cursor, copilot, prompt engineering, AI projects, community",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="w-full">
            {children}
          </main>
          <footer className="border-t mt-32" style={{ borderColor: 'var(--border-color)', background: 'rgba(5,5,16,0.5)' }}>
            <div className="max-w-[1600px] mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <span className="font-bold text-lg gradient-text" style={{ fontFamily: 'Space Grotesk' }}>VibeHub</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8' }}>
                  The creative marketplace for 100% AI-generated projects. From vibe coding to full AI-driven development.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>Explore</h4>
                <ul className="space-y-4" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <li><Link href="/explore" className="hover:text-purple-400 transition-colors">Browse Projects</Link></li>
                  <li><Link href="/leaderboard" className="hover:text-purple-400 transition-colors">Leaderboard</Link></li>
                  <li><Link href="/marketplace" className="hover:text-purple-400 transition-colors">Marketplace</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>Create</h4>
                <ul className="space-y-4" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <li><Link href="/submit" className="hover:text-purple-400 transition-colors">Submit Project</Link></li>
                  <li><Link href="/profile/vibe_alice" className="hover:text-purple-400 transition-colors">Your Profile</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>About</h4>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <li><span className="hover:text-purple-400 cursor-pointer transition-colors">Manifesto</span></li>
                  <li><span className="hover:text-purple-400 cursor-pointer transition-colors">AI Policy</span></li>
                  <li><span className="hover:text-purple-400 cursor-pointer transition-colors">Discord</span></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', fontSize: '12px' }}>
              <span>© 2026 VibeHub. Built by AI, for AI builders.</span>
              <div className="flex items-center gap-2">
                <div className="pulse-dot"></div>
                <span>All systems operational · 2,183 projects online</span>
              </div>
            </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

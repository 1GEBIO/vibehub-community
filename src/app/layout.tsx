import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "VibeHub — AI-Generated Projects Community",
  description: "The creative marketplace for 100% AI-generated projects. Discover, share, and sell work built entirely by AI tools.",
  keywords: "vibe coding, AI generated, cursor, copilot, prompt engineering, AI projects, community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        <main>
          {children}
        </main>
        <footer className="border-t mt-20" style={{ borderColor: 'var(--border-color)' }}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                <h4 className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>Explore</h4>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <li><Link href="/explore" className="hover:text-purple-400 transition-colors">Browse Projects</Link></li>
                  <li><Link href="/leaderboard" className="hover:text-purple-400 transition-colors">Leaderboard</Link></li>
                  <li><Link href="/marketplace" className="hover:text-purple-400 transition-colors">Marketplace</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>Create</h4>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
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
      </body>
    </html>
  );
}

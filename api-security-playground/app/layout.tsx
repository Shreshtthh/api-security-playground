import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'API Security Playground - Learn by Breaking',
  description: 'Interactive playground for learning API security vulnerabilities through hands-on exploitation. Powered by Nest API and aligned with OWASP Top 10.',
  keywords: 'API security, OWASP, vulnerability testing, cybersecurity, learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

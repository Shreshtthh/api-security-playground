'use client';

import { Button } from '@/components/ui/Button';
import { Shield, Code, Target } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <p className="text-white text-sm font-medium">Powered by Nest API & OWASP Top 10</p>
            </div>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Learn API Security
            <br />
            <span className="text-blue-200">By Breaking Things</span>
          </h1>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            An interactive playground where developers master API vulnerabilities through hands-on exploitation. 
            Real-time scanning powered by Nest Security API.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/playground">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                <Target className="w-5 h-5 mr-2" />
                Start Hacking
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              <Code className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4+</div>
              <div className="text-blue-200">Vulnerabilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">Real-time</div>
              <div className="text-blue-200">Security Scans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-200">Hands-on Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Card } from '@/components/ui/Card';
import { Shield, Code, Zap, BookOpen, Target, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Hands-On Challenges',
    description: 'Exploit real vulnerabilities in a safe environment. Learn SQL injection, broken auth, and more.'
  },
  {
    icon: Shield,
    title: 'Nest API Integration',
    description: 'Real-time security scanning powered by Nest API. See vulnerabilities detected instantly.'
  },
  {
    icon: BookOpen,
    title: 'OWASP Aligned',
    description: 'Based on OWASP API Security Top 10. Learn industry-standard vulnerability patterns.'
  },
  {
    icon: Code,
    title: 'Interactive Code Editor',
    description: 'Craft attack payloads directly in your browser. See requests and responses in real-time.'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get immediate analysis on your attacks. Understand what worked and why.'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track completed challenges and build your security expertise progressively.'
  }
];

export function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Master API Security
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn by doing with interactive challenges, real-time scanning, and educational guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { CodeEditor } from '@/components/playground/CodeEditor';
import { RequestResponse } from '@/components/playground/RequestResponse';
import { NestScanner } from '@/components/playground/NestScanner';
import { VulnerabilityCard } from '@/components/playground/VulnerabilityCard';
import { ProgressTracker } from '@/components/playground/ProgressTracker';
import { Button } from '@/components/ui/Button';
import { CHALLENGES } from '@/lib/vulnerabilities';
import { Challenge, ScanResult } from '@/types';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PlaygroundPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [currentPayload, setCurrentPayload] = useState<string>('');
  const [requestData, setRequestData] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [shouldScan, setShouldScan] = useState(false);

  useEffect(() => {
    if (selectedChallenge) {
      setCurrentPayload(JSON.stringify(selectedChallenge.testPayload, null, 2));
    }
  }, [selectedChallenge]);

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setRequestData(null);
    setResponseData(null);
    setShouldScan(false);
  };

  const handleExecuteTest = async (code: string) => {
    if (!selectedChallenge) return;

    try {
      // Validate JSON before parsing
      let payload;
      try {
        payload = JSON.parse(code);
      } catch (jsonError) {
        setResponseData({
          status: 400,
          data: { 
            error: 'Invalid JSON format',
            message: jsonError instanceof Error ? jsonError.message : 'JSON parse error',
            hint: 'Please check your JSON syntax. Common issues: missing quotes, trailing commas, unescaped characters'
          },
          vulnerable: false
        });
        return;
      }
      
      // Set request data for display
      setRequestData({
        method: selectedChallenge.method,
        url: selectedChallenge.endpoint,
        payload
      });

      // Make the API call to mock endpoint
      const endpoint = selectedChallenge.endpoint.startsWith('/api/') 
        ? selectedChallenge.endpoint 
        : `/api/mock/${selectedChallenge.endpoint.replace(/^\//, '')}`;
      
      const response = await fetch(endpoint, {
        method: selectedChallenge.method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload.headers || {})
        },
        body: selectedChallenge.method !== 'GET' ? JSON.stringify(payload) : undefined
      });

      const data = await response.json();
      
      // Set response data for display
      setResponseData({
        status: response.status,
        data,
        vulnerable: data.vulnerable
      });

      // If vulnerability was exploited, mark as completed
      if (data.vulnerable) {
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]));
      }

      // Trigger Nest scan
      setShouldScan(true);

    } catch (error) {
      console.error('Test execution failed:', error);
      setResponseData({
        status: 500,
        data: { 
          error: 'Request failed',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        },
        vulnerable: false
      });
    }
  };

  const handleNestScan = async (): Promise<ScanResult> => {
    if (!selectedChallenge || !requestData) {
      throw new Error('No challenge selected');
    }

    // Call Nest API proxy
    const response = await fetch('/api/nest-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: requestData.url,
        method: requestData.method,
        payload: requestData.payload
      })
    });

    if (!response.ok) {
      throw new Error('Scan failed');
    }

    return response.json();
  };

  const handleBackToChallenges = () => {
    setSelectedChallenge(null);
    setRequestData(null);
    setResponseData(null);
    setShouldScan(false);
  };

  if (!selectedChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="bg-slate-900/80 border-b border-slate-700 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">API Security Playground</h1>
                  <p className="text-sm text-slate-300">Learn by exploiting vulnerabilities safely</p>
                </div>
              </div>
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Available Challenges</h2>
              <div className="space-y-4">
                {CHALLENGES.map((challenge) => (
                  <VulnerabilityCard
                    key={challenge.id}
                    challenge={challenge}
                    onStart={handleStartChallenge}
                    completed={completedChallenges.has(challenge.id)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <ProgressTracker
                total={CHALLENGES.length}
                completed={completedChallenges.size}
                challenges={CHALLENGES.map(c => ({
                  id: c.id,
                  title: c.title,
                  completed: completedChallenges.has(c.id)
                }))}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 border-b border-slate-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{selectedChallenge.title}</h1>
              <p className="text-sm text-slate-300">{selectedChallenge.description}</p>
            </div>
            <Button onClick={handleBackToChallenges} variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Challenges
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Code Editor */}
          <div className="space-y-6">
            <CodeEditor
              initialValue={currentPayload}
              onExecute={handleExecuteTest}
              language="json"
            />
            
            <RequestResponse
              request={requestData}
              response={responseData}
            />
          </div>

          {/* Right Column: Nest Scanner */}
          <div>
            <NestScanner
              onScan={handleNestScan}
              autoScan={shouldScan}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

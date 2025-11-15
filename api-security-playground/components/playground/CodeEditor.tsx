'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Code, Play, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  initialValue: string;
  onExecute: (code: string) => void;
  language?: string;
}

export function CodeEditor({ initialValue, onExecute, language = 'json' }: CodeEditorProps) {
  const [code, setCode] = useState(initialValue);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(initialValue);
  }, [initialValue]);

  const handleExecute = async () => {
    // Clear previous errors
    setError(null);

    // Validate JSON before executing
    if (language === 'json' && code.trim()) {
      try {
        JSON.parse(code);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Invalid JSON syntax');
        return;
      }
    }

    setIsExecuting(true);
    await onExecute(code);
    setTimeout(() => setIsExecuting(false), 500);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    // Clear error on typing
    if (error) setError(null);
  };

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-300" />
          <h3 className="font-semibold text-white">Request Payload</h3>
        </div>
        <Button 
          onClick={handleExecute}
          disabled={isExecuting}
          size="sm"
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isExecuting ? 'Testing...' : 'Test Attack'}
        </Button>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium text-sm">JSON Syntax Error</p>
            <p className="text-red-700 text-xs mt-1">{error}</p>
          </div>
        </div>
      )}
      
      <textarea
        value={code}
        onChange={handleCodeChange}
        className={`w-full h-64 p-3 font-mono text-sm bg-slate-900 text-slate-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          error ? 'border-red-500' : 'border-slate-600'
        }`}
        spellCheck={false}
        placeholder="Enter your payload here..."
      />
      
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>Language: {language.toUpperCase()}</span>
        <span>💡 Tip: Modify the payload to exploit the vulnerability</span>
      </div>
    </Card>
  );
}

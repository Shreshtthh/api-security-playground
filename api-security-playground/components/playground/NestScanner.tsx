'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Loader2, ExternalLink } from 'lucide-react';
import { ScanResult } from '@/types';

interface NestScannerProps {
  onScan: () => Promise<ScanResult>;
  autoScan?: boolean;
}

export function NestScanner({ onScan, autoScan = false }: NestScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    setScanning(true);
    try {
      const scanResult = await onScan();
      setResult(scanResult);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setScanning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: 'danger',
      high: 'danger',
      medium: 'warning',
      low: 'success'
    };
    return colors[severity as keyof typeof colors] || 'default';
  };

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white">Nest Security Scan</h3>
        </div>
        {scanning && <Loader2 className="w-5 h-5 animate-spin text-blue-400" />}
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">Severity:</span>
            <Badge variant={getSeverityColor(result.severity) as any}>
              {result.severity.toUpperCase()}
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-2">Analysis</h4>
            <p className="text-sm text-slate-300 bg-slate-900 p-3 rounded-lg">
              {result.details}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-2">Remediation</h4>
            <p className="text-sm text-slate-300 bg-blue-900/30 p-3 rounded-lg border-l-4 border-blue-500">
              {result.remediation}
            </p>
          </div>

          <a
            href={result.owaspLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            <span>Learn more on OWASP</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400">
          <Shield className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <p className="text-sm">
            {scanning ? 'Scanning for vulnerabilities...' : 'Run a test to see security analysis'}
          </p>
        </div>
      )}
    </Card>
  );
}

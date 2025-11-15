'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface RequestResponseProps {
  request?: {
    method: string;
    url: string;
    payload: any;
  };
  response?: {
    status: number;
    data: any;
    vulnerable?: boolean;
  };
}

export function RequestResponse({ request, response }: RequestResponseProps) {
  return (
    <div className="space-y-4">
      {/* Request Section */}
      {request && (
        <Card className="p-4 bg-slate-800 border-slate-700">
          <h3 className="font-semibold text-white mb-3">Request</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default">{request.method}</Badge>
              <code className="text-sm text-slate-300">{request.url}</code>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(request.payload, null, 2)}
            </pre>
          </div>
        </Card>
      )}

      {/* Response Section */}
      {response && (
        <Card className="p-4 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">Response</h3>
            {response.vulnerable ? (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Vulnerable!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Secure</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Badge variant={response.status < 400 ? 'success' : 'danger'}>
              Status: {response.status}
            </Badge>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
}

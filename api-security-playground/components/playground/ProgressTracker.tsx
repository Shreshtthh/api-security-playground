'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  total: number;
  completed: number;
  challenges: Array<{ id: string; title: string; completed: boolean }>;
}

export function ProgressTracker({ total, completed, challenges }: ProgressTrackerProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <h3 className="font-semibold text-white mb-3">Your Progress</h3>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Challenges Completed</span>
          <Badge variant={completed === total ? 'success' : 'default'}>
            {completed} / {total}
          </Badge>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="flex items-center gap-2 text-sm"
          >
            {challenge.completed ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Circle className="w-4 h-4 text-slate-600" />
            )}
            <span className={challenge.completed ? 'text-slate-100' : 'text-slate-400'}>
              {challenge.title}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProgressTracker;

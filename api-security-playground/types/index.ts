export interface Vulnerability {
  id: string;
  name: string;
  owaspId: string; // e.g., "API1:2023"
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Challenge {
  id: string;
  vulnerabilityId: string;
  title: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  hints: string[];
  solution: string;
  testPayload: object;
}

export interface ScanResult {
  vulnerabilityFound: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low';
  details: string;
  remediation: string;
  owaspLink: string;
}

export interface NestApiResponse {
  scanId: string;
  timestamp: string;
  vulnerabilities: Array<{
    type: string;
    severity: string;
    description: string;
    location: string;
    recommendation: string;
  }>;
}

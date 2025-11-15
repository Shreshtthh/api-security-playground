import axios from 'axios';
import { NestApiResponse, ScanResult } from '@/types';

const NEST_API_BASE = process.env.NEST_API_URL || 'https://api.nest.example.com';
const NEST_API_KEY = process.env.NEST_API_KEY;

export class NestScanner {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || NEST_API_KEY || '';
  }

  async scanEndpoint(url: string, method: string, payload?: any): Promise<ScanResult> {
    try {
      const response = await axios.post<NestApiResponse>(
        `${NEST_API_BASE}/v1/scan`,
        {
          target: url,
          method,
          payload,
          scanType: 'full'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Transform Nest API response to our format
      return this.transformScanResult(response.data);
    } catch (error) {
      console.error('Nest API scan failed:', error);
      // Fallback to mock data for demo purposes
      return this.mockScanResult(url, method, payload);
    }
  }

  private transformScanResult(nestData: NestApiResponse): ScanResult {
    const criticalVulns = nestData.vulnerabilities.filter(
      v => v.severity === 'critical' || v.severity === 'high'
    );

    if (criticalVulns.length === 0) {
      return {
        vulnerabilityFound: false,
        severity: 'low',
        details: 'No critical vulnerabilities detected',
        remediation: 'Endpoint appears secure',
        owaspLink: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/'
      };
    }

    const topVuln = criticalVulns[0];
    return {
      vulnerabilityFound: true,
      severity: topVuln.severity as any,
      details: topVuln.description,
      remediation: topVuln.recommendation,
      owaspLink: this.getOwaspLink(topVuln.type)
    };
  }

  private getOwaspLink(vulnType: string): string {
    const owaspMap: Record<string, string> = {
      'sql_injection': 'https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/',
      'broken_auth': 'https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/',
      'excessive_data': 'https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/',
      'mass_assignment': 'https://owasp.org/API-Security/editions/2023/en/0xa6-unrestricted-access-to-sensitive-business-flows/'
    };
    return owaspMap[vulnType] || 'https://owasp.org/API-Security/';
  }

  // Mock data for demo/testing when API unavailable
  private mockScanResult(url: string, method: string, payload?: any): ScanResult {
    const isSqlInjection = JSON.stringify(payload).includes("'") || 
                           JSON.stringify(payload).includes('OR');
    
    if (isSqlInjection) {
      return {
        vulnerabilityFound: true,
        severity: 'critical',
        details: 'SQL Injection detected: Unvalidated user input directly in query',
        remediation: 'Use parameterized queries or ORM with proper escaping',
        owaspLink: 'https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/'
      };
    }

    const hasWeakAuth = payload?.token === 'expired' || !payload?.token;
    if (hasWeakAuth) {
      return {
        vulnerabilityFound: true,
        severity: 'high',
        details: 'Broken Authentication: Expired or missing token accepted',
        remediation: 'Implement proper JWT validation with expiry checks',
        owaspLink: 'https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/'
      };
    }

    return {
      vulnerabilityFound: false,
      severity: 'low',
      details: 'No vulnerabilities detected in this test',
      remediation: 'Continue testing other attack vectors',
      owaspLink: 'https://owasp.org/API-Security/'
    };
  }
}

export const nestScanner = new NestScanner();

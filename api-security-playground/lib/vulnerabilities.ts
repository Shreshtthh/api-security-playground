import { Vulnerability, Challenge } from '@/types';

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'sql-injection',
    name: 'SQL Injection',
    owaspId: 'API8:2023',
    description: 'Attackers inject malicious SQL code through API inputs',
    difficulty: 'easy',
    category: 'Injection'
  },
  {
    id: 'broken-auth',
    name: 'Broken Authentication',
    owaspId: 'API2:2023',
    description: 'Authentication mechanisms can be bypassed or exploited',
    difficulty: 'medium',
    category: 'Authentication'
  },
  {
    id: 'excessive-data',
    name: 'Excessive Data Exposure',
    owaspId: 'API3:2023',
    description: 'APIs return more data than necessary, leaking sensitive info',
    difficulty: 'easy',
    category: 'Authorization'
  },
  {
    id: 'mass-assignment',
    name: 'Mass Assignment',
    owaspId: 'API6:2023',
    description: 'Binding client data to models without proper filtering',
    difficulty: 'medium',
    category: 'Authorization'
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'sql-injection-1',
    vulnerabilityId: 'sql-injection',
    title: 'Bypass Login Authentication',
    description: 'This login endpoint is vulnerable to SQL injection. Try to log in as admin without knowing the password.',
    endpoint: '/api/mock/login',
    method: 'POST',
    hints: [
      'Think about how SQL queries handle quotes',
      'What if you could make the WHERE clause always true?',
      "Try: admin' OR '1'='1"
    ],
    solution: "Use payload: { username: \"admin' OR '1'='1\", password: \"anything\" }",
    testPayload: {
      username: 'admin',
      password: 'test123'
    }
  },
  {
    id: 'broken-auth-1',
    vulnerabilityId: 'broken-auth',
    title: 'Expired Token Bypass',
    description: 'This API accepts expired JWT tokens. Test if you can access protected resources with an invalid token.',
    endpoint: '/api/mock/user/profile',
    method: 'GET',
    hints: [
      'Try sending a request with an expired token',
      'What if the API doesn\'t validate token expiration?',
      'Use token: "expired" in the Authorization header'
    ],
    solution: 'Send request with Authorization: Bearer expired',
    testPayload: {
      headers: {
        'Authorization': 'Bearer valid_token_here'
      }
    }
  },
  {
    id: 'excessive-data-1',
    vulnerabilityId: 'excessive-data',
    title: 'User Data Leak',
    description: 'This endpoint returns user profiles but exposes sensitive fields. Identify what shouldn\'t be there.',
    endpoint: '/api/mock/users',
    method: 'GET',
    hints: [
      'Look for fields that should never be public',
      'Check for passwords, tokens, or internal IDs',
      'Compare with what a frontend actually needs'
    ],
    solution: 'The API returns password_hash, ssn, and internal_id fields',
    testPayload: {}
  },
  {
    id: 'mass-assignment-1',
    vulnerabilityId: 'mass-assignment',
    title: 'Privilege Escalation',
    description: 'This user update endpoint allows modifying any field. Try to make yourself an admin.',
    endpoint: '/api/mock/user/update',
    method: 'PUT',
    hints: [
      'What if you add fields that shouldn\'t be user-modifiable?',
      'Try adding "role": "admin" to your payload',
      'Mass assignment allows binding any field from the request'
    ],
    solution: 'Add { "role": "admin", "is_verified": true } to update payload',
    testPayload: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  }
];

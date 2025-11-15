import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  const body = await request.json();

  // SQL Injection endpoint
  if (path === 'login') {
    const { username, password } = body;
    
    // Vulnerable: Direct string interpolation
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    
    // Simulate SQL injection success
    if (username.includes("'") || username.toLowerCase().includes('or')) {
      return NextResponse.json({
        success: true,
        message: 'Login successful (SQL Injection worked!)',
        user: { id: 1, username: 'admin', role: 'admin' },
        vulnerable: true
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid credentials'
    }, { status: 401 });
  }

  // Mass Assignment endpoint
  if (path === 'user/update') {
    // Vulnerable: Accepts any fields from request
    const updatedUser = {
      id: 123,
      ...body, // Mass assignment vulnerability
      updated_at: new Date().toISOString()
    };

    // Check if privilege escalation attempted
    if (body.role === 'admin' || body.is_verified === true) {
      return NextResponse.json({
        success: true,
        message: 'User updated (Mass Assignment vulnerability exploited!)',
        user: updatedUser,
        vulnerable: true
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User updated',
      user: updatedUser
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  const authHeader = request.headers.get('authorization');

  // Broken Authentication endpoint
  if (path === 'user/profile') {
    // Vulnerable: Doesn't validate token properly
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Accepts any token, even "expired"
    return NextResponse.json({
      success: true,
      user: {
        id: 456,
        username: 'john_doe',
        email: 'john@example.com',
        role: 'user'
      },
      vulnerable: token === 'expired' || token.length < 20
    });
  }

  // Excessive Data Exposure endpoint
  if (path === 'users') {
    return NextResponse.json({
      success: true,
      users: [
        {
          id: 1,
          username: 'alice',
          email: 'alice@example.com',
          // Sensitive fields that shouldn't be exposed:
          password_hash: '$2b$10$abcdefghijklmnop',
          ssn: '123-45-6789',
          internal_id: 'usr_2n4k23n4k23',
          api_key: 'sk_live_abc123xyz',
          created_at: '2024-01-15'
        },
        {
          id: 2,
          username: 'bob',
          email: 'bob@example.com',
          password_hash: '$2b$10$qrstuvwxyz123456',
          ssn: '987-65-4321',
          internal_id: 'usr_9j3n4k23n4k',
          api_key: 'sk_live_def456uvw',
          created_at: '2024-02-20'
        }
      ],
      vulnerable: true
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  const body = await request.json();

  if (path === 'user/update') {
    const updatedUser = {
      id: 123,
      ...body,
      updated_at: new Date().toISOString()
    };

    if (body.role === 'admin' || body.is_verified === true) {
      return NextResponse.json({
        success: true,
        message: 'User updated (Mass Assignment vulnerability exploited!)',
        user: updatedUser,
        vulnerable: true
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User updated',
      user: updatedUser
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

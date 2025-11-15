import { NextRequest, NextResponse } from 'next/server';
import { nestScanner } from '@/lib/nest-api';

export async function POST(request: NextRequest) {
  try {
    const { url, method, payload } = await request.json();

    if (!url || !method) {
      return NextResponse.json(
        { error: 'Missing required fields: url, method' },
        { status: 400 }
      );
    }

    const scanResult = await nestScanner.scanEndpoint(url, method, payload);

    return NextResponse.json(scanResult);
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { error: 'Scan failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

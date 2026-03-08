import { NextResponse } from 'next/server';
import ignoresData from '@/data/ignores.json';

export async function GET() {
  return NextResponse.json(ignoresData.agents);
}

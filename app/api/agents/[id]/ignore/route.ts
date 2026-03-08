import { NextResponse } from 'next/server';
import ignoresData from '@/data/ignores.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = ignoresData.agents.find((a) => a.id === id);

  if (!agent) {
    return NextResponse.json(
      { error: 'Agent not found' },
      { status: 404 }
    );
  }

  // Merge common rules with specific rules
  const mergedIgnore = [...agent.specificIgnore, '', ...ignoresData.common.rules];

  // Return as plain text for easy copying
  const ignoreContent = mergedIgnore.join('\n');

  return new NextResponse(ignoreContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

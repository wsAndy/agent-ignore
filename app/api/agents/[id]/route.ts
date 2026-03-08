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
  const agentWithMergedRules = {
    ...agent,
    ignore: [...agent.specificIgnore, '', ...ignoresData.common.rules],
  };

  return NextResponse.json(agentWithMergedRules);
}

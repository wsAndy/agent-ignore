import { NextResponse } from 'next/server';
import ignoresData from '@/data/ignores.json';

export async function GET() {
  // Merge common rules with specific rules for each agent
  const agentsWithMergedRules = ignoresData.agents.map((agent) => ({
    ...agent,
    ignore: [...agent.specificIgnore, '', ...ignoresData.common.rules],
  }));

  return NextResponse.json(agentsWithMergedRules);
}

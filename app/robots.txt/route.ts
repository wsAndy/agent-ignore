export async function GET() {
  const robotsTxt = `# Agent Ignore - AI Coding Assistant Ignore Templates
# https://agentignore.com

User-agent: *
Allow: /

# API endpoints
Allow: /api/agents
Allow: /api/agents/*

# Documentation
Allow: /docs

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://agentignore.vercel.app'}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

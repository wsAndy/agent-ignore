import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Documentation
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What is Agent Ignore?
            </h2>
            <p className="text-gray-700 mb-4">
              Agent Ignore is a curated collection of ignore file templates for AI coding assistants.
              Similar to how .gitignore helps Git know which files to ignore, these templates help
              AI agents understand which files they should skip when analyzing your codebase.
            </p>
            <p className="text-gray-700">
              This improves performance, reduces token usage, and helps agents focus on the code
              that matters most.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              For Users
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1. Search and Browse
                </h3>
                <p className="text-gray-700">
                  Use the search bar on the home page to find your AI agent (Claude, Cursor, Cline, etc.).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2. Copy or Download
                </h3>
                <p className="text-gray-700">
                  Click on an agent to view its ignore template. You can copy the content or download
                  it as a file.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3. Add to Your Project
                </h3>
                <p className="text-gray-700 mb-2">
                  Create a file in your project root with the appropriate name:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">.claudeignore</code> for Claude</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">.cursorignore</code> for Cursor</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">.clineignore</code> for Cline</li>
                  <li>And so on...</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              For AI Agents (Programmatic Access)
            </h2>
            <p className="text-gray-700 mb-4">
              AI agents can automatically fetch and create ignore files using our API.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Step 1: Discover Available Agents
                </h3>
                <code className="block bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                  curl https://your-domain.vercel.app/api/agents
                </code>
                <p className="text-gray-700 mt-2 text-sm">
                  This returns a JSON array of all available agents with their IDs and descriptions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Step 2: Fetch Ignore Template
                </h3>
                <code className="block bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                  curl https://your-domain.vercel.app/api/agents/claude/ignore
                </code>
                <p className="text-gray-700 mt-2 text-sm">
                  Replace "claude" with your agent ID. This returns plain text content.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Step 3: Create Ignore File
                </h3>
                <code className="block bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                  curl https://your-domain.vercel.app/api/agents/claude/ignore {'>'}  .claudeignore
                </code>
                <p className="text-gray-700 mt-2 text-sm">
                  This creates the ignore file directly in your current directory.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-semibold text-gray-800 mb-2">Example: Auto-setup Script</h4>
                <p className="text-gray-700 text-sm mb-2">
                  An AI agent could implement this logic:
                </p>
                <code className="block bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre">
{`# Detect agent type
AGENT_ID="claude"  # or cursor, cline, etc.

# Fetch and create ignore file
curl -s https://your-domain.vercel.app/api/agents/$AGENT_ID/ignore {'>'} .$AGENT_ID\\ignore

echo "Created .$AGENT_ID\\ignore file"`}
                </code>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              API Endpoints
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="font-mono text-lg font-semibold text-gray-800">
                  GET /api/agents
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Returns: JSON array of all agents
                </p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="font-mono text-lg font-semibold text-gray-800">
                  GET /api/agents/[id]
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Returns: JSON object with agent details
                </p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="font-mono text-lg font-semibold text-gray-800">
                  GET /api/agents/[id]/ignore
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Returns: Plain text ignore file content
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contributing
            </h2>
            <p className="text-gray-700 mb-4">
              Want to add support for a new agent or improve existing templates?
              Contributions are welcome! The project is open source and hosted on GitHub.
            </p>
            <p className="text-gray-700">
              Each agent template is stored in <code className="bg-gray-100 px-2 py-1 rounded">data/ignores.json</code>.
              Simply add a new entry with the agent's ID, name, description, and ignore patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Deployment
            </h2>
            <p className="text-gray-700 mb-4">
              This project is built with Next.js and can be easily deployed to Vercel:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>Push your code to a Git repository (GitHub, GitLab, etc.)</li>
              <li>Import the project in Vercel</li>
              <li>Deploy with one click</li>
              <li>Your API will be available at your Vercel domain</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

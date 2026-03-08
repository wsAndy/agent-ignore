import Link from 'next/link'

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
					← Back to Home
				</Link>

				<h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
					Documentation
				</h1>

				<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">About Agent Ignore</h2>
						<p className="text-gray-700 leading-relaxed">
							Agent Ignore is a curated collection of ignore file templates for AI coding assistants. Just like{' '}
							<code className="bg-gray-200 px-2 py-1 rounded">.gitignore</code> helps Git know which files to ignore, these
							templates help AI agents understand which files they should skip when analyzing your codebase.
						</p>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Use Ignore Files?</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700">
							<li>
								<strong>Improved Performance:</strong> Excluding large files and directories speeds up agent response time
							</li>
							<li>
								<strong>Better Context:</strong> Agents focus on relevant code, providing more accurate suggestions
							</li>
							<li>
								<strong>Security:</strong> Prevent agents from reading sensitive files like <code>.env</code>
							</li>
							<li>
								<strong>Token Efficiency:</strong> Reduce token usage by excluding unnecessary files
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">How to Use</h2>
						<div className="space-y-4">
							<div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">For Users</h3>
								<ol className="list-decimal list-inside space-y-2 text-gray-700">
									<li>Browse or search for your AI agent on the homepage</li>
									<li>Click on the agent to view its ignore template</li>
									<li>Copy the content or download the file</li>
									<li>
										Create a file in your project root (e.g., <code>.claudeignore</code>, <code>.cursorignore</code>)
									</li>
									<li>Paste the content and customize as needed</li>
								</ol>
							</div>

							<div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">For AI Agents (Programmatic Access)</h3>
								<p className="text-gray-700 mb-2">Agents can automatically fetch ignore files via our API:</p>
								<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
									{`# List all agents
curl https://your-domain.vercel.app/api/agents

# Get specific agent info
curl https://your-domain.vercel.app/api/agents/claude

# Download ignore file directly
curl https://your-domain.vercel.app/api/agents/claude/ignore > .claudeignore`}
								</pre>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">Configuration Guidelines</h2>
						<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
							<p className="text-sm text-gray-700">
								<strong>Important:</strong> The ignore configurations provided are based on community best practices and general
								recommendations. They may not be perfect for every use case. We encourage you to:
							</p>
							<ul className="list-disc list-inside mt-2 text-sm text-gray-700">
								<li>Review and customize the configuration for your specific project</li>
								<li>Refer to official documentation of your AI agent</li>
								<li>Contribute improvements via GitHub</li>
							</ul>
						</div>

						<h3 className="text-xl font-semibold text-gray-800 mb-2">Common Categories</h3>
						<div className="space-y-3">
							<div>
								<h4 className="font-semibold text-gray-800">Dependencies</h4>
								<p className="text-sm text-gray-600">
									<code>node_modules/</code>, <code>vendor/</code> - Large directories with third-party code
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">Build Artifacts</h4>
								<p className="text-sm text-gray-600">
									<code>dist/</code>, <code>build/</code>, <code>.next/</code> - Generated files
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">Environment Variables</h4>
								<p className="text-sm text-gray-600">
									<code>.env</code>, <code>.env.local</code> - Sensitive information
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">Media Files</h4>
								<p className="text-sm text-gray-600">
									<code>*.png</code>, <code>*.jpg</code>, <code>*.mp4</code> - Binary files
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">Contributing</h2>
						<p className="text-gray-700 mb-4">
							We welcome contributions! If you have a better configuration or want to add support for a new agent:
						</p>
						<ol className="list-decimal list-inside space-y-2 text-gray-700">
							<li>Fork the repository on GitHub</li>
							<li>
								Update <code>data/ignores.json</code> with your changes
							</li>
							<li>Include references to official documentation or community discussions</li>
							<li>Submit a Pull Request with a clear description</li>
						</ol>
						<p className="text-gray-700 mt-4">
							See our{' '}
							<a
								href="https://github.com/your-repo/CONTRIBUTING.md"
								className="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Contributing Guide
							</a>{' '}
							for more details.
						</p>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">API Reference</h2>
						<div className="space-y-4">
							<div className="border-l-4 border-blue-500 pl-4">
								<h3 className="font-semibold text-gray-800">GET /api/agents</h3>
								<p className="text-sm text-gray-600">Returns a list of all available agents with their configurations.</p>
							</div>
							<div className="border-l-4 border-purple-500 pl-4">
								<h3 className="font-semibold text-gray-800">GET /api/agents/[id]</h3>
								<p className="text-sm text-gray-600">Returns detailed information about a specific agent.</p>
							</div>
							<div className="border-l-4 border-green-500 pl-4">
								<h3 className="font-semibold text-gray-800">GET /api/agents/[id]/ignore</h3>
								<p className="text-sm text-gray-600">
									Returns the ignore file content as plain text. Perfect for automated downloads.
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
						<p className="text-gray-700">
							The ignore configurations provided in this project are for reference only and are not guaranteed to be suitable for
							all scenarios. Users should adjust them according to their specific project needs. We are not responsible for any
							issues arising from the use of these configurations.
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}

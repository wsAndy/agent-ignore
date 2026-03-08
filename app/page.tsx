'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Agent {
	id: string
	name: string
	description: string
	website?: string
	ignoreFileName?: string
	ignore: string[]
}

export default function Home() {
	const [agents, setAgents] = useState<Agent[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
	const [copied, setCopied] = useState(false)
	const [githubStyle, setGithubStyle] = useState(1)

	useEffect(() => {
		fetch('/api/agents')
			.then(res => res.json())
			.then(data => setAgents(data))
	}, [])

	const filteredAgents = agents.filter(
		agent =>
			agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			agent.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCopy = async () => {
		if (selectedAgent) {
			const text = selectedAgent.ignore.join('\n')
			await navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	const handleDownload = () => {
		if (selectedAgent) {
			const text = selectedAgent.ignore.join('\n')
			const blob = new Blob([text], { type: 'text/plain' })
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `.${selectedAgent.id}ignore`
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}
	}

	const githubIcon = (
		<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
			<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
		</svg>
	)

	return (
		<>
			{/* JSON-LD Structured Data for SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: 'Agent Ignore',
						description: 'Curated ignore file templates for AI coding assistants',
						url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agentignore.vercel.app',
						applicationCategory: 'DeveloperApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						featureList: [
							'Ignore templates for OpenClaw, Claude Code, Gemini, Claude, Cursor, Cline, and more',
							'API access for automated integration',
							'Search and filter AI assistants',
							'Copy and download ignore files',
						],
					}),
				}}
			/>
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
			{/* GitHub Corner - Enhanced */}
			<a
				href="https://github.com/wsAndy/agent-ignore"
				target="_blank"
				rel="noopener noreferrer"
				className="github-corner group"
				aria-label="View source on GitHub"
			>
				<svg
					width="100"
					height="100"
					viewBox="0 0 250 250"
					className="fixed top-0 right-0 z-50"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="github-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
							<stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
							<stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
						</linearGradient>
					</defs>
					<path
						d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
						fill="url(#github-gradient)"
						className="group-hover:opacity-90 transition-opacity"
					/>
					<path
						d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
						fill="white"
						style={{ transformOrigin: '130px 106px' }}
						className="octo-arm"
					/>
					<path
						d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
						fill="white"
						className="octo-body"
					/>
				</svg>
				<div className="fixed top-3 right-20 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
					💡 Contribute on GitHub
				</div>
			</a>
			
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
				<div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>
			
			<div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
				{/* Header */}
				<header className="text-center mb-8 py-4">
					<h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient py-2">
						Agent Ignore
					</h1>
					<p className="text-xl text-gray-700 mb-6">Curated ignore file templates for AI coding assistants like OpenClaw, Claude Code, Gemini, and more</p>
				</header>

				{/* Auto-scrolling Agent Cards */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Select Agent</h2>
					<div className="relative overflow-hidden py-2">
						<div className="flex gap-4 animate-scroll" style={{ width: 'max-content' }}>
							{[...agents, ...agents].map((agent, index) => (
								<button
									key={`${agent.id}-${index}`}
									onClick={() => setSelectedAgent(agent)}
									onMouseEnter={(e) => {
										const parent = e.currentTarget.parentElement;
										if (parent) parent.style.animationPlayState = 'paused';
									}}
									onMouseLeave={(e) => {
										const parent = e.currentTarget.parentElement;
										if (parent) parent.style.animationPlayState = 'running';
									}}
									className={`flex-shrink-0 w-48 p-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-xl ${
										selectedAgent?.id === agent.id
											? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
											: 'border-gray-200 bg-white hover:border-purple-300'
									}`}
								>
									<h3 className="font-bold text-lg text-gray-900 mb-1">{agent.name}</h3>
									<p className="text-xs text-gray-600 line-clamp-2">{agent.description}</p>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Search Bar with Dropdown */}
				<div className="mb-8 relative">
					<div className="relative">
						<input
							type="text"
							placeholder="Search for an agent (e.g., claude, cursor, cline)..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							onFocus={() => setSearchTerm(searchTerm || '')}
							className="w-full px-6 py-4 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all shadow-md"
						/>
						{searchTerm && filteredAgents.length > 0 && (
							<div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-purple-200 max-h-96 overflow-y-auto">
								{filteredAgents.map(agent => (
									<button
										key={agent.id}
										onClick={() => {
											setSelectedAgent(agent);
											setSearchTerm('');
										}}
										className="w-full text-left p-4 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>
												<p className="text-sm text-gray-600 mt-1">{agent.description}</p>
												{agent.ignoreFileName && (
													<p className="text-xs text-purple-600 mt-1 font-mono">{agent.ignoreFileName}</p>
												)}
											</div>
										</div>
									</button>
								))}
							</div>
						)}
						{searchTerm && filteredAgents.length === 0 && (
							<div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-purple-200 p-4">
								<p className="text-gray-500 text-center">No agents found matching "{searchTerm}"</p>
							</div>
						)}
					</div>
				</div>

				{/* Ignore Content Display - Full Width */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
						<div className="flex justify-between items-start mb-4">
							<h2 className="text-2xl font-semibold text-gray-800 py-1">
								{selectedAgent ? `${selectedAgent.name} Ignore` : 'Select an Agent'}
							</h2>
							{selectedAgent && (
								<div className="flex gap-3">
									<button
										onClick={handleCopy}
										className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium border border-gray-700"
									>
										{copied ? '✓ Copied' : 'Copy'}
									</button>
									<button
										onClick={handleDownload}
										className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-300"
									>
										Download
									</button>
								</div>
							)}
						</div>
							{selectedAgent ? (
								<>
									{selectedAgent.website && (
										<div className="mb-4 flex items-center gap-2 text-sm">
											<span className="text-gray-600">Official Website:</span>
											<a
												href={selectedAgent.website}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline"
											>
												{selectedAgent.website}
											</a>
										</div>
									)}
									<pre className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto max-h-[600px] overflow-y-auto text-sm font-mono shadow-inner border border-gray-700">
										{selectedAgent.ignore.join('\n')}
									</pre>
								</>
							) : (
								<div className="text-center py-20">
									<p className="text-xl text-gray-500">Select an agent to view its ignore template</p>
									<p className="text-sm text-gray-400 mt-2">Choose from the quick select above or search</p>
								</div>
							)}
				</div>

				{/* API Documentation */}
				<div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">API Documentation for Agents</h2>
					<div className="space-y-4 text-gray-700">
						<div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
							<h3 className="font-semibold text-lg mb-2">Get All Agents</h3>
							<code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">GET /api/agents</code>
							<p className="mt-2 text-sm">Returns a list of all available agents with their configurations.</p>
						</div>
						<div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
							<h3 className="font-semibold text-lg mb-2">Get Specific Agent</h3>
							<code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">GET /api/agents/[id]</code>
							<p className="mt-2 text-sm">Returns detailed information about a specific agent.</p>
						</div>
						<div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
							<h3 className="font-semibold text-lg mb-2">Get Ignore File (Plain Text)</h3>
							<code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">GET /api/agents/[id]/ignore</code>
							<p className="mt-2 text-sm">
								Returns the ignore file content as plain text. Perfect for agents to fetch and create their ignore files
								automatically.
							</p>
						</div>
						<div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-xl shadow-md">
							<h3 className="font-semibold text-lg mb-2">For AI Agents</h3>
							<p className="text-sm mb-2">To automatically create an ignore file for your project, you can use:</p>
							<code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">
								curl https://your-domain.vercel.app/api/agents/claude/ignore {`>`} .claudeignore
							</code>
							<p className="text-sm mt-2">
								Replace <code className="bg-orange-200 px-2 py-1 rounded font-mono text-xs">claude</code> with your agent ID (cursor, cline,
								qoder, etc.)
							</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<footer className="mt-12 text-center text-gray-600 text-sm">
					<p>
						Open source project •{' '}
						<Link href="/docs" className="text-blue-600 hover:underline">
							Documentation
						</Link>
					</p>
				</footer>
			</div>
		</div>
		</>
	)
}

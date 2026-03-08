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

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* Header */}
				<header className="text-center mb-8">
					<h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient">
						Agent Ignore
					</h1>
					<p className="text-xl text-gray-700 mb-6">Curated ignore file templates for AI coding assistants</p>
				</header>

				{/* Auto-scrolling Agent Cards */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Select Agent</h2>
					<div className="relative overflow-hidden">
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
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-semibold text-gray-800">
								{selectedAgent ? `${selectedAgent.name} Ignore` : 'Select an Agent'}
							</h2>
							{selectedAgent && (
								<div className="flex gap-2">
									<button
										onClick={handleCopy}
										className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 text-sm font-medium shadow-md"
									>
										{copied ? '✓ Copied!' : 'Copy'}
									</button>
									<button
										onClick={handleDownload}
										className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 text-sm font-medium shadow-md"
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
								curl https://your-domain.vercel.app/api/agents/claude/ignore {'>'} .claudeignore
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
	)
}

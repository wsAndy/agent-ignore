# Agent Ignore

A curated collection of ignore file templates for AI coding assistants.

## 🎯 Purpose

Just like `.gitignore` helps Git know which files to ignore, Agent Ignore provides templates to help AI coding assistants understand which files they should skip when analyzing your codebase. This improves performance, reduces token usage, and helps agents focus on the code that matters most.

## 🚀 Features

- **User-Friendly Web Interface**: Search and browse ignore templates for various AI agents
- **API for Agents**: RESTful API that allows AI agents to automatically fetch and create their ignore files
- **Multiple Agents Supported**: Claude, Cursor, Cline, Qoder, Windsurf, GitHub Copilot, Aider, and more
- **Easy Integration**: Simple curl commands for quick setup
- **Vercel Ready**: Deploy to Vercel with one click

## 🌐 Live Demo

Visit the live site: [Your Vercel URL]

## 📖 Usage

### For Users

1. Visit the website
2. Search for your AI agent (e.g., Claude, Cursor, Cline)
3. Copy or download the ignore template
4. Create a file in your project root (e.g., `.claudeignore`, `.cursorignore`)
5. Paste the content

### For AI Agents (Programmatic Access)

Agents can automatically fetch and create ignore files:

```bash
# List all available agents
curl https://your-domain.vercel.app/api/agents

# Get ignore template for a specific agent
curl https://your-domain.vercel.app/api/agents/claude/ignore

# Create ignore file directly
curl https://your-domain.vercel.app/api/agents/claude/ignore > .claudeignore
```

## 🔌 API Endpoints

- `GET /api/agents` - Returns list of all available agents
- `GET /api/agents/[id]` - Returns details for a specific agent
- `GET /api/agents/[id]/ignore` - Returns ignore file content as plain text

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click
4. Your API will be available at your Vercel domain

## 🤝 Contributing

Contributions are welcome! To add a new agent or improve existing templates:

1. Edit `data/ignores.json`
2. Add a new entry with the agent's ID, name, description, and ignore patterns
3. Submit a pull request

## 📝 Supported Agents

- **Claude** - Anthropic's Claude AI assistant
- **Cursor** - Cursor AI code editor
- **Cline** - Cline AI coding assistant
- **Qoder** - Qoder AI assistant
- **Windsurf** - Windsurf AI coding assistant
- **GitHub Copilot** - GitHub Copilot AI pair programmer
- **Aider** - Aider AI pair programming tool
- **OpenClaw** - OpenClaw AI coding assistant
- **Continue** - Continue AI coding assistant for VS Code
- **Tabnine** - Tabnine AI code completion
- **Codeium** - Codeium AI code acceleration
- **Supermaven** - Supermaven AI code completion
- **Replit AI** - Replit Ghostwriter AI assistant

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

Inspired by [gitignore.io](https://www.toptal.com/developers/gitignore) by Toptal.

---

Built with ❤️ using Next.js and TypeScript

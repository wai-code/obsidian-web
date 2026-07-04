# Obsidian Web Clone

A web-based application that replicates the core functionality of [Obsidian](https://obsidian.md) - a powerful knowledge base that works on top of a local folder of plain text Markdown files.

## 🚀 Features

### Core Functionality
- **Markdown Editor**: Real-time Markdown editing with live preview
- **Bi-directional Links**: Create connections between notes using `[[wikilinks]]`
- **Graph View**: Visualize connections between your notes in an interactive graph
- **Backlinks**: See all notes that link to the current note
- **Local Storage**: All data stored locally in your browser (no server required)
- **File Management**: Create, edit, delete, and organize notes in folders
- **Full-text Search**: Quickly find notes by content or title
- **Dark/Light Mode**: Toggle between themes for comfortable reading

### Advanced Features
- **Tags & Tag Panel**: Organize notes with `#tags` and browse via tag panel
- **Command Palette**: Quick access to all commands via keyboard shortcuts
- **Customizable Interface**: Resizable panes and customizable layout
- **Export/Import**: Backup and restore your vault as JSON or individual Markdown files
- **Plugin System**: Extensible architecture for custom plugins (future)
- **Daily Notes**: Automatic daily note creation with templates
- **Templates**: Create reusable note templates
- **Code Syntax Highlighting**: Support for code blocks with syntax highlighting

## 🛠️ Tech Stack

- **Frontend**: React / Vue.js / Svelte (choose your preference)
- **State Management**: Zustand / Redux / Pinia
- **Markdown Processing**: Remark / Marked / Markdown-it
- **Graph Visualization**: D3.js / Cytoscape.js / Vis.js
- **Storage**: IndexedDB / LocalStorage API
- **Styling**: TailwindCSS / CSS Modules
- **Build Tool**: Vite / Webpack
- **Testing**: Vitest / Jest + Testing Library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/obsidian-web.git
cd obsidian-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
obsidian-web/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Editor/       # Markdown editor component
│   │   ├── Graph/        # Graph visualization
│   │   ├── FileTree/     # File explorer sidebar
│   │   ├── Search/       # Search functionality
│   │   └── ...
│   ├── stores/           # State management
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React/Vue hooks
│   ├── styles/           # Global styles and themes
│   └── App.vue/.jsx      # Main application component
├── tests/                # Test files
├── package.json
└── README.md
```

## 🎯 Usage Guide

### Creating Notes
1. Click the "+" button in the file explorer or use `Ctrl/Cmd + N`
2. Start typing in Markdown format
3. Use `[[note name]]` to create links to other notes

### Navigating Notes
- Click on wikilinks to navigate between notes
- Use the file explorer to browse your vault
- Use search (`Ctrl/Cmd + P`) to quickly find notes

### Graph View
- Access via the graph icon in the sidebar
- Click nodes to navigate to notes
- Drag nodes to rearrange the view
- Use mouse wheel to zoom in/out

## 🔌 Future Enhancements

- [ ] Mobile responsive design
- [ ] PWA support for offline usage
- [ ] Sync across devices (optional cloud sync)
- [ ] Plugin marketplace
- [ ] Canvas feature (infinite whiteboard)
- [ ] PDF export
- [ ] Collaborative editing
- [ ] End-to-end encryption
- [ ] Desktop app wrapper (Electron/Tauri)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Obsidian](https://obsidian.md) - the original powerful note-taking tool
- Thanks to all open-source libraries that make this possible

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check existing documentation
- Join our community discussions

---

**Note**: This is a web-based clone inspired by Obsidian's functionality. It is not affiliated with or endorsed by Dynalist Inc., the makers of Obsidian.
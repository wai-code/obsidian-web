import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { GraphView } from './components/GraphView';
import { Backlinks } from './components/Backlinks';
import './App.css';

function App() {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="app-container">
      <Sidebar />
      
      <main className="main-content">
        <header className="app-header">
          <h1>📝 Obsidian Web</h1>
          <div className="header-actions">
            <button 
              className="graph-btn"
              onClick={() => setShowGraph(!showGraph)}
            >
              {showGraph ? '📊 Hide Graph' : '🕸️ Show Graph'}
            </button>
          </div>
        </header>
        
        <div className="content-wrapper">
          <div className="editor-section">
            <Editor />
          </div>
          
          {showGraph && (
            <aside className="graph-section">
              <GraphView />
            </aside>
          )}
        </div>
      </main>
      
      <aside className="backlinks-sidebar">
        <Backlinks />
      </aside>
    </div>
  );
}

export default App;

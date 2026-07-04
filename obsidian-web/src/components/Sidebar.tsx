import React from 'react';
import { useNoteStore } from '../store/noteStore';
import { createNote } from '../utils/helpers';

export const Sidebar: React.FC = () => {
  const { 
    notes, 
    activeNoteId, 
    searchQuery, 
    sidebarOpen,
    setActiveNote, 
    setSearchQuery, 
    toggleSidebar,
    addNote,
    deleteNote 
  } = useNoteStore();

  const filteredNotes = Object.values(notes).filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewNote = () => {
    const newNote = createNote('# New Note\nStart writing...');
    addNote(newNote);
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-btn">
          {sidebarOpen ? '◀' : '▶'}
        </button>
        <h2>Notes</h2>
        <button onClick={handleNewNote} className="new-note-btn" title="New Note">
          +
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">No notes found</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-preview">
                {note.content.substring(0, 50)}...
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this note?')) {
                    deleteNote(note.id);
                  }
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

import React from 'react';
import { useNoteStore } from '../store/noteStore';

export const Backlinks: React.FC = () => {
  const { activeNoteId, notes, getLinkedNotes, setActiveNote } = useNoteStore();

  if (!activeNoteId) {
    return null;
  }

  // 找到引用当前笔记的所有笔记（反向链接）
  const activeNote = notes[activeNoteId];
  if (!activeNote) return null;

  // 查找所有包含当前笔记标题的笔记
  const backlinkedNotes = Object.values(notes).filter((note) => {
    if (note.id === activeNoteId) return false;
    const linkRegex = new RegExp(`\\[\\[${activeNote.title}\\]\\]`, 'g');
    return linkRegex.test(note.content);
  });

  // 获取当前笔记引用的其他笔记
  const outgoingLinks = getLinkedNotes(activeNoteId)
    .map((id) => notes[id])
    .filter(Boolean);

  return (
    <div className="backlinks-panel">
      <div className="backlinks-section">
        <h4>🔗 Linked Mentions ({backlinkedNotes.length})</h4>
        {backlinkedNotes.length === 0 ? (
          <p className="no-links">No backlinks found</p>
        ) : (
          <ul className="links-list">
            {backlinkedNotes.map((note) => (
              <li 
                key={note.id} 
                className="link-item"
                onClick={() => setActiveNote(note.id)}
              >
                <span className="link-title">{note.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="backlinks-section">
        <h4>➡️ Outgoing Links ({outgoingLinks.length})</h4>
        {outgoingLinks.length === 0 ? (
          <p className="no-links">No outgoing links</p>
        ) : (
          <ul className="links-list">
            {outgoingLinks.map((note) => (
              <li 
                key={note.id} 
                className="link-item"
                onClick={() => setActiveNote(note.id)}
              >
                <span className="link-title">{note.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNoteStore } from '../store/noteStore';
import { markdownToHtml } from '../utils/helpers';

export const Editor: React.FC = () => {
  const { activeNoteId, notes, updateNote } = useNoteStore();
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content);
    } else {
      setContent('');
    }
  }, [activeNote]);

  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await markdownToHtml(content);
      setPreview(html);
    };
    convertMarkdown();
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // 防抖更新
    const timer = setTimeout(() => {
      if (activeNoteId) {
        updateNote(activeNoteId, { content: newContent });
      }
    }, 300);

    return () => clearTimeout(timer);
  };

  if (!activeNote) {
    return (
      <div className="editor-empty">
        <p>Select a note or create a new one to start editing</p>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>{activeNote.title}</h1>
        <button 
          className="preview-toggle"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
        >
          {isPreviewMode ? '✏️ Edit' : '👁️ Preview'}
        </button>
      </div>

      <div className="editor-content">
        {isPreviewMode ? (
          <div 
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        ) : (
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing in Markdown..."
            className="markdown-editor"
          />
        )}
      </div>

      <div className="editor-footer">
        <span>Last updated: {new Date(activeNote.updatedAt).toLocaleString()}</span>
        {activeNote.tags.length > 0 && (
          <div className="tags">
            {activeNote.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

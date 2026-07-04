import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note } from '../types';

interface NoteStore {
  notes: Record<string, Note>;
  activeNoteId: string | null;
  searchQuery: string;
  sidebarOpen: boolean;
  
  // Actions
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  getNote: (id: string) => Note | undefined;
  getAllNotes: () => Note[];
  getLinkedNotes: (noteId: string) => string[];
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: {},
      activeNoteId: null,
      searchQuery: '',
      sidebarOpen: true,

      addNote: (note) =>
        set((state) => ({
          notes: { ...state.notes, [note.id]: note },
          activeNoteId: note.id,
        })),

      updateNote: (id, updates) =>
        set((state) => {
          const note = state.notes[id];
          if (!note) return state;
          
          return {
            notes: {
              ...state.notes,
              [id]: {
                ...note,
                ...updates,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      deleteNote: (id) =>
        set((state) => {
          const { [id]: removed, ...remaining } = state.notes;
          return {
            notes: remaining,
            activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
          };
        }),

      setActiveNote: (id) => set({ activeNoteId: id }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      getNote: (id) => get().notes[id],

      getAllNotes: () => Object.values(get().notes),

      getLinkedNotes: (noteId) => {
        const state = get();
        const note = state.notes[noteId];
        if (!note) return [];

        // 提取 [[笔记名]] 格式的链接
        const linkRegex = /\[\[([^\]]+)\]\]/g;
        const matches = [...note.content.matchAll(linkRegex)];
        const linkedTitles = matches.map((m) => m[1]);

        // 找到对应的笔记 ID
        return Object.values(state.notes)
          .filter((n) => linkedTitles.includes(n.title))
          .map((n) => n.id);
      },
    }),
    {
      name: 'obsidian-notes-storage',
    }
  )
);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNotesFromAPI, saveNoteToAPI } from '../api/notesApi';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    const data = await fetchNotesFromAPI();
    setNotes(data);
    setLoading(false);
  };

  const addNote = async (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    await saveNoteToAPI(newNote);
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, updates) => {
    setNotes(prev => 
      prev.map(note => note.id === id ? { ...note, ...updates } : note)
    );
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, updateNote, deleteNote, loadNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}


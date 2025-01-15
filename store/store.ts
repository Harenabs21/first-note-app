import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Note } from '../types/note';

interface NotesState {
  notes: Note[];
  loading: boolean;
  addNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  loadNotes: () => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: true,

  loadNotes: async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      set({
        notes: storedNotes ? JSON.parse(storedNotes) : [],
        loading: false,
      });
    } catch (error) {
      console.error('Error loading notes:', error);
      set({ loading: false });
    }
  },

  addNote: async (title: string, content: string) => {
    try {
      const newNote: Note = {
        id: uuid.v4() as string,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedNotes = [newNote, ...get().notes];
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      set({ notes: updatedNotes });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  },

  updateNote: async (id: string, title: string, content: string) => {
    try {
      const updatedNotes = get().notes.map((note) =>
        note.id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
      );
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      set({ notes: updatedNotes });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  },

  deleteNote: async (id: string) => {
    try {
      const filteredNotes = get().notes.filter((note) => note.id !== id);
      await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
      set({ notes: filteredNotes });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  },
}));

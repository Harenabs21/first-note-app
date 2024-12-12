import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNotesStore } from '../store/store';
import { HomeScreen } from '../screens/HomeScreen';
import { NoteScreen } from '../screens/NoteScreen';

export default function App() {
  const [isNoteScreenVisible, setIsNoteScreenVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const { loadNotes, loading } = useNotesStore();

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNotePress = (note: { id: string; title: string; content: string }) => {
    setSelectedNote(note);
    setIsNoteScreenVisible(true);
  };

  const handleClose = () => {
    setSelectedNote(null);
    setIsNoteScreenVisible(false);
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      {isNoteScreenVisible ? (
        <NoteScreen note={selectedNote || undefined} onClose={handleClose} />
      ) : (
        <HomeScreen onNotePress={handleNotePress} onAddPress={() => setIsNoteScreenVisible(true)} />
      )}
    </SafeAreaView>
  );
}

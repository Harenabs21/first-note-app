import React from 'react';
import { SafeAreaView } from 'react-native';
import { NoteForm } from '../components/NoteForm';
import { useNotesStore } from '../store/store';

interface NoteScreenProps {
  note?: {
    id: string;
    title: string;
    content: string;
  };
  onClose: () => void;
}

export const NoteScreen = ({ note, onClose }: NoteScreenProps) => {
  const { addNote, updateNote } = useNotesStore();

  const handleSave = async (title: string, content: string) => {
    if (note) {
      await updateNote(note.id, title, content);
    } else {
      await addNote(title, content);
    }
    onClose();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NoteForm initialTitle={note?.title} initialContent={note?.content} onSave={handleSave} onClose={onClose} />
    </SafeAreaView>
  );
};

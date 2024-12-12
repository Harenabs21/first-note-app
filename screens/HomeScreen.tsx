import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNotesStore } from '../store/store';
import { NoteCard } from '../components/NoteCard';
import { Button } from '../components/ui/Button';

interface HomeScreenProps {
  onNotePress: (note: { id: string; title: string; content: string }) => void;
  onAddPress: () => void;
}

export const HomeScreen = ({ onNotePress, onAddPress }: HomeScreenProps) => {
  const { notes, deleteNote } = useNotesStore();

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">My Notes</Text>
        <Button onPress={onAddPress} label="Add Note" variant="primary" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onPress={() => onNotePress(note)} onDelete={() => deleteNote(note.id)} />
        ))}
        {notes.length === 0 && (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500 text-lg">No notes yet</Text>
            <Text className="text-gray-400">Tap the Add Note button to create one</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

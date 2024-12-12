import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Note } from '../types/note';
import { Button } from './ui/Button';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export const NoteCard = ({ note, onPress, onDelete }: NoteCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 rounded-lg mb-2 shadow-sm"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{note.title}</Text>
          <Text className="text-gray-600 mt-1" numberOfLines={2}>
            {note.content}
          </Text>
          <Text className="text-gray-400 text-sm mt-2">
            {format(new Date(note.updatedAt), 'MMM d, yyyy HH:mm')}
          </Text>
        </View>
        <Button
          onPress={onDelete}
          variant="danger"
          label="Delete"
          className="ml-2"
        />
      </View>
    </TouchableOpacity>
  );
};
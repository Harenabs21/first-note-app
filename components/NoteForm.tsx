import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from './ui/Button';

interface NoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}

export const NoteForm = ({ initialTitle = '', initialContent = '', onSave, onClose }: NoteFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <TextInput
        className="text-xl font-semibold mb-4 p-2 border-b border-gray-200"
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="flex-1 text-base p-2"
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <View className="flex-row justify-end mt-4 gap-2 space-x-4">
        <Button onPress={onClose} variant="secondary" label="Cancel" />
        <Button onPress={handleSave} variant="primary" label="Save" />
      </View>
    </View>
  );
};

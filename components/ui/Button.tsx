import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'danger';
  label: string;
}

export const Button = ({ variant = 'primary', label, className = '', ...props }: ButtonProps) => {
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-200',
    danger: 'bg-red-500',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-gray-800',
    danger: 'text-white',
  };

  return (
    <TouchableOpacity className={`px-4 py-2 rounded-lg ${variantStyles[variant]} ${className}`} {...props}>
      <Text className={`${textStyles[variant]} text-center`}>{label}</Text>
    </TouchableOpacity>
  );
};

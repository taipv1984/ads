import { COLOR } from '../constants/theme';
import React from 'react';
import { Text } from 'react-native';

/**
 * Parses markdown-like syntax to render formatted inline Text components in React Native.
 * Supported formatting:
 * - Bold: **text**
 * - Underline: __text__
 * - Italic: *text*
 * - Color: [text](color) (color can be hex like #FF5733 or a COLOR theme key like focus, primary, error, etc.)
 */
export const renderFormattedText = (text: string) => {
  if (!text) return '';
  
  const parts = text.split(/(\*\*.*?\*\*|__.*?__|\*.*?\*|\[.*?\]\(.*?\))/g);
  
  return parts.map((part, index) => {
    // 1. Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={index} style={{ fontWeight: 'bold' }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    
    // 2. Underline: __text__
    if (part.startsWith('__') && part.endsWith('__')) {
      return (
        <Text key={index} style={{ textDecorationLine: 'underline' }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    
    // 3. Italic: *text*
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <Text key={index} style={{ fontStyle: 'italic' }}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    
    // 4. Colored: [text](color)
    if (part.startsWith('[') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const content = match[1];
        const colorSpec = match[2];
        const resolvedColor = (COLOR as any)[colorSpec] || colorSpec;
        return (
          <Text key={index} style={{ color: resolvedColor }}>
            {content}
          </Text>
        );
      }
    }
    
    return part;
  });
};

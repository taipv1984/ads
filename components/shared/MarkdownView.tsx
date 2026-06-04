import { SPACING } from '@/constants/theme';
import React from 'react';
import { Dimensions, Image, StyleProp, TextStyle } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface _Props {
  text: string;
  style?: StyleProp<TextStyle>;
}

const AutoSizedImage = ({ uri }: { uri: string }) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [hasError, setHasError] = React.useState(false);
  const screenWidth = Dimensions.get('window').width - 2 * SPACING.md;

  React.useEffect(() => {
    if (!uri) {
      setHasError(true);
      return;
    }

    Image.getSize(
      uri,
      (w, h) => {
        if (w > screenWidth) {
          setSize({ width: screenWidth, height: (h * screenWidth) / w });
        } else {
          setSize({ width: w, height: h });
        }
      },
      () => {
        setHasError(true);
      }
    );
  }, [uri, screenWidth]);

  if (hasError) {
    return (
      <Image
        source={require('@/assets/images/no-image.png')}
        style={{ width: screenWidth, height: 110, marginTop: SPACING.xs, marginBottom: SPACING.xs }}
        resizeMode="contain"
      />
    );
  }

  if (size.width === 0 || size.height === 0) {
    return null;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size.width, height: size.height, marginTop: SPACING.xs, marginBottom: SPACING.xs }}
      resizeMode="contain"
    />
  );
};

export const MarkdownView: React.FC<_Props> = ({ text, style }) => {
  if (!text) return null;

  return (
    <Markdown
      style={{ body: style as any }}
      rules={{
        image: (node) => {
          return <AutoSizedImage key={node.key} uri={node.attributes.src} />;
        }
      }}
    >
      {text}
    </Markdown>
  );
};

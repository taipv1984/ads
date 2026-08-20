import { SPACING } from '@/constants/theme';
import React, { useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface _Props {
  uri?: string;
  source?: ImageSourcePropType;
  width?: number;
  height?: number;
  style?: any;
}

export const ImageItem: React.FC<_Props> = ({ uri, source, width, height, style }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(SCREEN_WIDTH - SPACING.md * 2);

  React.useEffect(() => {
    if (source || !uri) {
      setAspectRatio(null);
      return;
    }

    if (!hasError) {
      Image.getSize(
        uri,
        (w, h) => setAspectRatio(w / h),
        () => setHasError(true)
      );
    }
  }, [uri, source, hasError]);

  if (!uri && !source) return null;

  const resolvedSource = source ?? (hasError ? require('@/assets/images/no-image.png') : { uri });

  if (source) {
    const fallbackWidth = width || 100;
    const fallbackHeight = height || 100;

    return (
      <View style={style}>
        <Image
          source={resolvedSource}
          style={{ width: fallbackWidth, height: fallbackHeight }}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (aspectRatio) {
    let imgWidth = width || 100;
    let imgHeight = height || imgWidth / aspectRatio;

    if (imgWidth > containerWidth) {
      imgWidth = containerWidth;
      imgHeight = imgWidth / aspectRatio;
    }

    return (
      <View
        style={style}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Image
          source={resolvedSource}
          style={{ width: imgWidth, height: imgHeight }}
          resizeMode="contain"
          onError={() => setHasError(true)}
        />
      </View>
    );
  }

  const fallbackWidth = width || 100;
  const fallbackHeight = height || 100;

  return (
    <View style={style}>
      <Image
        source={resolvedSource}
        style={{ width: fallbackWidth, height: fallbackHeight }}
        resizeMode="contain"
        onError={() => setHasError(true)}
      />
    </View>
  );
};

export default ImageItem;

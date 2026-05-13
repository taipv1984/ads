export const COLOR = {
  // Màu chính (Brand Colors)
  primary: '#FF814A', // Cam rực rỡ từ hình ảnh
  secondary: '#FFAC81',
  accent: '#FFDECF',

  // Trạng thái (Status Colors)
  success: '#34C759',
  bgSuccess: '#E6F9EA',
  error: '#FF3B30',
  bgError: '#FFEBEE',
  warning: '#FFCC00',
  bgWarning: '#FFF3E0',
  info: '#007AFF',
  blue: '#007AFF',
  bgShape: '#E6F2FF',
  blue_light: '#E6F2FF',//...
  green_light: '#E6F9EA',
  star: '#FFD700',
  connectLine: '#FF814A',

  // Nhóm màu trung tính (Neutral Colors)
  background: '#FFF9F1',
  surface: '#FFFFFF',
  text: '#111111',
  textSecondary: '#7A7A7A',
  border: '#FF814A',
  white: '#FFFFFF',
  black: '#111111',
  grayLight: '#EEEEEE',
  transparent: 'transparent',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Các biến cố định cho Layout
  screenPadding: 16,
  itemGap: 12,
  borderRadius: 8,
  buttonHeight: 48,
} as const;

export const SIZE = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  thumbnail: 60,
  avatar: 40,
} as const;

/**
 * Shadow (Đổ bóng) - Chỉ dùng cho iOS/Android
 */
export const SHADOWS = {
  small: {
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Cho Android
  },
  medium: {
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  // Aliases for consistency with SPACING
  sm: {
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  }
} as const;

export type Theme = typeof COLOR;

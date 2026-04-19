/**
 * SIMPLE UI CONFIG - Hệ thống quản lý giao diện tập trung
 * Giúp app nhất quán về màu sắc, khoảng cách và font chữ.
 */

export const COLOR = {
  // Màu chính (Brand Colors)
  primary: '#FF814A', // Cam rực rỡ từ hình ảnh
  secondary: '#FFAC81',
  accent: '#FFDECF',

  // Trạng thái (Status Colors)
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FFCC00',
  info: '#007AFF',

  // Nhóm màu trung tính (Neutral Colors)
  background: '#FFF9F1', // Màu kem nền nhẹ kiểu cổ điển
  surface: '#FFFFFF', // Trắng cho các card
  text: '#2D2D2D', // Xám đậm cho chữ
  textSecondary: '#7A7A7A',
  border: '#FF814A', // Viền cam nhạt
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
};

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
};

export const TYPOGRAPHY = {
  size: {
    h1: 32,
    h2: 24,
    h3: 20,
    body: 16,
    subBody: 14,
    caption: 12,
  },
  weight: {
    bold: '700',
    semiBold: '600',
    medium: '500',
    regular: '400',
    light: '300',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  }
};

export const SIZE = {
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  image: {
    thumbnail: 60,
    avatar: 40,
  }
};

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
  }
};

export type Theme = typeof COLOR;

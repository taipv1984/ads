import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';

// --- Kiểu dữ liệu cho mỗi thành tích ---
interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  isClaimable: boolean;   // true = có nút "Nhận"
  isClaimed: boolean;     // true = đã nhận rồi
}

interface _Props {
  visible: boolean;
  onClose: () => void;
}

// --- Dữ liệu mẫu thành tích ---
const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Mở khoá màn thử thách',
    subtitle: 'Vượt qua 7/20 câu hỏi thường',
    isClaimable: false,
    isClaimed: false,
  },
  {
    id: '2',
    title: 'Mở khoá màn hại não',
    subtitle: 'Vượt qua 7/50 câu hỏi thường',
    isClaimable: false,
    isClaimed: false,
  },
  {
    id: '3',
    title: 'Nhận VIP 30 ngày',
    subtitle: 'Vượt qua 0/50 câu thử thách',
    isClaimable: true,
    isClaimed: false,
  },
];

// --- Component hiển thị một dòng thành tích (có hiệu ứng nhấn) ---
const AchievementItem = ({ item }: { item: Achievement }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.itemCard, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.itemLeft}>
          <Text style={[styles.itemTitle, item.isClaimable && styles.itemTitleMuted]}>
            {item.title}
          </Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>

        {item.isClaimable && !item.isClaimed && (
          <TouchableOpacity style={styles.claimButton} activeOpacity={0.8}>
            <Text style={styles.claimButtonText}>Nhận</Text>
          </TouchableOpacity>
        )}

        {item.isClaimed && (
          <View style={styles.claimedBadge}>
            <Ionicons name="checkmark-circle" size={22} color={COLOR.success} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

// --- Component Modal chính ---
const AchievementModal = ({ visible, onClose }: _Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Lớp phủ nền mờ, bấm ra ngoài để đóng */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Bấm vào bên trong modal thì KHÔNG đóng */}
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => {}}
        >
          {/* Nút đóng X */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color={COLOR.text} />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.title}>THÀNH TÍCH</Text>
          <Text style={styles.subtitle}>
            Phần quà đặc biệt đang đợi bạn chinh phục
          </Text>

          {/* Danh sách thành tích */}
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {ACHIEVEMENTS.map((item) => (
              <AchievementItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AchievementModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLOR.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFF6EF', // Kem nhẹ khớp màu theme
    borderRadius: 24,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.size.h2,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.primary,
    letterSpacing: 1.5,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.size.subBody,
    color: COLOR.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  list: {
    maxHeight: 320,
  },
  listContent: {
    gap: SPACING.sm,
  },

  // --- Item ---
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...SHADOWS.small,
  },
  itemLeft: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemTitle: {
    fontSize: TYPOGRAPHY.size.body,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    color: COLOR.text,
    marginBottom: 4,
  },
  itemTitleMuted: {
    color: COLOR.textSecondary,
  },
  itemSubtitle: {
    fontSize: TYPOGRAPHY.size.caption,
    color: COLOR.textSecondary,
    lineHeight: 18,
  },

  // --- Nút Nhận ---
  claimButton: {
    backgroundColor: '#D8D8D8',
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
  },
  claimButtonText: {
    color: COLOR.white,
    fontSize: TYPOGRAPHY.size.subBody,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
  },
  claimedBadge: {
    marginLeft: SPACING.xs,
  },
});

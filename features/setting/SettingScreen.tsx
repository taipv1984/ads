import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useGlobalState } from '@/context/GlobalContext';

const SettingItem = ({ icon, title, description, value, onValueChange }: any) => (
  <View style={styles.settingItem}>
    <View style={styles.settingIconContainer}>
      <Ionicons name={icon} size={24} color={COLOR.primary} />
    </View>
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <Switch
      trackColor={{ false: '#767577', true: COLOR.secondary }}
      thumbColor={value ? COLOR.primary : '#f4f3f4'}
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

const SettingScreen = () => {
  const router = useRouter();
  const { soundEnabled, setSoundEnabled, vibrationEnabled, setVibrationEnabled } = useGlobalState();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLOR.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cài đặt</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* ... existing content ... */}
          {/* User Card */}
          <View style={styles.card}>
            <View style={styles.userRow}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person-outline" size={24} color={COLOR.primary} />
              </View>
              <Text style={styles.userName}>Người chơi HD57</Text>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="pencil-outline" size={18} color={COLOR.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Setting Options */}
          <View style={styles.card}>
            <SettingItem
              icon="volume-high-outline"
              title="Âm thanh"
              description="Bật/tắt hiệu ứng âm thanh trong game"
              value={soundEnabled}
              onValueChange={setSoundEnabled}
            />
            <View style={styles.separator} />
            <SettingItem
              icon="vibrate-outline"
              title="Rung"
              description="Bật/tắt rung khi tương tác"
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
            />
          </View>

          {/* Contact/Rate buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.outlineButton}>
              <Ionicons name="mail-outline" size={20} color={COLOR.primary} />
              <Text style={styles.outlineButtonText}>Liên hệ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton}>
              <Ionicons name="star-outline" size={20} color={COLOR.primary} />
              <Text style={styles.outlineButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>

          {/* About Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Hình Gì Đây</Text>
            <Text style={styles.infoText}>
              Trò chơi giải đố hình ảnh thú vị, giúp bạn rèn luyện khả năng suy luận và từ vựng tiếng Việt. Hãy quan sát hình ảnh và đoán từ khóa phù hợp!
            </Text>
          </View>

          {/* Tips Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Mẹo chơi</Text>
            {[
              'Tách từng chi tiết – Chia nhỏ nhân vật, đồ vật, hành động.',
              'Tìm ẩn ý – Để ý mũi tên, ký hiệu, vị trí.',
              'Để ý nhiều âm/nghĩa khác nhau của từng từ.',
              'Sử dụng gợi ý khi gặp khó khăn'
            ].map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          {/* Policy/Terms buttons */}
          <View style={[styles.buttonRow, { marginBottom: 40 }]}>
            <TouchableOpacity style={styles.outlineButton}>
              <Ionicons name="shield-outline" size={20} color={COLOR.primary} />
              <Text style={styles.outlineButtonText}>Chính sách</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton}>
              <Ionicons name="document-text-outline" size={20} color={COLOR.primary} />
              <Text style={styles.outlineButtonText}>Điều khoản</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: COLOR.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLOR.white,
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weight.bold as any,
  },
  headerRight: {
    width: 44,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.text,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.text,
  },
  settingDescription: {
    fontSize: 12,
    color: COLOR.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  outlineButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: COLOR.primary,
    fontSize: 16,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
  },
  infoCard: {
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: 14,
    color: COLOR.text,
    lineHeight: 20,
    textAlign: 'center',
  },
  tipRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  tipNumberText: {
    color: COLOR.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLOR.text,
    lineHeight: 20,
  },
});

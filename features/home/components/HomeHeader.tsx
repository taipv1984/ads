import HeaderButton from '@/app/components/ui/HeaderButton';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useGlobalState } from '@/context/GlobalContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AchievementModal from './AchievementModal';

const HomeHeader = () => {
  const { totalCoin } = useGlobalState();
  const router = useRouter();
  const [achievementVisible, setAchievementVisible] = useState(false);

  return (
    <>
      <AchievementModal
        visible={achievementVisible}
        onClose={() => setAchievementVisible(false)}
      />
      <View style={styles.container}>
        <View style={styles.leftGroup}>
          <HeaderButton icon="settings-outline" onPress={() => router.push('/setting' as any)} />
          <HeaderButton icon="ribbon-outline" onPress={() => setAchievementVisible(true)} />
          <HeaderButton icon="trophy-outline" />
        </View>

        <View style={styles.rightGroup}>
          <HeaderButton icon="gift-outline" />
          <HeaderButton icon="logo-usd" badge={totalCoin} />
        </View>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: 'transparent',
  },
  leftGroup: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  coinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: COLOR.border,
    paddingHorizontal: 12,
    height: 44,
    minWidth: 90,
    ...SHADOWS.small,
  },
  coinIconBackground: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700', // Gold color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  coinText: {
    fontSize: 16,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.primary,
  },
  coinIcon: {
    marginLeft: 4,
  },
  plusIcon: {
    marginLeft: 4,
  },
});

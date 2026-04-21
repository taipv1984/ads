import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useGlobalState as useGlobal } from '@/context/GlobalContext';

const HomeActionButtons = () => {
  const { isPurchased } = useGlobal();

  return (
    <View style={styles.container}>
      {!isPurchased && (
        <TouchableOpacity style={styles.secondaryButton}>
          <MaterialCommunityIcons name="crown" size={24} color={COLOR.primary} style={{ marginRight: 8 }} />
          <Text style={styles.secondaryButtonText}>XÓA QUẢNG CÁO</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.primaryButton}>
        <Ionicons name="game-controller-outline" size={24} color={COLOR.white} style={styles.icon} />
        <Text style={styles.primaryButtonText}>BẮT ĐẦU (CÂU 1)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeActionButtons;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginTop: SPACING.md,
    width: '100%',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: COLOR.primary,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  primaryButtonText: {
    color: COLOR.white,
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weight.bold as any,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  secondaryButtonText: {
    color: COLOR.primary,
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weight.bold as any,
  },
  icon: {
    marginRight: 10,
  },
});

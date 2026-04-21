import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';

const OtherModes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CHẾ ĐỘ CHƠI KHÁC</Text>

      <TouchableOpacity style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="brain" size={40} color={COLOR.primary} />
        </View>
        <Text style={styles.cardTitle}>Hại não</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtherModes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    width: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    fontWeight: TYPOGRAPHY.weight.bold as any,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F0EAD6',
  },
  iconContainer: {
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 18,
    color: COLOR.text,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
  },
});

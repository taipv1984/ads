import { COLOR, SHADOWS, SIZE, SPACING } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OtherModes = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CHẾ ĐỘ CHƠI KHÁC</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/math')}
      >
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
    fontSize: SIZE.md,
    color: '#888',
    fontWeight: 'bold',
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
    fontSize: SIZE.lg,
    color: COLOR.text,
    fontWeight: 'bold',
  },
});

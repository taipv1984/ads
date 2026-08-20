import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DevScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.root} edges={['top']}>
        <Text>dev content</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  root: {
    flex: 1,
  },
});
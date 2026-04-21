import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

const HomeLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
};

export default HomeLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    height: 250,
  },
  logo: {
    width: '80%',
    height: '100%',
  },
});

import AdsBanner from '@/app/components/common/AdsBanner';
import { COLOR } from '@/constants/theme';
import { useGlobalState as useGlobal } from '@/context/GlobalContext';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeActionButtons from './components/HomeActionButtons';
import HomeHeader from './components/HomeHeader';
import HomeLogo from './components/HomeLogo';
import OtherModes from './components/OtherModes';

const HomeScreen = () => {
  const { isPurchased } = useGlobal();
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <HomeHeader />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <HomeLogo />
          <HomeActionButtons />
          <OtherModes />
        </ScrollView>

        {!isPurchased && (
          <AdsBanner />
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

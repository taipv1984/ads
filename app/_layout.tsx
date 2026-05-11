import React, { useEffect } from "react";
import { Stack } from "expo-router";
import mobileAds from 'react-native-google-mobile-ads';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/context/GlobalContext';
import { MathQuizProvider } from '@/features/math/context/MathQuizContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Khởi tạo Query Client
const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    // Khởi tạo SDK quảng cáo
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Mobile Ads SDK đã sẵn sàng!', adapterStatuses);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalProvider>
          <MathQuizProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </MathQuizProvider>
        </GlobalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

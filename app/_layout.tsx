import React, { useEffect } from "react";
import { Stack } from "expo-router";
import mobileAds from 'react-native-google-mobile-ads';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from './context/GlobalContext';

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
      <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </GlobalProvider>
    </QueryClientProvider>
  );
}

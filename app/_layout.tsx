import React, { useEffect } from "react";
import { Stack } from "expo-router";
import mobileAds from 'react-native-google-mobile-ads';

export default function RootLayout() {
  useEffect(() => {
    // Khởi tạo SDK quảng cáo
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Mobile Ads SDK đã sẵn sàng!', adapterStatuses);
      });
  }, []);

  return <Stack />;
}

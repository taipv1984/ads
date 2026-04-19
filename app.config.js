export default ({ config }) => {
  return {
    ...config,
    // Truyền biến môi trường vào app thông qua extra
    extra: {
      ...config.extra,
      adsBannerId: process.env.ADS_BANNER_ID,
      adsInterstitialId: process.env.ADS_INTERSTITIAL_ID,
      adsRewardedId: process.env.ADS_REWARDED_ID,
    },
    plugins: [
      ...(config.plugins || []).filter(p =>
        Array.isArray(p) ? p[0] !== 'react-native-google-mobile-ads' : p !== 'react-native-google-mobile-ads'
      ),
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": process.env.ADS_APP_ID,
          "iosAppId": process.env.ADS_APP_ID,
          "android_app_id": process.env.ADS_APP_ID,
          "ios_app_id": process.env.ADS_APP_ID
        }
      ]
    ]
  };
};

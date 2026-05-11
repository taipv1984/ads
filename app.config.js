import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  plugins: [
    ...config.plugins.filter(p => 
      Array.isArray(p) ? p[0] !== 'react-native-google-mobile-ads' : p !== 'react-native-google-mobile-ads'
    ),
    [
      "react-native-google-mobile-ads",
      {
        "androidAppId": process.env.ADS_APP_ID,
        "iosAppId": process.env.ADS_APP_ID
      }
    ]
  ],
  extra: {
    ...config.extra,
    adsAppId: process.env.ADS_APP_ID,
    adsBannerId: process.env.ADS_BANNER_ID,
  }
});

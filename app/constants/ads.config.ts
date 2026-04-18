import Constants from 'expo-constants';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * FILE AdMobConfig.ts: File quản lý cấu hình quảng cáo tập trung.
 * 
 * MỤC ĐÍCH:
 * 1. Tập trung tất cả ID quảng cáo vào một nơi để dễ thay đổi.
 * 2. Tự động xử lý logic chọn mã TEST (khi code/dev) hoặc mã THẬT (khi đóng gói app).
 */

const extra = Constants.expoConfig?.extra || {};

export const ADS_CONFIG = {
    // 1. Quảng cáo Banner (Nằm cố định)
    banner: {
        unitId: __DEV__
            ? TestIds.BANNER
            : (extra.adsBannerId || ''),
    },

    // 2. Quảng cáo Toàn màn hình (Hiện lên giữa chừng)
    interstitial: {
        unitId: __DEV__
            ? TestIds.INTERSTITIAL
            : (extra.adsInterstitialId || ''),
    },

    // 3. Quảng cáo Video nhận thưởng
    rewarded: {
        unitId: __DEV__
            ? TestIds.REWARDED
            : (extra.adsRewardedId || ''),
    },

    // 4. Quảng cáo App Open (Hiện khi vừa mở app)
    appOpen: {
        unitId: __DEV__
            ? TestIds.APP_OPEN
            : (extra.adsAppOpenId || ''),
    }
};

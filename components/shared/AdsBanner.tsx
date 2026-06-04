import React from 'react';
import {
    BannerAd,
    BannerAdSize,
} from 'react-native-google-mobile-ads';
import { ADS_CONFIG } from '@/constants/ads.config';

const AdsBanner: React.FC = () => {
    return (
        <BannerAd
            unitId={ADS_CONFIG.banner.unitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
                console.log('Quảng cáo đã tải thành công');
            }}
            onAdFailedToLoad={(error) => {
                console.error('Quảng cáo tải thất bại: ', error);
            }}
        />
    );
};

export default AdsBanner;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    BannerAd,
    BannerAdSize,
} from 'react-native-google-mobile-ads';
import { ADS_CONFIG } from '../constants/AdsConfig';

const AdsBanner: React.FC = () => {
    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default AdsBanner;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
});

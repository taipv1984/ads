import React, { createContext, ReactNode, useContext, useState } from 'react';
import { StorageUtil } from '@/utils/StorageUtil';

interface GlobalContextType {
  totalCoin: number;
  setTotalCoin: (value: number) => void;
  isPurchased: boolean;
  setIsPurchased: (value: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Lấy giá trị ban đầu bằng class StorageUtil
  const [totalCoin, setTotalCoinState] = useState(() => StorageUtil.getNumber(StorageUtil.Keys.TOTAL_COIN, 90));
  const [isPurchased, setIsPurchasedState] = useState(() => StorageUtil.getBoolean(StorageUtil.Keys.IS_PURCHASED, false));
  const [soundEnabled, setSoundEnabledState] = useState(() => StorageUtil.getBoolean(StorageUtil.Keys.SOUND_ENABLED, true));
  const [vibrationEnabled, setVibrationEnabledState] = useState(() => StorageUtil.getBoolean(StorageUtil.Keys.VIBRATION_ENABLED, true));

  // Hàm cập nhật Coin và lưu vào bộ nhớ
  const setTotalCoin = (value: number) => {
    setTotalCoinState(value);
    StorageUtil.saveNumber(StorageUtil.Keys.TOTAL_COIN, value);
  };

  // Hàm cập nhật trạng thái mua và lưu vào bộ nhớ
  const setIsPurchased = (value: boolean) => {
    setIsPurchasedState(value);
    StorageUtil.saveBoolean(StorageUtil.Keys.IS_PURCHASED, value);
  };

  // Hàm cập nhật Âm thanh và lưu vào bộ nhớ
  const setSoundEnabled = (value: boolean) => {
    setSoundEnabledState(value);
    StorageUtil.saveBoolean(StorageUtil.Keys.SOUND_ENABLED, value);
  };

  // Hàm cập nhật Rung và lưu vào bộ nhớ
  const setVibrationEnabled = (value: boolean) => {
    setVibrationEnabledState(value);
    StorageUtil.saveBoolean(StorageUtil.Keys.VIBRATION_ENABLED, value);
  };

  return (
    <GlobalContext.Provider
      value={{
        totalCoin,
        setTotalCoin,
        isPurchased,
        setIsPurchased,
        soundEnabled,
        setSoundEnabled,
        vibrationEnabled,
        setVibrationEnabled,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};

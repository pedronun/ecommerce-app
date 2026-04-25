import { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import semver from 'semver';

type UseAppUpdateResult = {
  hasUpdate: boolean;
  isLoading: boolean;
  latestVersion: string | null;
  currentVersion: string;
  openStore: () => Promise<void>;
  checkUpdate: () => Promise<void>;
};

export function useAppUpdate(): UseAppUpdateResult {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  const currentVersion = useMemo(() => DeviceInfo.getVersion(), []);

  const checkUpdate = useCallback(async () => {
    try {
      setIsLoading(true);
      const storeVersion = await VersionCheck.getLatestVersion();
      setLatestVersion(storeVersion);

      const updateAvailable = semver.lt(currentVersion, storeVersion || '0.0.0');

      setHasUpdate(updateAvailable);
    } catch (error) {
      console.error('Error checking update:', error);
      setHasUpdate(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentVersion]);

  const openStore = useCallback(async () => {
    const url = await (Platform.OS === 'ios'
      ? VersionCheck.getAppStoreUrl()
      : VersionCheck.getPlayStoreUrl());

    if (url) {
      Linking.openURL(url);
    }
  }, []);

  useEffect(() => {
    checkUpdate();
  }, [checkUpdate]);

  return {
    hasUpdate,
    isLoading,
    latestVersion,
    currentVersion,
    openStore,
    checkUpdate,
  };
}

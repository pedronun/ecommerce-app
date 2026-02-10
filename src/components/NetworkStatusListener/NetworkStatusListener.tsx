import { useToast } from '@design-system/components/Toast';
import { addNetworkStateListener } from 'expo-network';
import { useEffect, useRef } from 'react';

const OFFLINE_TOAST_MESSAGE = 'A conexão com a internet está instável. Verifique sua rede.';

function NetworkStatusListener() {
  const toast = useToast();
  const wasOfflineRef = useRef<boolean | null>(null);

  useEffect(() => {
    const subscription = addNetworkStateListener((state) => {
      const isOffline = state.isConnected === false || state.isInternetReachable === false;

      if (isOffline && wasOfflineRef.current !== true) {
        toast.show({
          message: OFFLINE_TOAST_MESSAGE,
          type: 'warning',
          duration: 5000,
          position: 'top',
        });
      }

      wasOfflineRef.current = isOffline;
    });

    return () => subscription.remove();
  }, [toast]);

  return null;
}

export { NetworkStatusListener };

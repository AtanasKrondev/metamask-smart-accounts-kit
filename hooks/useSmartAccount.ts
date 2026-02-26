'use client';

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from '@metamask/smart-accounts-kit';
import { useEffect, useState } from 'react';
import { useConnection, usePublicClient, useWalletClient } from 'wagmi';

export function useSmartAccount() {
  const publicClient = usePublicClient();
  const { address } = useConnection();
  const { data: walletClient } = useWalletClient();

  const [smartAccount, setSmartAccount] = useState<MetaMaskSmartAccount | null>(
    null,
  );

  useEffect(() => {
    async function createSmartAccount() {
      try {
        setSmartAccount(null);
        if (!publicClient || !address || !walletClient) return;

        const newSmartAccount = await toMetaMaskSmartAccount({
          client: publicClient,
          implementation: Implementation.Hybrid,
          deployParams: [address, [], [], []],
          deploySalt: '0x',
          signer: { walletClient },
        });

        setSmartAccount(newSmartAccount);
      } catch (error) {
        console.error(error);
        setSmartAccount(null);
      }
    }
    createSmartAccount();
  }, [publicClient, address, walletClient]);

  return { smartAccount };
}

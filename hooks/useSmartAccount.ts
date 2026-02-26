'use client';

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from '@metamask/smart-accounts-kit';
import { useState } from 'react';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { usePublicClient } from 'wagmi';

export function useSmartAccount() {
  const publicClient = usePublicClient();

  const [smartAccount, setSmartAccount] = useState<MetaMaskSmartAccount | null>(
    null,
  );

  async function createSmartAccount() {
    if (!publicClient) {
      console.error('Public client not found');
      return;
    }

    const account = privateKeyToAccount(generatePrivateKey());

    const newSmartAccount = await toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [account.address, [], [], []],
      deploySalt: '0x',
      signer: { account },
    });

    setSmartAccount(newSmartAccount);
  }

  return { smartAccount, createSmartAccount };
}

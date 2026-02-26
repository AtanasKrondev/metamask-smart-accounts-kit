'use client';

import { usePimlicoServices } from '@/hooks/usePimlicoServices';
import { Button } from './ui/button';
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useSmartAccount } from '@/hooks/useSmartAccount';
import { parseEther } from 'viem';

export function UserOperation() {
  const { bundlerClient, pimlicoClient, paymasterClient } =
    usePimlicoServices();
  const { smartAccount } = useSmartAccount();

  const handleSend = async () => {
    try {
      if (!bundlerClient) {
        throw new Error('Bundler client is not set');
      }

      if (!smartAccount) {
        throw new Error('Smart account is not set');
      }

      if (!pimlicoClient) {
        throw new Error('Pimlico client is not set');
      }

      if (!paymasterClient) {
        throw new Error('Paymaster client is not set');
      }

      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

      const userOperationHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to: '0x1c86a8622232E2A0717dC6de68767366F5d21c4a',
            value: parseEther('0.00001'),
          },
        ],
        paymaster: paymasterClient,
        ...fee,
      });

      const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
        hash: userOperationHash,
      });

      console.log(receipt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Operation</CardTitle>
      </CardHeader>
      <CardFooter>
        <CardAction>
          <Button onClick={async () => await handleSend()}>Send</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

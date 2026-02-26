'use client';

import { useSmartAccount } from '@/hooks/useSmartAccount';
import { Button } from './ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export function SmartAccount() {
  const { smartAccount, createSmartAccount } = useSmartAccount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`Address: ${smartAccount?.address ?? '-'}`}</p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button onClick={async () => await createSmartAccount()}>
            Generate new
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

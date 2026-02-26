'use client';

import { useSmartAccount } from '@/hooks/useSmartAccount';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function SmartAccount() {
  const { smartAccount } = useSmartAccount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`Address: ${smartAccount?.address ?? '-'}`}</p>
      </CardContent>
    </Card>
  );
}

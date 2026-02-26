'use client';

import { useConnect, useBalance, useDisconnect, useConnection } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Wallet, LogOut } from 'lucide-react';
import { formatEther } from 'viem';

export function ConnectButton() {
  const { mutate: connect } = useConnect();
  const { address, isConnected, isConnecting, isReconnecting } =
    useConnection();
  const { data: balance } = useBalance({ address });
  const { mutate: disconnect } = useDisconnect();

  if (isReconnecting) {
    return (
      <Button className="w-50 animate-pulse" variant="outline">
        Reconnecting...
      </Button>
    );
  }

  if (isConnecting) {
    return (
      <Button className="w-50 animate-pulse" variant="outline">
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    const ethBalance = balance ? formatEther(balance.value) : '0';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-50">
            {truncatedAddress} ({parseFloat(ethBalance).toFixed(4)} ETH)
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => disconnect()}>
            Disconnect
            <LogOut className="ml-2 size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => connect({ connector: metaMask() })}
      className="w-50"
    >
      Connect MetaMask
      <Wallet className="ml-2 size-4" />
    </Button>
  );
}

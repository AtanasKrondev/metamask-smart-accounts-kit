import { ThemeToggle } from './theme-toggle';
import { ConnectButton } from './connect-button';
import { Coins } from 'lucide-react';
import { ClientOnly } from './client-only';

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 max-w-7xl mx-auto border-b bg-background/95 backdrop-blur p-4 flex justify-between items-center">
      <Coins className="size-6" />
      <div className="flex items-center gap-4">
        <ClientOnly>
          <ConnectButton />
        </ClientOnly>
        <ThemeToggle />
      </div>
    </header>
  );
}

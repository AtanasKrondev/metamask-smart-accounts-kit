import { SmartAccount } from '@/components/smart-account';
import { UserOperation } from '@/components/user-operation';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4 grid gap-4">
      <SmartAccount />
      <UserOperation />
    </main>
  );
}

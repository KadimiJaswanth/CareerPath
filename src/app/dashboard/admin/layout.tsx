'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { href: '/dashboard/admin', label: 'Analytics' },
  { href: '/dashboard/admin/careers', label: 'Manage Careers' },
  { href: '/dashboard/admin/skills', label: 'Manage Skills' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage application data and view analytics.
        </p>
      </div>
      <nav className="flex items-center space-x-2 border-b">
        {adminNavItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn(
              'rounded-none border-b-2 border-transparent hover:bg-transparent hover:border-muted-foreground',
              pathname === item.href
                ? 'border-primary text-primary'
                : 'text-muted-foreground'
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  );
}

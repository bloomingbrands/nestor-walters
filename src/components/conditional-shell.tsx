'use client';
import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

const SHELL_ROUTES = ['/blog', '/books'];

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const needsShell = SHELL_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  );

  if (!needsShell) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

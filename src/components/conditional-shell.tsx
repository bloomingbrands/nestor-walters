'use client';
import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

const STANDALONE_ROUTES = ['/v3', '/v5'];
// /v5 and any /v5/* subroute

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  );

  if (isStandalone) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

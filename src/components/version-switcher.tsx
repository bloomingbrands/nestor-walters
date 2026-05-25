'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const versions = [
  { label: 'I',   name: 'Original',  href: '/'   },
  { label: 'II',  name: 'Refined',   href: '/v2' },
  { label: 'III', name: 'Editorial', href: '/v3' },
  { label: 'IV',  name: 'Samuel',    href: '/v4' },
];

export function VersionSwitcher() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.45))' }}
    >
      <div
        className="flex items-center"
        style={{ background: 'oklch(0.08 0.005 55)', border: '1px solid oklch(0.08 0.005 55)' }}
      >
        <span
          className="px-3 py-2.5"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'oklch(0.94 0.003 55 / 0.4)',
          }}
        >
          Design
        </span>
        {versions.map((v) => {
          const active = pathname === v.href;
          return (
            <Link
              key={v.href}
              href={v.href}
              title={v.name}
              aria-current={active ? 'page' : undefined}
              className="relative px-4 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: active ? 'oklch(0.65 0.08 55)' : 'transparent',
                color: active ? 'oklch(0.94 0.003 55)' : 'oklch(0.94 0.003 55 / 0.5)',
                borderLeft: '1px solid oklch(0.94 0.003 55 / 0.12)',
              }}
            >
              {v.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

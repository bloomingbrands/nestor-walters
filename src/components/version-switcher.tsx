'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const versions = [
  { label: 'I', name: 'Original', href: '/' },
  { label: 'II', name: 'Refined', href: '/v2' },
  { label: 'III', name: 'Editorial', href: '/v3' },
];

export function VersionSwitcher() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex items-center"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.45))' }}
    >
      <div
        className="flex items-center"
        style={{ background: '#0F0F0F', border: '1px solid #0F0F0F' }}
      >
        <span
          className="px-3 py-2.5"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,240,0.4)',
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
              className="relative px-4 py-2.5 transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: active ? '#FF3B00' : 'transparent',
                color: active ? '#F4F4F0' : 'rgba(244,244,240,0.5)',
                borderLeft: '1px solid rgba(244,244,240,0.12)',
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

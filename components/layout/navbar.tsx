'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: '경쟁사 모니터링', href: '/' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/competitors');
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">건기식 모니터링</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 데이터 기준일 */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-xs text-gray-400">데이터 기준:</span>
          <span className="text-xs font-medium text-gray-600">2026-03-24</span>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴 토글"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-2 px-4 text-xs text-gray-400">데이터 기준: 2026-03-24</p>
          </nav>
        </div>
      )}
    </header>
  );
}

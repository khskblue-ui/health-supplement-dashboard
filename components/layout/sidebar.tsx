'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { COMPETITOR_COLORS } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompetitors } from '@/hooks/use-queries';

export function Sidebar() {
  const pathname = usePathname();
  const { data: competitors, isLoading } = useCompetitors();

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-20 rounded-lg border bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          경쟁사 목록
        </p>
        <nav className="flex flex-col gap-1">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </>
          ) : (
            competitors?.map((c) => {
              const isActive = pathname.startsWith(`/competitors/${c.id}`);
              const color = COMPETITOR_COLORS[c.id] ?? '#6B7280';
              return (
                <Link
                  key={c.id}
                  href={`/competitors/${c.id}`}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {c.name_short}
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </aside>
  );
}

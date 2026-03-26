'use client';

import React from 'react';
import { DashboardData, COMPETITOR_BG_COLORS, COMPETITOR_COLORS } from '@/lib/types';
import { formatDateKo } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RecentTimelineProps {
  data: DashboardData;
}

interface TimelineItem {
  product_name: string | null;
  mod_dt: string | null;
  product_type: string | null;
  food_type: string | null;
  competitor_id: number;
  competitor_name: string;
}

export function RecentTimeline({ data }: RecentTimelineProps) {
  const items: TimelineItem[] = data.competitors
    .flatMap((c) =>
      c.latest_products.map((p) => ({
        product_name: p.product_name,
        mod_dt: p.mod_dt,
        product_type: p.product_type,
        food_type: p.food_type,
        competitor_id: c.id,
        competitor_name: c.name,
      }))
    )
    .sort((a, b) => (b.mod_dt ?? '').localeCompare(a.mod_dt ?? ''))
    .slice(0, 20);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const bgColor = COMPETITOR_BG_COLORS[item.competitor_id] ?? 'bg-gray-100 text-gray-700';
        const dotColor = COMPETITOR_COLORS[item.competitor_id] ?? '#6B7280';
        return (
          <div key={idx} className="flex gap-4">
            {/* 타임라인 도트 */}
            <div className="flex flex-col items-center">
              <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: dotColor }}
              />
              {idx < items.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-gray-200" style={{ minHeight: '20px' }} />
              )}
            </div>

            {/* 내용 */}
            <div className="flex-1 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={bgColor} variant="outline">
                  {item.competitor_name.replace('(주)', '').trim()}
                </Badge>
                <span className="font-medium text-gray-900 text-sm">{item.product_name}</span>
                {item.food_type === '건기' && (
                  <Badge variant="secondary" className="text-xs">건기식</Badge>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-400">
                <span>{item.product_type}</span>
                <span>·</span>
                <span>{formatDateKo(item.mod_dt ?? '')}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

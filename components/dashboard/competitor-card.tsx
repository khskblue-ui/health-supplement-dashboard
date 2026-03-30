'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardCompetitor, COMPETITOR_COLORS, COMPETITOR_BG_COLORS, COMPETITOR_BORDER_COLORS } from '@/lib/types';
import { formatDateKo } from '@/lib/utils';

interface CompetitorCardProps {
  competitor: DashboardCompetitor;
}

export function CompetitorCard({ competitor }: CompetitorCardProps) {
  const router = useRouter();
  const color = COMPETITOR_COLORS[competitor.id] ?? '#6B7280';
  const bgColor = COMPETITOR_BG_COLORS[competitor.id] ?? 'bg-gray-100 text-gray-800';
  const borderColor = COMPETITOR_BORDER_COLORS[competitor.id] ?? 'border-gray-300';

  return (
    <Card
      className={`cursor-pointer border-l-4 transition-all hover:shadow-md ${borderColor}`}
      onClick={() => router.push(`/competitors/${competitor.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            {competitor.name}
          </CardTitle>
          <Badge className={bgColor} variant="outline">
            최근 7일 {competitor.last_7_days_count}건
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* 최근 30일 출고 건수 */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{competitor.recent_count}</p>
            <p className="text-xs text-gray-500">최근 30일 신규 출고</p>
          </div>
        </div>

        {/* 최신 품목 미리보기 */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            최신 출고 품목
          </p>
          {competitor.latest_products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800">{product.product_name}</p>
                <p className="truncate text-xs text-gray-400">{product.product_type}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{product.mod_dt}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import React from 'react';
import { useDashboard } from '@/hooks/use-queries';
import { CompetitorCard } from '@/components/dashboard/competitor-card';
import { RecentTimeline } from '@/components/dashboard/recent-timeline';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock } from 'lucide-react';

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !data) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">경쟁사 모니터링</h1>
        <p className="mt-1 text-sm text-gray-500">
          4개 경쟁사의 건강기능식품 신규 신고 현황을 모니터링합니다.
        </p>
      </div>

      {/* 경쟁사 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.competitors.map((competitor) => (
          <CompetitorCard key={competitor.id} competitor={competitor} />
        ))}
      </div>

      {/* 전체 타임라인 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-gray-500" />
            최근 신규 신고 타임라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTimeline data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

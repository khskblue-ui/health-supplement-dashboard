'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { useCompetitorDetail, useCompetitorProducts, useCompetitorYearly } from '@/hooks/use-queries';
import { MonthlyChart } from '@/components/competitors/monthly-chart';
import { RegistrationsTable } from '@/components/competitors/registrations-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { COMPETITOR_COLORS } from '@/lib/types';
import { formatNumber, formatYearMonth } from '@/lib/utils';

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="mt-1 h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent><Skeleton className="h-64 w-full" /></CardContent>
      </Card>
    </div>
  );
}

export default function CompetitorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const { data: detail, isLoading: loadingDetail, isError: errorDetail } = useCompetitorDetail(id);
  const { data: products, isLoading: loadingProducts } = useCompetitorProducts(id, {
    year: selectedYear,
  });
  const { data: yearly } = useCompetitorYearly(id);

  const color = COMPETITOR_COLORS[id] ?? '#3B82F6';
  const availableYears = yearly?.map((y) => y.year) ?? [2022, 2023, 2024, 2025];

  if (loadingDetail) return <DetailSkeleton />;

  if (errorDetail || !detail) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 뒤로가기 + 헤더 */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h1 className="text-2xl font-bold text-gray-900">{detail.name}</h1>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">건강기능식품 출고 현황</p>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">총 품목 수</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatNumber(detail.total_registrations)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">최근 12개월 합계</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatNumber(detail.monthly_trend.reduce((s, d) => s + d.count, 0))}
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">이번 달 출고</span>
            </div>
            <p className="mt-1 text-2xl font-bold" style={{ color }}>
              {detail.monthly_trend[detail.monthly_trend.length - 1]?.count ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 월별 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">최근 12개월 출고 추이</CardTitle>
          <CardDescription>월 클릭 시 해당 월 품목 목록으로 이동합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyChart competitorId={id} data={detail.monthly_trend} />
        </CardContent>
      </Card>

      {/* 탭: 월별/연도별 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">출고 이력</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">월별 보기</TabsTrigger>
              <TabsTrigger value="yearly">연도별 보기</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="mb-4 flex items-center gap-3">
                <Select
                  value={String(selectedYear)}
                  onValueChange={(v) => setSelectedYear(Number(v))}
                  className="w-32"
                >
                  {availableYears.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}년
                    </SelectItem>
                  ))}
                </Select>
                <span className="text-sm text-gray-500">
                  {selectedYear}년 품목 목록
                </span>
              </div>
              {loadingProducts ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : products?.items ? (
                <RegistrationsTable products={products.items} />
              ) : null}
            </TabsContent>

            <TabsContent value="yearly">
              <div className="space-y-2">
                {yearly?.map((y) => (
                  <div
                    key={y.year}
                    className="flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 hover:bg-gray-50"
                    onClick={() =>
                      router.push(`/competitors/${id}/products?period=yearly&year=${y.year}`)
                    }
                  >
                    <span className="font-medium text-gray-800">{y.year}년</span>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(y.count / 200) * 120}px`,
                          backgroundColor: color,
                          opacity: 0.7,
                        }}
                      />
                      <Badge variant="secondary">{formatNumber(y.count)}건</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

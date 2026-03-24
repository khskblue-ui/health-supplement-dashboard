'use client';

import React, { useState } from 'react';
import { AlertCircle, BarChart2, TrendingUp } from 'lucide-react';
import { useAnalysis } from '@/hooks/use-queries';
import { ProductionChart } from '@/components/analysis/production-chart';
import { TrendChart } from '@/components/analysis/trend-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { COMPETITOR_COLORS } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

function AnalysisSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent><Skeleton className="h-72 w-full" /></CardContent>
      </Card>
    </div>
  );
}

export default function AnalysisPage() {
  const { data, isLoading, isError } = useAnalysis();
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  if (isLoading) return <AnalysisSkeleton />;

  if (isError || !data) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const availableYears = data.production_by_year.map((d) => d.year);
  const selectedProduction = data.production_by_year.find((d) => d.year === selectedYear);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">시장 분석</h1>
        <p className="mt-1 text-sm text-gray-500">
          연간 생산량 비교 및 품목유형별 트렌드를 분석합니다.
        </p>
      </div>

      <Tabs defaultValue="production">
        <TabsList>
          <TabsTrigger value="production" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            연간 생산량 비교
          </TabsTrigger>
          <TabsTrigger value="trend" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            품목유형 트렌드
          </TabsTrigger>
        </TabsList>

        {/* 탭 1: 연간 생산량 비교 */}
        <TabsContent value="production" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">연간 생산량 비교</CardTitle>
                  <CardDescription>4개사 연도별 생산량(kg) 수평 바 차트</CardDescription>
                </div>
                <Select
                  value={String(selectedYear)}
                  onValueChange={(v) => setSelectedYear(Number(v))}
                  className="w-28"
                >
                  {availableYears.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}년
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProduction ? (
                <ProductionChart data={selectedProduction} />
              ) : (
                <p className="py-8 text-center text-gray-400">해당 연도 데이터가 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* 수치 요약 테이블 */}
          {selectedProduction && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">{selectedYear}년 생산량 요약</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProduction.competitors
                    .sort((a, b) => b.production_kg - a.production_kg)
                    .map((c, idx) => {
                      const color = COMPETITOR_COLORS[c.id] ?? '#6B7280';
                      const maxKg = Math.max(...selectedProduction.competitors.map((x) => x.production_kg));
                      const pct = (c.production_kg / maxKg) * 100;
                      return (
                        <div key={c.id} className="flex items-center gap-3">
                          <span className="w-5 text-sm font-bold text-gray-400">#{idx + 1}</span>
                          <span className="w-24 text-sm font-medium text-gray-800">{c.name}</span>
                          <div className="flex-1">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color,
                                opacity: 0.8,
                              }}
                            />
                          </div>
                          <span className="w-32 text-right text-sm text-gray-600">
                            {formatNumber(c.production_kg)} kg
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 탭 2: 품목유형 트렌드 */}
        <TabsContent value="trend" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">품목유형별 트렌드</CardTitle>
              <CardDescription>월별 품목유형 신고 건수 추이 (최근 12개월)</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={data.trend_data} productTypes={data.product_types} />
            </CardContent>
          </Card>

          {/* 범례 설명 */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                {data.product_types.map((type) => {
                  const colors: Record<string, string> = {
                    비타민: '#3B82F6',
                    프로바이오틱스: '#22C55E',
                    오메가3: '#F97316',
                    홍삼: '#A855F7',
                    미네랄: '#EC4899',
                  };
                  const c = colors[type] ?? '#6B7280';
                  const latestValue = data.trend_data[data.trend_data.length - 1]?.[type];
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: c }}
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                      {latestValue !== undefined && (
                        <span className="text-xs text-gray-400">({latestValue}건)</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

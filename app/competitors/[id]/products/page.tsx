'use client';

import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useCompetitorProducts } from '@/hooks/use-queries';
import { RegistrationsTable } from '@/components/competitors/registrations-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { COMPETITOR_COLORS } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

const MONTH_NAMES = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

export default function CompetitorProductsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(params.id);

  const initialPeriod = (searchParams.get('period') as 'monthly' | 'yearly') || 'monthly';
  const initialYear = Number(searchParams.get('year') || 2025);
  const initialMonth = Number(searchParams.get('month') || 1);

  const [period, setPeriod] = useState<'monthly' | 'yearly'>(initialPeriod);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const color = COMPETITOR_COLORS[id] ?? '#3B82F6';

  const { data, isLoading, isError } = useCompetitorProducts(id, {
    period,
    year,
    month: period === 'monthly' ? month : undefined,
  });

  const availableYears = [2022, 2023, 2024, 2025];

  const periodLabel =
    period === 'monthly'
      ? `${year}년 ${MONTH_NAMES[month - 1]}`
      : `${year}년`;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/competitors/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h1 className="text-xl font-bold text-gray-900">품목 드릴다운</h1>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">{periodLabel} 출고 품목 목록</p>
        </div>
      </div>

      {/* 필터 컨트롤 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* 기간 토글 */}
            <div className="flex overflow-hidden rounded-md border">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  period === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setPeriod('monthly')}
              >
                월별
              </button>
              <button
                className={`border-l px-4 py-2 text-sm font-medium transition-colors ${
                  period === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setPeriod('yearly')}
              >
                연도별
              </button>
            </div>

            {/* 연도 선택 */}
            <Select
              value={String(year)}
              onValueChange={(v) => setYear(Number(v))}
              className="w-28"
            >
              {availableYears.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}년
                </SelectItem>
              ))}
            </Select>

            {/* 월 선택 (월별일 때만) */}
            {period === 'monthly' && (
              <Select
                value={String(month)}
                onValueChange={(v) => setMonth(Number(v))}
                className="w-24"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <SelectItem key={idx + 1} value={String(idx + 1)}>
                    {name}
                  </SelectItem>
                ))}
              </Select>
            )}

            {/* 결과 수 뱃지 */}
            {data && (
              <Badge variant="secondary" className="ml-auto">
                {formatNumber(data.total)}건
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{periodLabel} 출고 품목</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>데이터를 불러올 수 없습니다.</p>
            </div>
          ) : data?.items.length === 0 ? (
            <p className="py-8 text-center text-gray-400">해당 기간에 출고된 품목이 없습니다.</p>
          ) : (
            <RegistrationsTable products={data?.items ?? []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

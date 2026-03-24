'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { MonthlyRegistration, COMPETITOR_COLORS } from '@/lib/types';
import { getMonthLabel } from '@/lib/utils';

interface MonthlyChartProps {
  competitorId: number;
  data: MonthlyRegistration[];
}

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-blue-600">{payload[0]?.value}건</p>
    </div>
  );
}

export function MonthlyChart({ competitorId, data }: MonthlyChartProps) {
  const router = useRouter();
  const color = COMPETITOR_COLORS[competitorId] ?? '#3B82F6';

  const chartData = data.map((d) => ({
    name: getMonthLabel(d.year_month),
    year_month: d.year_month,
    count: d.count,
  }));

  const handleBarClick = (entry: { year_month?: string }) => {
    if (!entry?.year_month) return;
    const [year, month] = entry.year_month.split('-');
    router.push(
      `/competitors/${competitorId}/products?period=monthly&year=${year}&month=${parseInt(month ?? '1', 10)}`
    );
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={chartData}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        onClick={(e) => {
          if (e?.activePayload?.[0]) {
            const payload = e.activePayload[0].payload as { year_month?: string };
            handleBarClick(payload);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={color}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

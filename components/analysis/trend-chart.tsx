'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendDataPoint } from '@/lib/types';
import { getMonthLabel } from '@/lib/utils';

interface TrendChartProps {
  data: TrendDataPoint[];
  productTypes: string[];
}

const TYPE_COLORS: Record<string, string> = {
  비타민: '#3B82F6',
  프로바이오틱스: '#22C55E',
  오메가3: '#F97316',
  홍삼: '#A855F7',
  미네랄: '#EC4899',
};

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm min-w-[140px]">
      <p className="mb-1 font-medium text-gray-700">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <span style={{ color: p.color }}>{p.dataKey}</span>
          <span className="font-medium text-gray-800">{p.value}건</span>
        </div>
      ))}
    </div>
  );
}

export function TrendChart({ data, productTypes }: TrendChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    name: getMonthLabel(d.year_month),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }}
        />
        {productTypes.map((type) => (
          <Line
            key={type}
            type="monotone"
            dataKey={type}
            stroke={TYPE_COLORS[type] ?? '#6B7280'}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

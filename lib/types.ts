export interface Competitor {
  id: number;
  name: string;
  name_short: string;
}

export interface ProductRegistration {
  id: number;
  competitor_id: number;
  product_name: string;
  report_date: string; // YYYY-MM-DD
  change_date: string;
  functionality: string;
  raw_material: string;
  traceability_registered: boolean;
  source_api: string;
}

export interface DashboardCompetitor {
  id: number;
  name: string;
  recent_count: number; // 최근 30일 신고 건수
  last_7_days_count: number;
  latest_products: ProductRegistration[];
}

export interface DashboardData {
  competitors: DashboardCompetitor[];
}

export interface MonthlyRegistration {
  year_month: string; // "2025-01"
  count: number;
}

export interface CompetitorDetail {
  id: number;
  name: string;
  name_short: string;
  total_registrations: number;
  monthly_trend: MonthlyRegistration[];
}

export interface ProductsResponse {
  competitor_id: number;
  period: 'monthly' | 'yearly';
  year?: number;
  month?: number;
  total: number;
  products: ProductRegistration[];
}

export interface YearlyRegistration {
  year: number;
  count: number;
}

export type CompetitorYearlySummary = YearlyRegistration[];

export interface ProductionData {
  year: number;
  competitor_id: number;
  competitor_name: string;
  production_kg: number;
}

export interface ProductionByYear {
  year: number;
  competitors: Array<{
    id: number;
    name: string;
    production_kg: number;
  }>;
}

export interface TrendDataPoint {
  year_month: string;
  [productType: string]: string | number;
}

export interface AnalysisData {
  production_by_year: ProductionByYear[];
  trend_data: TrendDataPoint[];
  product_types: string[];
}

export const COMPETITOR_COLORS: Record<number, string> = {
  1: '#3B82F6', // blue
  2: '#22C55E', // green
  3: '#F97316', // orange
  4: '#A855F7', // purple
};

export const COMPETITOR_BG_COLORS: Record<number, string> = {
  1: 'bg-blue-100 text-blue-800',
  2: 'bg-green-100 text-green-800',
  3: 'bg-orange-100 text-orange-800',
  4: 'bg-purple-100 text-purple-800',
};

export const COMPETITOR_BORDER_COLORS: Record<number, string> = {
  1: 'border-blue-400',
  2: 'border-green-400',
  3: 'border-orange-400',
  4: 'border-purple-400',
};

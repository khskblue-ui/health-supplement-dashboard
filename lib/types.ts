export interface Competitor {
  id: number;
  name: string;
  name_short: string;
  total_registrations?: number;
  created_at?: string;
}

// I0320 이력추적관리 등록현황 필드
export interface ProductRegistration {
  id: number;
  competitor_id: number;
  prdlst_report_no: string;
  product_name: string | null;
  product_type: string | null;   // PDT_TYPE (비타민D 등)
  food_type: string | null;      // 건기 / 식품
  btype: string | null;          // 건강기능식품전문제조업 등
  brnch_nm: string | null;       // 공장명
  mnft_day: string | null;       // YYYYMMDD 제조일
  crcl_prd: string | null;       // YYYYMMDD 유통기한
  mod_dt: string | null;         // YYYYMMDD 수정일 (월별 집계 기준)
  reg_num: string | null;
  food_histrace_num: string | null;
  barcode: string | null;
  source_api: string;
  collected_at: string;
}

export interface DashboardCompetitor {
  id: number;
  name: string;
  name_short: string;
  recent_count: number;
  last_7_days_count: number;
  latest_products: ProductRegistration[];
}

export interface DashboardData {
  competitors: DashboardCompetitor[];
  as_of: string;
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
  created_at: string;
}

export interface RegistrationsResponse {
  total: number;
  page: number;
  size: number;
  items: ProductRegistration[];
}

export interface YearlyRegistration {
  year: number;
  count: number;
}

export type CompetitorYearlySummary = YearlyRegistration[];

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

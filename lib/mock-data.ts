import {
  DashboardData,
  CompetitorDetail,
  ProductsResponse,
  AnalysisData,
  CompetitorYearlySummary,
} from './types';

export const MOCK_DASHBOARD: DashboardData = {
  competitors: [
    {
      id: 1,
      name: '(주)한국건강',
      recent_count: 12,
      last_7_days_count: 3,
      latest_products: [
        {
          id: 101,
          competitor_id: 1,
          product_name: '프로바이오틱스 골드',
          report_date: '2026-03-20',
          change_date: '2026-03-20',
          functionality: '장 건강 개선',
          raw_material: '유산균 혼합물',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 102,
          competitor_id: 1,
          product_name: '오메가3 프리미엄',
          report_date: '2026-03-18',
          change_date: '2026-03-18',
          functionality: '혈행 개선',
          raw_material: '정제 어유',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 103,
          competitor_id: 1,
          product_name: '루테인 아이케어',
          report_date: '2026-03-15',
          change_date: '2026-03-15',
          functionality: '눈 건강 개선',
          raw_material: '루테인 추출물',
          traceability_registered: false,
          source_api: 'mfds',
        },
      ],
    },
    {
      id: 2,
      name: '(주)웰니스코리아',
      recent_count: 8,
      last_7_days_count: 1,
      latest_products: [
        {
          id: 201,
          competitor_id: 2,
          product_name: '비타민C 2000',
          report_date: '2026-03-22',
          change_date: '2026-03-22',
          functionality: '항산화, 피부 건강',
          raw_material: '아스코르빈산',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 202,
          competitor_id: 2,
          product_name: '마그네슘 컴플렉스',
          report_date: '2026-03-19',
          change_date: '2026-03-19',
          functionality: '근육 이완, 수면 개선',
          raw_material: '산화마그네슘',
          traceability_registered: false,
          source_api: 'mfds',
        },
        {
          id: 203,
          competitor_id: 2,
          product_name: '콜라겐 펩타이드',
          report_date: '2026-03-14',
          change_date: '2026-03-14',
          functionality: '피부 건강',
          raw_material: '가수분해 콜라겐',
          traceability_registered: true,
          source_api: 'mfds',
        },
      ],
    },
    {
      id: 3,
      name: '(주)네이처랩',
      recent_count: 15,
      last_7_days_count: 5,
      latest_products: [
        {
          id: 301,
          competitor_id: 3,
          product_name: '홍삼 에너지',
          report_date: '2026-03-23',
          change_date: '2026-03-23',
          functionality: '면역력 증진, 피로 개선',
          raw_material: '홍삼 추출물',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 302,
          competitor_id: 3,
          product_name: '가르시니아 슬림',
          report_date: '2026-03-21',
          change_date: '2026-03-21',
          functionality: '체지방 감소',
          raw_material: '가르시니아캄보지아 추출물',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 303,
          competitor_id: 3,
          product_name: '아연 이뮨',
          report_date: '2026-03-17',
          change_date: '2026-03-17',
          functionality: '면역 기능',
          raw_material: '산화아연',
          traceability_registered: false,
          source_api: 'mfds',
        },
      ],
    },
    {
      id: 4,
      name: '(주)바이오헬스',
      recent_count: 6,
      last_7_days_count: 2,
      latest_products: [
        {
          id: 401,
          competitor_id: 4,
          product_name: 'NAD+ 부스터',
          report_date: '2026-03-21',
          change_date: '2026-03-21',
          functionality: '세포 에너지',
          raw_material: 'NMN',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 402,
          competitor_id: 4,
          product_name: '코엔자임Q10',
          report_date: '2026-03-16',
          change_date: '2026-03-16',
          functionality: '항산화',
          raw_material: '코엔자임Q10',
          traceability_registered: true,
          source_api: 'mfds',
        },
        {
          id: 403,
          competitor_id: 4,
          product_name: '밀크씨슬 간건강',
          report_date: '2026-03-10',
          change_date: '2026-03-10',
          functionality: '간 건강',
          raw_material: '밀크씨슬 추출물',
          traceability_registered: false,
          source_api: 'mfds',
        },
      ],
    },
  ],
};

export const MOCK_COMPETITOR_DETAILS: Record<number, CompetitorDetail> = {
  1: {
    id: 1,
    name: '(주)한국건강',
    name_short: '한국건강',
    total_registrations: 142,
    monthly_trend: [
      { year_month: '2025-04', count: 8 },
      { year_month: '2025-05', count: 11 },
      { year_month: '2025-06', count: 7 },
      { year_month: '2025-07', count: 13 },
      { year_month: '2025-08', count: 9 },
      { year_month: '2025-09', count: 14 },
      { year_month: '2025-10', count: 10 },
      { year_month: '2025-11', count: 12 },
      { year_month: '2025-12', count: 16 },
      { year_month: '2026-01', count: 11 },
      { year_month: '2026-02', count: 9 },
      { year_month: '2026-03', count: 12 },
    ],
  },
  2: {
    id: 2,
    name: '(주)웰니스코리아',
    name_short: '웰니스코리아',
    total_registrations: 98,
    monthly_trend: [
      { year_month: '2025-04', count: 5 },
      { year_month: '2025-05', count: 7 },
      { year_month: '2025-06', count: 4 },
      { year_month: '2025-07', count: 9 },
      { year_month: '2025-08', count: 6 },
      { year_month: '2025-09', count: 8 },
      { year_month: '2025-10', count: 5 },
      { year_month: '2025-11', count: 7 },
      { year_month: '2025-12', count: 10 },
      { year_month: '2026-01', count: 6 },
      { year_month: '2026-02', count: 5 },
      { year_month: '2026-03', count: 8 },
    ],
  },
  3: {
    id: 3,
    name: '(주)네이처랩',
    name_short: '네이처랩',
    total_registrations: 187,
    monthly_trend: [
      { year_month: '2025-04', count: 12 },
      { year_month: '2025-05', count: 15 },
      { year_month: '2025-06', count: 11 },
      { year_month: '2025-07', count: 18 },
      { year_month: '2025-08', count: 14 },
      { year_month: '2025-09', count: 16 },
      { year_month: '2025-10', count: 13 },
      { year_month: '2025-11', count: 17 },
      { year_month: '2025-12', count: 20 },
      { year_month: '2026-01', count: 14 },
      { year_month: '2026-02', count: 12 },
      { year_month: '2026-03', count: 15 },
    ],
  },
  4: {
    id: 4,
    name: '(주)바이오헬스',
    name_short: '바이오헬스',
    total_registrations: 76,
    monthly_trend: [
      { year_month: '2025-04', count: 4 },
      { year_month: '2025-05', count: 6 },
      { year_month: '2025-06', count: 3 },
      { year_month: '2025-07', count: 7 },
      { year_month: '2025-08', count: 5 },
      { year_month: '2025-09', count: 6 },
      { year_month: '2025-10', count: 4 },
      { year_month: '2025-11', count: 5 },
      { year_month: '2025-12', count: 8 },
      { year_month: '2026-01', count: 5 },
      { year_month: '2026-02', count: 4 },
      { year_month: '2026-03', count: 6 },
    ],
  },
};

function generateProducts(competitorId: number, count: number) {
  const functionalities = [
    '장 건강 개선', '혈행 개선', '눈 건강', '면역 기능', '피부 건강',
    '피로 개선', '체지방 감소', '항산화', '간 건강', '뼈 건강',
    '혈당 조절', '혈압 조절', '기억력 개선', '관절 건강', '수면 개선',
  ];
  const materials = [
    '유산균 혼합물', '정제 어유', '루테인 추출물', '아스코르빈산', '산화마그네슘',
    '홍삼 추출물', '가르시니아캄보지아 추출물', 'NMN', '코엔자임Q10', '밀크씨슬 추출물',
    '비타민D3', '아연', '셀레늄', '알파리포산', '레스베라트롤',
  ];
  const prefixes = ['프리미엄', '골드', '플러스', '에이스', '슈퍼', '퓨어', '네이처', '바이오', '헬스', '케어'];
  const suffixes = ['포뮬라', '컴플렉스', '부스터', '에센스', '캡슐', '정', '액', '파우더'];

  const products = [];
  const baseDate = new Date('2026-03-24');

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date(baseDate);
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toISOString().split('T')[0] as string;
    const func = functionalities[i % functionalities.length] as string;
    const mat = materials[i % materials.length] as string;
    const prefix = prefixes[Math.floor(i / 3) % prefixes.length] as string;
    const suffix = suffixes[i % suffixes.length] as string;

    products.push({
      id: competitorId * 1000 + i,
      competitor_id: competitorId,
      product_name: `${prefix} ${func.split(' ')[0]} ${suffix}`,
      report_date: dateStr,
      change_date: dateStr,
      functionality: func,
      raw_material: mat,
      traceability_registered: i % 3 !== 0,
      source_api: 'mfds',
    });
  }
  return products.sort((a, b) => b.report_date.localeCompare(a.report_date));
}

export const MOCK_PRODUCTS: Record<number, ProductsResponse> = {
  1: {
    competitor_id: 1,
    period: 'monthly',
    total: 142,
    products: generateProducts(1, 142),
  },
  2: {
    competitor_id: 2,
    period: 'monthly',
    total: 98,
    products: generateProducts(2, 98),
  },
  3: {
    competitor_id: 3,
    period: 'monthly',
    total: 187,
    products: generateProducts(3, 187),
  },
  4: {
    competitor_id: 4,
    period: 'monthly',
    total: 76,
    products: generateProducts(4, 76),
  },
};

export const MOCK_YEARLY: Record<number, CompetitorYearlySummary> = {
  1: [
    { year: 2022, count: 89 },
    { year: 2023, count: 112 },
    { year: 2024, count: 130 },
    { year: 2025, count: 142 },
  ],
  2: [
    { year: 2022, count: 62 },
    { year: 2023, count: 74 },
    { year: 2024, count: 88 },
    { year: 2025, count: 98 },
  ],
  3: [
    { year: 2022, count: 121 },
    { year: 2023, count: 148 },
    { year: 2024, count: 165 },
    { year: 2025, count: 187 },
  ],
  4: [
    { year: 2022, count: 41 },
    { year: 2023, count: 55 },
    { year: 2024, count: 67 },
    { year: 2025, count: 76 },
  ],
};

export const MOCK_ANALYSIS: AnalysisData = {
  production_by_year: [
    {
      year: 2022,
      competitors: [
        { id: 1, name: '한국건강', production_kg: 1_250_000 },
        { id: 2, name: '웰니스코리아', production_kg: 870_000 },
        { id: 3, name: '네이처랩', production_kg: 1_580_000 },
        { id: 4, name: '바이오헬스', production_kg: 420_000 },
      ],
    },
    {
      year: 2023,
      competitors: [
        { id: 1, name: '한국건강', production_kg: 1_410_000 },
        { id: 2, name: '웰니스코리아', production_kg: 950_000 },
        { id: 3, name: '네이처랩', production_kg: 1_720_000 },
        { id: 4, name: '바이오헬스', production_kg: 510_000 },
      ],
    },
    {
      year: 2024,
      competitors: [
        { id: 1, name: '한국건강', production_kg: 1_580_000 },
        { id: 2, name: '웰니스코리아', production_kg: 1_080_000 },
        { id: 3, name: '네이처랩', production_kg: 1_950_000 },
        { id: 4, name: '바이오헬스', production_kg: 640_000 },
      ],
    },
    {
      year: 2025,
      competitors: [
        { id: 1, name: '한국건강', production_kg: 1_720_000 },
        { id: 2, name: '웰니스코리아', production_kg: 1_150_000 },
        { id: 3, name: '네이처랩', production_kg: 2_100_000 },
        { id: 4, name: '바이오헬스', production_kg: 780_000 },
      ],
    },
  ],
  trend_data: [
    { year_month: '2025-01', 비타민: 45, 프로바이오틱스: 32, 오메가3: 28, 홍삼: 22, 미네랄: 18 },
    { year_month: '2025-02', 비타민: 48, 프로바이오틱스: 35, 오메가3: 30, 홍삼: 25, 미네랄: 20 },
    { year_month: '2025-03', 비타민: 52, 프로바이오틱스: 38, 오메가3: 32, 홍삼: 28, 미네랄: 22 },
    { year_month: '2025-04', 비타민: 50, 프로바이오틱스: 36, 오메가3: 29, 홍삼: 24, 미네랄: 19 },
    { year_month: '2025-05', 비타민: 55, 프로바이오틱스: 40, 오메가3: 33, 홍삼: 20, 미네랄: 24 },
    { year_month: '2025-06', 비타민: 58, 프로바이오틱스: 42, 오메가3: 35, 홍삼: 18, 미네랄: 26 },
    { year_month: '2025-07', 비타민: 60, 프로바이오틱스: 44, 오메가3: 36, 홍삼: 16, 미네랄: 28 },
    { year_month: '2025-08', 비타민: 57, 프로바이오틱스: 41, 오메가3: 34, 홍삼: 18, 미네랄: 25 },
    { year_month: '2025-09', 비타민: 54, 프로바이오틱스: 39, 오메가3: 31, 홍삼: 22, 미네랄: 23 },
    { year_month: '2025-10', 비타민: 56, 프로바이오틱스: 43, 오메가3: 33, 홍삼: 28, 미네랄: 21 },
    { year_month: '2025-11', 비타민: 59, 프로바이오틱스: 46, 오메가3: 35, 홍삼: 32, 미네랄: 24 },
    { year_month: '2025-12', 비타민: 62, 프로바이오틱스: 48, 오메가3: 37, 홍삼: 38, 미네랄: 27 },
  ],
  product_types: ['비타민', '프로바이오틱스', '오메가3', '홍삼', '미네랄'],
};

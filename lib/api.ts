import {
  Competitor,
  DashboardData,
  CompetitorDetail,
  RegistrationsResponse,
  YearlyRegistration,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getCompetitors(): Promise<Competitor[]> {
  return fetchAPI<Competitor[]>('/api/competitors');
}

export async function getDashboard(): Promise<DashboardData> {
  return fetchAPI<DashboardData>('/api/dashboard/recent');
}

export async function getCompetitorDetail(id: number): Promise<CompetitorDetail> {
  return fetchAPI<CompetitorDetail>(`/api/competitors/${id}`);
}

export async function getCompetitorRegistrations(
  id: number,
  params: {
    period?: 'monthly' | 'yearly';
    year?: number;
    month?: number;
    page?: number;
    size?: number;
  } = {}
): Promise<RegistrationsResponse> {
  const qs = new URLSearchParams();
  if (params.period) qs.set('period', params.period);
  if (params.year) qs.set('year', String(params.year));
  if (params.month) qs.set('month', String(params.month));
  if (params.page) qs.set('page', String(params.page));
  if (params.size) qs.set('size', String(params.size));
  const query = qs.toString();
  return fetchAPI<RegistrationsResponse>(`/api/competitors/${id}/registrations${query ? `?${query}` : ''}`);
}

export async function getCompetitorYearly(id: number): Promise<YearlyRegistration[]> {
  return fetchAPI<YearlyRegistration[]>(`/api/competitors/${id}/yearly`);
}

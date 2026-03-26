'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getCompetitors,
  getDashboard,
  getCompetitorDetail,
  getCompetitorRegistrations,
  getCompetitorYearly,
} from '@/lib/api';

export function useCompetitors() {
  return useQuery({
    queryKey: ['competitors'],
    queryFn: () => getCompetitors(),
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
  });
}

export function useCompetitorDetail(id: number) {
  return useQuery({
    queryKey: ['competitor', id],
    queryFn: () => getCompetitorDetail(id),
    enabled: !!id,
  });
}

export function useCompetitorProducts(
  id: number,
  params: {
    period?: 'monthly' | 'yearly';
    year?: number;
    month?: number;
  } = {}
) {
  return useQuery({
    queryKey: ['competitor-registrations', id, params],
    queryFn: () => getCompetitorRegistrations(id, params),
    enabled: !!id,
  });
}

export function useCompetitorYearly(id: number) {
  return useQuery({
    queryKey: ['competitor-yearly', id],
    queryFn: () => getCompetitorYearly(id),
    enabled: !!id,
  });
}

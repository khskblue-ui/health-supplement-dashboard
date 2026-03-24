import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateKo(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
  } catch {
    return dateStr;
  }
}

export function formatYearMonth(yearMonth: string): string {
  try {
    const [year, month] = yearMonth.split('-');
    return `${year}년 ${month}월`;
  } catch {
    return yearMonth;
  }
}

export function formatYearMonthShort(yearMonth: string): string {
  try {
    const date = parseISO(`${yearMonth}-01`);
    return format(date, 'MMM', { locale: ko });
  } catch {
    return yearMonth;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

export function formatKg(kg: number): string {
  if (kg >= 1_000_000) {
    return `${(kg / 1_000_000).toFixed(1)}톤`;
  }
  if (kg >= 1_000) {
    return `${(kg / 1_000).toFixed(1)}kg (천)`;
  }
  return `${formatNumber(kg)}kg`;
}

export function getMonthLabel(yearMonth: string): string {
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  try {
    const month = parseInt(yearMonth.split('-')[1], 10);
    return monthNames[month - 1] ?? yearMonth;
  } catch {
    return yearMonth;
  }
}

export function getLast12Months(): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    months.push(`${y}-${m}`);
  }
  return months;
}

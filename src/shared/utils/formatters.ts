import { format } from 'date-fns';

export const formatDate = (value: Date | string | null | undefined): string => {
  if (!value) return '-';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : format(date, 'MMM dd, yyyy');
};

export const formatCurrency = (value: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

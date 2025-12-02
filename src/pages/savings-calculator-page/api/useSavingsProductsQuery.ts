import { getSavingsProducts } from 'api/savings-products';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'pages/savings-calculator-page/constants/queryKeys';
import { SavingsProduct, SavingsProductFilters } from '../types/savings-products';

export type ProductComparator = (a: SavingsProduct, b: SavingsProduct) => number;

// 재사용 가능한 정렬 함수 (안정적인 참조)
export const orderByHighestRate: ProductComparator = (a, b) => b.annualRate - a.annualRate;
export const orderByLowestRate: ProductComparator = (a, b) => a.annualRate - b.annualRate;

// 필터링/정렬/제한 적용 훅
interface UseSavingsProductsQueryOptions {
  filters?: SavingsProductFilters;
  orderBy?: ProductComparator;
  limit?: number;
}

export function useSavingsProductsQuery({ filters, orderBy, limit }: UseSavingsProductsQueryOptions) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SAVINGS_PRODUCTS] as const,
    queryFn: getSavingsProducts,
    select: products => {
      let result = products;

      // 필터링
      if (filters?.term != null) {
        result = result.filter(p => p.availableTerms === filters.term);
      }
      if (filters?.monthlyAmount != null) {
        result = result.filter(
          p => filters.monthlyAmount! >= p.minMonthlyAmount && filters.monthlyAmount! <= p.maxMonthlyAmount
        );
      }

      // 정렬
      if (orderBy) {
        result = [...result].sort(orderBy);
      }

      // 제한
      if (limit) {
        result = result.slice(0, limit);
      }

      return result;
    },
  });
}

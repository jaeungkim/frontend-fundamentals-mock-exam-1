import { getSavingsProducts } from 'api/savings-products';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useSavingsProductsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.SAVINGS_PRODUCTS],
    queryFn: getSavingsProducts,
  });
}

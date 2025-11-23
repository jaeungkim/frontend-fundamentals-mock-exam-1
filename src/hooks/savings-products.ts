import { getSavingsProducts } from 'api/savings-products';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useSavingsProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.SAVINGS_PRODUCTS],
    queryFn: getSavingsProducts,
  });
}

import { http, isHttpError } from 'tosslib';
import { SavingsProduct } from 'types/savings-products';

// GET /api/savings-products
export async function getSavingsProducts(): Promise<SavingsProduct[]> {
  try {
    const response = await http.get<SavingsProduct[]>('/api/savings-products');
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      throw new Error(`적금 상품을 불러오는데 실패했습니다: ${error.message}`);
    }
    throw error;
  }
}

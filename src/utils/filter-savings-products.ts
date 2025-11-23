import { SavingsProduct, SavingsProductFilters } from 'types/savings-products';

export function filterSavingsProducts(products: SavingsProduct[], filters: SavingsProductFilters): SavingsProduct[] {
  return products.filter(product => {
    // 저축 기간 필터
    if (filters.term && product.availableTerms !== filters.term) {
      return false;
    }

    // 월 납입액 필터 (상품의 범위 내에 있는지 확인)
    if (filters.monthlyAmount) {
      if (filters.monthlyAmount < product.minMonthlyAmount || filters.monthlyAmount > product.maxMonthlyAmount) {
        return false;
      }
    }

    return true;
  });
}

import SavingsCalculationResults from 'components/savings-products/SavingsCalculationResults';
import SavingsCalculatorsInputs from 'components/savings-products/SavingsCalculatorsFilters';
import SavingsProductsList from 'components/savings-products/SavingsProductsList';
import { useSavingsProductsQuery } from 'hooks/useSavingsProductsQuery';
import { useMemo, useState } from 'react';
import { useSelectedProductStore } from 'stores/useSelectedProductStore';
import { Border, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProductFilters } from 'types/savings-products';
import { SavingsProductTabs } from 'types/savings-products-tab';
import { filterSavingsProducts } from 'utils/filter-savings-products';

export function SavingsCalculatorPage() {
  const [activeTab, setActiveTab] = useState<SavingsProductTabs>('products');

  const [filters, setFilters] = useState<SavingsProductFilters>({
    targetAmount: undefined,
    monthlyAmount: undefined,
    term: undefined,
  });

  const selectedProduct = useSelectedProductStore(state => state.selectedProduct);
  // 1. 적금 상품 목록 연동하기 - 서버에서 적금 상품 목록을 불러와서 출력해주세요.
  const {
    data: savingsProducts,
    isLoading: isLoadingSavingsProducts,
    isError: isErrorSavingsProducts,
    error: errorSavingsProducts,
  } = useSavingsProductsQuery();

  // 필터링된 상품 목록 (메모이제이션)
  const filteredProducts = useMemo(() => {
    if (!savingsProducts) {
      return [];
    }
    return filterSavingsProducts(savingsProducts, filters);
  }, [savingsProducts, filters]);

  const handleTabChange = (value: SavingsProductTabs) => {
    setActiveTab(value);
  };

  if (isLoadingSavingsProducts) {
    return <div>Loading...</div>;
  }

  if (isErrorSavingsProducts) {
    return <div>Error: {errorSavingsProducts?.message || '알 수 없는 오류가 발생했습니다.'}</div>;
  }

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsCalculatorsInputs filters={filters} onFiltersChange={setFilters} />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={value => handleTabChange(value as SavingsProductTabs)}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' && <SavingsProductsList filteredProducts={filteredProducts} />}

      {/* 아래는 계산 결과 탭 내용이에요. 계산 결과 탭을 구현할 때 주석을 해제해주세요. */}
      <Spacing size={8} />

      {activeTab === 'results' && selectedProduct && (
        <SavingsCalculationResults filteredProducts={filteredProducts} filters={filters} />
      )}

      {activeTab === 'results' && !selectedProduct && (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}
    </>
  );
}

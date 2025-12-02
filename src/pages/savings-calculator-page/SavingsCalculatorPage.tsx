import SavingsCalculationResults from './components/SavingsCalculationResults';
import { Suspense, useState } from 'react';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct, SavingsProductFilters } from 'pages/savings-calculator-page/types/savings-products';
import { SavingsProductTabs } from 'pages/savings-calculator-page/types/savings-products-tab';
import { SavingsProductsList } from './components/SavingsProductsList';
import AmountInput from 'components/AmountInput';
import TermSelect from 'components/TermSelect';

export function SavingsCalculatorPage() {
  const [activeTab, setActiveTab] = useState<SavingsProductTabs>('products');
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);

  const [filters, setFilters] = useState<SavingsProductFilters>({
    targetAmount: undefined,
    monthlyAmount: undefined,
    term: undefined,
  });

  const handleTabChange = (value: SavingsProductTabs) => {
    setActiveTab(value);
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <AmountInput
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        value={filters.targetAmount}
        onChange={targetAmount => setFilters({ ...filters, targetAmount })}
      />

      <Spacing size={16} />

      <AmountInput
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        value={filters.monthlyAmount}
        onChange={monthlyAmount => setFilters({ ...filters, monthlyAmount })}
      />

      <Spacing size={16} />

      <TermSelect value={filters.term} onChange={term => setFilters({ ...filters, term })} />

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

      <Suspense fallback={<SavingsProductsList.Loading />}>
        {activeTab === 'products' && (
          <SavingsProductsList
            filters={filters}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        )}

        <Spacing size={8} />

        {activeTab === 'results' && selectedProduct && (
          <SavingsCalculationResults filters={filters} selectedProduct={selectedProduct} />
        )}

        {activeTab === 'results' && !selectedProduct && <SavingsProductsList.SelectPrompt />}
      </Suspense>
    </>
  );
}

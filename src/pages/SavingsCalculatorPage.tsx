import SavingsCalculatorsInputs from 'components/savings-products/SavingsCalculatorsInputs';
import SavingsProductsListItem from 'components/savings-products/SavingsProductsListItem';
import { useSavingsProducts } from 'hooks/savings-products';
import { useMemo, useState } from 'react';
import { Border, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProductFilters } from 'types/savings-products';
import { filterSavingsProducts } from 'utils/filter-savings-products';

export function SavingsCalculatorPage() {
  // 1. 적금 상품 목록 연동하기 - 서버에서 적금 상품 목록을 불러와서 출력해주세요.
  const {
    data: savingsProducts,
    isLoading: isLoadingSavingsProducts,
    isError: isErrorSavingsProducts,
    error: errorSavingsProducts,
  } = useSavingsProducts();

  const [filters, setFilters] = useState<SavingsProductFilters>({
    targetAmount: undefined,
    monthlyAmount: undefined,
    term: undefined,
  });

  // 필터링된 상품 목록 (메모이제이션)
  const filteredProducts = useMemo(() => {
    if (!savingsProducts) {
      return [];
    }
    return filterSavingsProducts(savingsProducts, filters);
  }, [savingsProducts, filters]);

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

      <Tab onChange={() => {}}>
        <Tab.Item value="products" selected={true}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={false}>
          계산 결과
        </Tab.Item>
      </Tab>

      {filteredProducts.length > 0 ? (
        filteredProducts.map(savingsProduct => (
          <SavingsProductsListItem key={savingsProduct.id} savingsProduct={savingsProduct} />
        ))
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 찾을 수 없습니다." />} />
      )}

      {/* 아래는 계산 결과 탭 내용이에요. 계산 결과 탭을 구현할 때 주석을 해제해주세요. */}
      {/* <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`1,000,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`-500,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`100,000원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 3.2%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`100,000원 ~ 500,000원 | 12개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'고급 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 2.8%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`50,000원 ~ 1,000,000원 | 24개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />

      <Spacing size={40} /> */}

      {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
      {/* <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} /> */}
    </>
  );
}

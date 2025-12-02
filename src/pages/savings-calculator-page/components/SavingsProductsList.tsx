import { Assets, colors, ListRow } from 'tosslib';
import { ProductComparator, useSavingsProductsQuery } from '../api/useSavingsProductsQuery';
import { SavingsProduct, SavingsProductFilters } from '../types/savings-products';

interface SavingsProductsListProps {
  filters: SavingsProductFilters;
  selectedProduct: SavingsProduct | null;
  onSelectProduct?: (product: SavingsProduct | null) => void;
  orderBy?: ProductComparator;
  limit?: number;
}

export function SavingsProductsList({
  filters,
  selectedProduct,
  onSelectProduct,
  orderBy,
  limit,
}: SavingsProductsListProps) {
  const { data: savingsProducts } = useSavingsProductsQuery({ filters, orderBy, limit });

  if (savingsProducts.length === 0) {
    return <SavingsProductsList.Empty />;
  }

  return savingsProducts.map(savingsProduct => (
    <SavingsProductsList.Item
      key={savingsProduct.id}
      savingsProduct={savingsProduct}
      isSelected={selectedProduct?.id === savingsProduct.id}
      onSelect={onSelectProduct}
    />
  ));
}

// 개별 상품 아이템 컴포넌트
SavingsProductsList.Item = function SavingsProductsListItem({
  savingsProduct,
  isSelected,
  onSelect,
}: {
  savingsProduct: SavingsProduct;
  isSelected: boolean;
  onSelect?: (product: SavingsProduct | null) => void;
}) {
  const handleClick = () => {
    if (!onSelect) {
      return;
    }
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect(savingsProduct);
    }
  };

  return (
    <ListRow
      key={savingsProduct.id}
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={savingsProduct.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${savingsProduct.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${savingsProduct.minMonthlyAmount.toLocaleString()}원 ~ ${savingsProduct.maxMonthlyAmount.toLocaleString()}원 | ${savingsProduct.availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : null}
      onClick={handleClick}
    />
  );
};

// 로딩 상태 컴포넌트
SavingsProductsList.Loading = function SavingsProductsListLoading() {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중..." />} />;
};

// 에러 상태 컴포넌트
SavingsProductsList.Error = function SavingsProductsListError({ message }: { message?: string }) {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top={message || '상품을 불러오는데 실패했습니다.'} />} />;
};

// 빈 상태 컴포넌트
SavingsProductsList.Empty = function SavingsProductsListEmpty() {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
};

// 상품 선택 안내 컴포넌트
SavingsProductsList.SelectPrompt = function SavingsProductsListSelectPrompt() {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
};

export default SavingsProductsList;

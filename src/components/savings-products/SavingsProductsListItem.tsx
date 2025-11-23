import { useSelectedProductStore } from 'stores/useSelectedProductStore';
import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from 'types/savings-products';

interface SavingsProductsListItemProps {
  savingsProduct: SavingsProduct;
}

export default function SavingsProductsListItem({ savingsProduct }: SavingsProductsListItemProps) {
  const selectedProduct = useSelectedProductStore(state => state.selectedProduct);
  const setSelectedProduct = useSelectedProductStore(state => state.setSelectedProduct);

  const isSelected = selectedProduct?.id === savingsProduct.id;

  const handleClick = () => {
    if (isSelected) {
      // 이미 선택된 상품이면 선택 해제
      setSelectedProduct(null);
    } else {
      // 다른 상품 선택
      setSelectedProduct(savingsProduct);
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
}

import { useState } from 'react';
import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from 'types/savings-products';

interface SavingsProductsListItemProps {
  savingsProduct: SavingsProduct;
}

export default function SavingsProductsListItem({ savingsProduct }: SavingsProductsListItemProps) {
  // 3. 적금 상품 목록에서 선택 기능 만들기
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
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

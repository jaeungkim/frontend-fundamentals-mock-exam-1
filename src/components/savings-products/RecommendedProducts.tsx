import { useSelectedProductStore } from 'stores/useSelectedProductStore';
import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from 'types/savings-products';

interface RecommendedProductsProps {
  filteredProducts: SavingsProduct[];
}

export default function RecommendedProducts({ filteredProducts }: RecommendedProductsProps) {
  const selectedProduct = useSelectedProductStore(state => state.selectedProduct);

  // 선택된 상품의 연 이자율을 기준으로 필터링
  const interestRate = selectedProduct?.annualRate ?? 0;

  // 사용자가 입력한 조건에 맞는 적금 상품 중 연 이자율이 가장 높은 2개의 상품을 출력
  const recommendedProducts = filteredProducts
    .filter(product => product.annualRate > interestRate)
    .sort((a, b) => b.annualRate - a.annualRate)
    .slice(0, 2);

  return (
    <>
      {recommendedProducts.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          onClick={() => {}}
          right={selectedProduct?.id === product.id ? <Assets.Icon name="icon-check-circle-green" /> : null}
        />
      ))}
    </>
  );
}

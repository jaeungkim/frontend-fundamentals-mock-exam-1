import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProduct, SavingsProductFilters } from 'pages/savings-calculator-page/types/savings-products';
import { useSavingsCalculations } from 'pages/savings-calculator-page/hooks/useSavingsCalculations';
import { SavingsProductsList } from './SavingsProductsList';
import { orderByHighestRate } from '../api/useSavingsProductsQuery';

export interface SavingsCalculationResultsProps {
  filters: SavingsProductFilters;
  selectedProduct: SavingsProduct;
}

export default function SavingsCalculationResults({ filters, selectedProduct }: SavingsCalculationResultsProps) {
  const { predictedIncome, differenceFromTargetAmount, recommendedMonthlyAmount, hasRequiredFilters } =
    useSavingsCalculations(filters, selectedProduct);

  const formatValue = (value: number, showSign = false) => {
    const sign = showSign && value >= 0 ? '+' : '';
    return `${sign}${value.toLocaleString()}원`;
  };

  const getDisplayValue = (value: number, showSign = false, requiresTarget = false) => {
    if (!hasRequiredFilters || (requiresTarget && (filters.targetAmount ?? 0) <= 0)) {
      return '모든 필터를 입력해주세요.';
    }
    return formatValue(value, showSign);
  };

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={getDisplayValue(predictedIncome)}
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
            bottom={getDisplayValue(differenceFromTargetAmount, true)}
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
            bottom={getDisplayValue(recommendedMonthlyAmount, false, true)}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <SavingsProductsList filters={filters} selectedProduct={selectedProduct} orderBy={orderByHighestRate} limit={2} />
    </>
  );
}

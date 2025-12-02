import { useMemo } from 'react';
import { SavingsProduct, SavingsProductFilters } from 'pages/savings-calculator-page/types/savings-products';

const roundToThousands = (amount: number) => Math.round(amount / 1000) * 1000;

interface CalculationResults {
  predictedIncome: number;
  differenceFromTargetAmount: number;
  recommendedMonthlyAmount: number;
  hasRequiredFilters: boolean;
}

export function useSavingsCalculations(
  filters: SavingsProductFilters,
  selectedProduct: SavingsProduct
): CalculationResults {
  return useMemo(() => {
    const monthlyAmount = filters.monthlyAmount ?? 0;
    const targetAmount = filters.targetAmount ?? 0;
    const term = filters.term ?? 0;

    const hasRequiredFilters =
      filters.monthlyAmount !== undefined && filters.targetAmount !== undefined && filters.term !== undefined;

    // 연이자율 계산 (% → 소수)
    const interestRate = selectedProduct.annualRate ? selectedProduct.annualRate / 100 : 0;

    // 예상 수익 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
    const predictedIncome = roundToThousands(monthlyAmount * term * (1 + interestRate * 0.5));

    // 목표 금액과의 차이 = 목표 금액 - 예상 수익 금액
    const differenceFromTargetAmount = roundToThousands(targetAmount - predictedIncome);

    // 추천 월 납입 금액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
    const denominator = term * (1 + interestRate * 0.5);
    const recommendedMonthlyAmount = roundToThousands(
      targetAmount > 0 && denominator > 0 ? targetAmount / denominator : 0
    );

    return {
      predictedIncome,
      differenceFromTargetAmount,
      recommendedMonthlyAmount,
      hasRequiredFilters,
    };
  }, [filters, selectedProduct]);
}

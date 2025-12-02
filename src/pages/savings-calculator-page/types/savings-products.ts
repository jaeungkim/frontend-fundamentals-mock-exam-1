export type SavingsProduct = {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
};

export interface SavingsProductFilters {
  targetAmount?: number;
  monthlyAmount?: number;
  term?: number;
}

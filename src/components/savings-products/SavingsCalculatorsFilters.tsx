import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { SavingsProductFilters } from 'types/savings-products';

interface SavingsCalculatorsFiltersProps {
  filters: SavingsProductFilters;
  onFiltersChange: (filters: SavingsProductFilters) => void;
}

export default function SavingsCalculatorsFilters({ filters, onFiltersChange }: SavingsCalculatorsFiltersProps) {
  // 2. 목표 금액, 월 납입액, 저축 기간을 사용자가 입력할 수 있는 기능을 구현   해주세요.
  const handleTargetAmountChange = (value: string) => {
    const numValue = value === '' ? undefined : Number(value.replace(/,/g, ''));
    onFiltersChange({ ...filters, targetAmount: numValue });
  };

  const handleMonthlyAmountChange = (value: string) => {
    const numValue = value === '' ? undefined : Number(value.replace(/,/g, ''));
    onFiltersChange({ ...filters, monthlyAmount: numValue });
  };

  const handleTermChange = (term: number) => {
    onFiltersChange({ ...filters, term });
  };

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={filters.targetAmount?.toLocaleString() || ''}
        onChange={e => handleTargetAmountChange(e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={filters.monthlyAmount?.toLocaleString() || ''}
        onChange={e => handleMonthlyAmountChange(e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={filters.term ?? undefined}
        onChange={value => handleTermChange(value)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}

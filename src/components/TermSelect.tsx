import { SelectBottomSheet } from 'tosslib';

interface TermSelectProps {
  label?: string;
  value: number | undefined;
  onChange: (value: number) => void;
}

const TERM_OPTIONS = [
  { value: 6, label: '6개월' },
  { value: 12, label: '12개월' },
  { value: 24, label: '24개월' },
] as const;

export default function TermSelect({ label = '저축 기간', value, onChange }: TermSelectProps) {
  return (
    <SelectBottomSheet label={label} title="저축 기간을 선택해주세요" value={value} onChange={onChange}>
      {TERM_OPTIONS.map(option => (
        <SelectBottomSheet.Option key={option.value} value={option.value}>
          {option.label}
        </SelectBottomSheet.Option>
      ))}
    </SelectBottomSheet>
  );
}

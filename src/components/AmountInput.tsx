import { TextField } from 'tosslib';
import { ChangeEvent } from 'react';

interface AmountInputProps {
  label: string;
  placeholder?: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export default function AmountInput({ label, placeholder, value, onChange }: AmountInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = rawValue === '' ? undefined : Number(rawValue);
    onChange(numValue);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      suffix="원"
      value={value?.toLocaleString() ?? ''}
      onChange={handleChange}
    />
  );
}

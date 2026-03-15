import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/format";
import { Input } from "../ui/input";

interface MoneyInputProps {
  value?: number;
  onChange?: (value: number) => void;
}

export function MoneyInput({
  value = 0,
  onChange,
  ...props
}: MoneyInputProps & React.ComponentProps<typeof Input>) {
  const [formattedValue, setFormattedValue] = useState("");
  const [rawValue, setRawValue] = useState<number>(value);

  useEffect(() => {
    setFormattedValue(formatCurrency(rawValue / 100));
  }, [rawValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value || "0";
    const parsedValue = parseInt(inputValue.replace(/[^\d]/g, ""), 10);
    setRawValue(parsedValue);
    onChange?.(parsedValue);
  }

  return (
    <Input
      {...props}
      type="text"
      value={formattedValue}
      onChange={handleChange}
      maxLength={18}
    />
  );
}

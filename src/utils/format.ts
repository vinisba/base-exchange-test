import { format } from "date-fns";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDateTime(value: Date): string {
  return format(value, "dd/MM/yyyy HH:mm:ss");
}

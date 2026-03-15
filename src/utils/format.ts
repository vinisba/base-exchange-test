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

export function getInitials(name: string): string {
  return (
    name.charAt(0).toUpperCase() +
    name.charAt(name.indexOf(" ") + 1).toUpperCase()
  );
}

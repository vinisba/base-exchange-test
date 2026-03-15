import { IconCircleCheckFilled, IconLoader, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

enum OrderStatuses {
  OPEN = "Aberta",
  CANCELED = "Cancelada",
  PARTIAL = "Parcial",
  EXECUTED = "Executada",
}

const statusIcon: Record<keyof typeof OrderStatuses, React.ReactNode> = {
  OPEN: null,
  CANCELED: <IconX className="text-red-500" />,
  PARTIAL: <IconLoader />,
  EXECUTED: <IconCircleCheckFilled className="fill-green-500" />,
};

interface OrderStatusProps {
  status: keyof typeof OrderStatuses;
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {statusIcon[status]}
      {OrderStatuses[status]}
    </Badge>
  );
}

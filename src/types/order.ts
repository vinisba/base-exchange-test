type Order = {
  id: number;
  instrument: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  remaining: number;
  status: "open" | "executed" | "partially_filled" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

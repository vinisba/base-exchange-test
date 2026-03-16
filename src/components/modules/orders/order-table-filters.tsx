"use client";

import { Side, Status } from "@generated/prisma/enums";
import { DateFilter } from "@/components/filters/date";
import { SearchFilter } from "@/components/filters/search";
import { SelectFilter } from "@/components/filters/select";
import { useOrders } from "@/hooks/use-orders";

export function OrderTableFilters() {
  const { search, setSearch, filters, setFilters } = useOrders();

  return (
    <div className="flex flex-row gap-2 justify-between">
      <SearchFilter
        placeholder="ID ou instrumento"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-row gap-2 hidden lg:flex">
        <DateFilter
          date={filters.createdAt || undefined}
          onSelectDate={(date) => setFilters({ createdAt: date })}
        />
        <SelectFilter
          placeholder="Tipo"
          value={filters.side || ""}
          onValueChange={(value) => setFilters({ side: value as Side })}
          options={[
            { label: "Compra", value: Side.BUY },
            { label: "Venda", value: Side.SELL },
          ]}
        />
        <SelectFilter
          placeholder="Status"
          value={filters.status || ""}
          onValueChange={(value) =>
            setFilters({ status: (value as Status) || null })
          }
          options={[
            { label: "Aberto", value: Status.OPEN },
            { label: "Parcial", value: Status.PARTIAL },
            { label: "Executado", value: Status.EXECUTED },
            { label: "Cancelado", value: Status.CANCELED },
          ]}
        />
      </div>
    </div>
  );
}

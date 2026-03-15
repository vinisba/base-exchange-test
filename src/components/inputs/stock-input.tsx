"use client";

import type { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/lib/client";
import type { Stock } from "@/server/utils/brapi";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";

interface StockInputProps {
  onChange?: (value: string) => void;
}

export function StockInput({
  onChange,
  ...props
}: StockInputProps &
  Omit<ComboboxPrimitive.Root.Props<Stock, false>, "value" | "onValueChange">) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  const { data, isLoading } = useQuery({
    queryKey: ["stocks", debouncedSearchTerm],
    queryFn: () => api.stocks.get({ query: { q: debouncedSearchTerm } }),
    enabled: debouncedSearchTerm.length >= 3,
  });

  const items =
    data?.data?.map((stock) => ({
      ...stock,
    })) || [];

  return (
    <Combobox
      {...props}
      items={items}
      value={selectedStock}
      onValueChange={(item) => {
        setSelectedStock(item);
        onChange?.(item?.stock || "");
      }}
      onInputValueChange={setSearchTerm}
      itemToStringLabel={(item) => item.stock}
      filter={() => true}
    >
      <ComboboxInput placeholder="Digite 3 caracteres" />
      <ComboboxContent>
        <ComboboxEmpty>
          {isLoading ? "Carregando..." : "Nenhum resultado"}
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Stock) => (
            <ComboboxItem key={item.stock} value={item}>
              <Item size="xs" className="w-full p-2">
                <ItemMedia variant="image">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={32}
                    height={32}
                  />
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{item.stock}</ItemTitle>
                  <ItemDescription className="leading-none">
                    {item.name}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

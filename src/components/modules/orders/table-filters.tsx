import { DateFilter } from "@/components/filters/date";
import { SearchFilter } from "@/components/filters/search";
import { SelectFilter } from "@/components/filters/select";

export function TableFilters() {
  return (
    <div className="flex flex-row gap-2 justify-between">
      <SearchFilter placeholder="ID ou instrumento" />
      <div className="flex-row gap-2 hidden lg:flex">
        <DateFilter />
        <SelectFilter
          placeholder="Tipo"
          options={[{ label: "Teste", value: "teste" }]}
        />
        <SelectFilter placeholder="Status" />
      </div>
    </div>
  );
}

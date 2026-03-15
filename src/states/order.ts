import type { Side, Status } from "@generated/prisma/enums";
import type { SortingState } from "@tanstack/react-table";
import { create } from "zustand";

type OrderFilters = {
  createdAt?: Date;
  side?: Side;
  status?: Status;
};

type OrderState = {
  orderIdToCancel: string | null;
  search: string;
  filters: OrderFilters;
  sorting: SortingState;
};

type OrderActions = {
  setOrderIdToCancel: (orderId: string | null) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: Partial<OrderFilters>) => void;
  resetFilters: () => void;
  setSorting: (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState),
  ) => void;
};

const defaultFilters: OrderFilters = {
  createdAt: undefined,
  side: undefined,
  status: undefined,
};

const defaultState: OrderState = {
  orderIdToCancel: null,
  search: "",
  filters: defaultFilters,
  sorting: [{ id: "createdAt", desc: true }],
};

export const useOrderState = create<OrderState & OrderActions>((set) => ({
  ...defaultState,
  setOrderIdToCancel: (orderId) => set({ orderIdToCancel: orderId }),
  setSearch: (search) => set({ search }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters, search: "" }),
  setSorting: (updaterOrValue) =>
    set((state) => ({
      sorting:
        typeof updaterOrValue === "function"
          ? updaterOrValue(state.sorting)
          : updaterOrValue,
    })),
}));

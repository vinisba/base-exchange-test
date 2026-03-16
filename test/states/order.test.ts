import { beforeEach, describe, expect, it } from "vitest";
import { useOrderState } from "@/states/order";

describe("useOrderState", () => {
  beforeEach(() => {
    const { resetFilters, setOrderIdToCancel, setSorting } =
      useOrderState.getState();
    resetFilters();
    setOrderIdToCancel(null);
    setSorting([{ id: "createdAt", desc: true }]);
  });

  it("has correct default state", () => {
    const state = useOrderState.getState();
    expect(state.orderIdToCancel).toBeNull();
    expect(state.search).toBe("");
    expect(state.filters).toEqual({
      createdAt: undefined,
      side: undefined,
      status: undefined,
    });
    expect(state.sorting).toEqual([{ id: "createdAt", desc: true }]);
  });

  it("sets and clears orderIdToCancel", () => {
    useOrderState.getState().setOrderIdToCancel("order-123");
    expect(useOrderState.getState().orderIdToCancel).toBe("order-123");

    useOrderState.getState().setOrderIdToCancel(null);
    expect(useOrderState.getState().orderIdToCancel).toBeNull();
  });

  it("sets search", () => {
    useOrderState.getState().setSearch("PETR4");
    expect(useOrderState.getState().search).toBe("PETR4");
  });

  it("merges filters with existing state", () => {
    useOrderState.getState().setFilters({ side: "BUY" });
    expect(useOrderState.getState().filters.side).toBe("BUY");

    useOrderState.getState().setFilters({ status: "OPEN" });
    expect(useOrderState.getState().filters).toEqual({
      createdAt: undefined,
      side: "BUY",
      status: "OPEN",
    });
  });

  it("resets filters and search", () => {
    useOrderState.getState().setSearch("test");
    useOrderState.getState().setFilters({ side: "BUY", status: "OPEN" });
    useOrderState.getState().resetFilters();

    expect(useOrderState.getState().search).toBe("");
    expect(useOrderState.getState().filters).toEqual({
      createdAt: undefined,
      side: undefined,
      status: undefined,
    });
  });

  it("sets sorting with a direct value", () => {
    useOrderState.getState().setSorting([{ id: "price", desc: false }]);
    expect(useOrderState.getState().sorting).toEqual([
      { id: "price", desc: false },
    ]);
  });

  it("sets sorting with an updater function", () => {
    useOrderState
      .getState()
      .setSorting((old) => [...old, { id: "price", desc: false }]);
    expect(useOrderState.getState().sorting).toEqual([
      { id: "createdAt", desc: true },
      { id: "price", desc: false },
    ]);
  });
});

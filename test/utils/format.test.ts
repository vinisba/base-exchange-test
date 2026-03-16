import { describe, expect, it } from "vitest";
import { formatCurrency, formatDateTime, getInitials } from "@/utils/format";

describe("formatCurrency", () => {
  it("formats positive numbers as BRL currency", () => {
    expect(formatCurrency(100)).toBe("R$\u00a0100,00");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("R$\u00a00,00");
  });

  it("formats decimal values", () => {
    expect(formatCurrency(19.99)).toBe("R$\u00a019,99");
  });

  it("formats negative numbers", () => {
    expect(formatCurrency(-50)).toBe("-R$\u00a050,00");
  });

  it("formats large numbers with thousands separator", () => {
    expect(formatCurrency(1000)).toBe("R$\u00a01.000,00");
  });
});

describe("formatDateTime", () => {
  it("formats a date as dd/MM/yyyy HH:mm:ss", () => {
    const date = new Date(2024, 2, 16, 14, 30, 45);
    expect(formatDateTime(date)).toBe("16/03/2024 14:30:45");
  });

  it("pads single-digit day and month with zeros", () => {
    const date = new Date(2024, 0, 5, 8, 5, 3);
    expect(formatDateTime(date)).toBe("05/01/2024 08:05:03");
  });
});

describe("getInitials", () => {
  it("returns initials from a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("returns uppercase initials", () => {
    expect(getInitials("john doe")).toBe("JD");
  });

  it("handles names with multiple words and takes first + second word initial", () => {
    expect(getInitials("Maria da Silva")).toBe("MD");
  });
});

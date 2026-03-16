import { expect, test } from "@playwright/test";
import { generateTestUser, signUp } from "./helpers";

test.describe("Dashboard", () => {
  let user: ReturnType<typeof generateTestUser>;

  test.beforeEach(async ({ page }) => {
    user = generateTestUser();
    await signUp(page, user);
  });

  test("authenticated user sees dashboard with KPI cards", async ({ page }) => {
    await expect(page).toHaveURL("/dashboard");
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    // Verify KPI cards are visible
    await expect(page.getByText("Total Aberto ou Parcial")).toBeVisible();
    await expect(page.getByText("Total Cancelada")).toBeVisible();
    await expect(page.getByText("Total Executada")).toBeVisible();
    await expect(page.getByText("Valor Total Executado")).toBeVisible();
  });

  test("dashboard shows orders table", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Ordens" })).toBeVisible();
    await expect(page.getByText("Lista de ordens do sistema")).toBeVisible();
  });

  test('"Adicionar" button opens new order modal', async ({ page }) => {
    await page.getByRole("link", { name: "Adicionar" }).first().click();
    await expect(page.getByText("Adicionar ordem")).toBeVisible({
      timeout: 15000,
    });
  });
});

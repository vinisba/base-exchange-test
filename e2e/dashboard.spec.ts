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
    await expect(page.getByText("Monthly revenue")).toBeVisible();
    await expect(page.getByText("Orders fulfilled")).toBeVisible();
    await expect(page.getByText("New customers")).toBeVisible();
    await expect(page.getByText("Refunds issued")).toBeVisible();
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

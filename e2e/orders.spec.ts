import { expect, test } from "@playwright/test";
import { generateTestUser, signUp } from "./helpers";

test.describe("Order management", () => {
  test.beforeEach(async ({ page }) => {
    const user = generateTestUser();
    await signUp(page, user);
  });

  test("create a new order via the modal form", async ({ page }) => {
    await page.getByRole("link", { name: "Adicionar" }).first().click();
    await expect(page.getByText("Adicionar ordem")).toBeVisible({
      timeout: 15000,
    });

    const stockInput = page.getByPlaceholder("Digite 3 caracteres");
    await stockInput.fill("PETR");
    await page.getByRole("option").first().click({ timeout: 15000 });
    await page.getByRole("radio", { name: "Compra" }).click();

    const priceInput = page.locator("#price");
    await priceInput.fill("1000");

    const quantityInput = page.locator("#quantity");
    await quantityInput.fill("10");

    await page.getByRole("button", { name: "Criar" }).click();

    await expect(page.getByText("Ordem criada com sucesso!")).toBeVisible({
      timeout: 10000,
    });
  });

  test("view order in orders list", async ({ page }) => {
    await page.getByRole("link", { name: "Adicionar" }).first().click();
    await expect(page.getByText("Adicionar ordem")).toBeVisible({
      timeout: 15000,
    });

    const stockInput = page.getByPlaceholder("Digite 3 caracteres");
    await stockInput.fill("PETR");
    await page.getByRole("option").first().click({ timeout: 15000 });

    await page.getByRole("radio", { name: "Compra" }).click();
    await page.locator("#price").fill("1000");
    await page.locator("#quantity").fill("5");
    await page.getByRole("button", { name: "Criar" }).click();
    await expect(page.getByText("Ordem criada com sucesso!")).toBeVisible({
      timeout: 10000,
    });

    await page.getByRole("link", { name: "Minhas ordens" }).click();
    await expect(page).toHaveURL("/orders");

    await expect(page.getByText("Compra").first()).toBeVisible();
    await expect(page.getByText("Aberta").first()).toBeVisible();
  });

  test("view order detail page", async ({ page }) => {
    await page.getByRole("link", { name: "Adicionar" }).first().click();
    await expect(page.getByText("Adicionar ordem")).toBeVisible({
      timeout: 15000,
    });

    const stockInput = page.getByPlaceholder("Digite 3 caracteres");
    await stockInput.fill("PETR");
    await page.getByRole("option").first().click({ timeout: 15000 });

    await page.getByRole("radio", { name: "Compra" }).click();
    await page.locator("#price").fill("2000");
    await page.locator("#quantity").fill("3");
    await page.getByRole("button", { name: "Criar" }).click();
    await expect(page.getByText("Ordem criada com sucesso!")).toBeVisible({
      timeout: 10000,
    });

    await page.getByRole("link", { name: "Minhas ordens" }).click();
    await page.waitForURL("/orders");
    await page.locator("table").getByRole("link").first().click();
    await expect(page).toHaveURL(/\/orders\/[a-zA-Z0-9]+/);

    await expect(page.getByText("Detalhes da Ordem")).toBeVisible();
    await expect(page.getByText("Histórico de status")).toBeVisible();
    await expect(page.getByText("Histórico de execuções")).toBeVisible();
  });

  test("cancel an order", async ({ page }) => {
    await page.getByRole("link", { name: "Adicionar" }).first().click();
    await expect(page.getByText("Adicionar ordem")).toBeVisible({
      timeout: 15000,
    });

    const stockInput = page.getByPlaceholder("Digite 3 caracteres");
    await stockInput.fill("PETR");
    await page.getByRole("option").first().click({ timeout: 15000 });

    await page.getByRole("radio", { name: "Compra" }).click();
    await page.locator("#price").fill("1500");
    await page.locator("#quantity").fill("1");
    await page.getByRole("button", { name: "Criar" }).click();
    await expect(page.getByText("Ordem criada com sucesso!")).toBeVisible({
      timeout: 10000,
    });

    await page.getByRole("link", { name: "Minhas ordens" }).click();
    await page.getByRole("button", { name: "Cancelar" }).first().click();

    await expect(
      page.getByText("Você deseja cancelar esta ordem?"),
    ).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).click();

    await expect(page.getByText("Ordem cancelada com sucesso!")).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByText("Cancelada").first()).toBeVisible();
  });
});

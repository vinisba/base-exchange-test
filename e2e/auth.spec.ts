import { expect, test } from "@playwright/test";
import { generateTestUser, logout, signIn, signUp } from "./helpers";

test.describe("Authentication", () => {
  test("sign-up with valid data redirects to /dashboard", async ({ page }) => {
    const user = generateTestUser();
    await signUp(page, user);
    await expect(page).toHaveURL("/dashboard");
  });

  test("sign-up with invalid data shows validation errors", async ({
    page,
  }) => {
    await page.goto("/sign-up");
    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(page.getByText("Nome é obrigatório")).toBeVisible();
    await expect(page.getByText("E-mail inválido")).toBeVisible();
    await expect(
      page.getByText("A senha deve ter pelo menos 8 caracteres"),
    ).toBeVisible();
  });

  test("sign-up with mismatched passwords shows error", async ({ page }) => {
    await page.goto("/sign-up");
    const user = generateTestUser();
    await page.getByLabel("Nome completo").fill(user.name);
    await page.getByLabel("E-mail").fill(user.email);
    await page.getByLabel("Senha", { exact: true }).fill(user.password);
    await page.getByLabel("Confirmar senha").fill("different-password");
    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(page.getByText("As senhas não coincidem")).toBeVisible();
  });

  test("sign-in with valid credentials redirects to /dashboard", async ({
    page,
  }) => {
    const user = generateTestUser();
    await signUp(page, user);
    await logout(page);
    await signIn(page, user);
    await expect(page).toHaveURL("/dashboard");
  });

  test("sign-in with wrong password shows error", async ({ page }) => {
    const user = generateTestUser();
    await signUp(page, user);
    await logout(page);

    await page.goto("/sign-in");
    await page.getByLabel("E-mail").fill(user.email);
    await page.getByLabel("Senha").fill("wrongpassword123");
    await page.getByRole("button", { name: "Entrar" }).click();

    // The app shows the server error from better-auth
    await expect(
      page.getByText(/invalid|incorret|inválid/i).first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test("navigate between sign-in and sign-up pages via links", async ({
    page,
  }) => {
    await page.goto("/sign-in");
    await page.getByRole("link", { name: /Criar/i }).click();
    await expect(page).toHaveURL("/sign-up");

    await expect(page.getByText("Crie sua conta")).toBeVisible();
    await page.getByRole("link", { name: /Acessar/i }).click();
    await expect(page).toHaveURL("/sign-in");
  });

  test("unauthenticated user is redirected to sign-in", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/sign-in/);
  });
});

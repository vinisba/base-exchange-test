import type { Page } from "@playwright/test";

export interface TestUser {
  name: string;
  email: string;
  password: string;
}

export function generateTestUser(): TestUser {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  return {
    name: `Test User ${id}`,
    email: `test-${id}@e2e.test`,
    password: `Password${id}!`,
  };
}

export async function signUp(page: Page, user: TestUser) {
  await page.goto("/sign-up");
  await page.getByLabel("Nome completo").fill(user.name);
  await page.getByLabel("E-mail").fill(user.email);
  await page.getByLabel("Senha", { exact: true }).fill(user.password);
  await page.getByLabel("Confirmar senha").fill(user.password);
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.waitForURL("/dashboard");
}

export async function signIn(page: Page, user: TestUser) {
  await page.goto("/sign-in");
  await page.getByLabel("E-mail").fill(user.email);
  await page.getByLabel("Senha").fill(user.password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("/dashboard");
}

export async function logout(page: Page) {
  await page.locator("header").getByRole("button").last().click();
  await page.getByRole("menuitem", { name: "Sair" }).click();
  await page.waitForURL("/sign-in");
}

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignupForm } from "@/components/modules/auth/signup-form";

const { mockPush, mockSignUp } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSignUp: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/lib/client", () => ({
  authClient: {
    signUp: { email: mockSignUp },
  },
}));

describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar senha")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<SignupForm />);
    expect(
      screen.getByRole("button", { name: "Criar conta" }),
    ).toBeInTheDocument();
  });

  it("renders link to sign in page", () => {
    render(<SignupForm />);
    expect(screen.getByText("Acessar")).toHaveAttribute("href", "/sign-in");
  });

  it("shows validation error for single name (no surname)", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Nome completo"), "John");
    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "12345678");
    await user.type(screen.getByLabelText("Confirmar senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("Por favor, insira um sobrenome"),
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Nome completo"), "John Doe");
    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "123");
    await user.type(screen.getByLabelText("Confirmar senha"), "123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("A senha deve ter pelo menos 8 caracteres"),
    ).toBeInTheDocument();
  });

  it("shows validation error for mismatched passwords", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Nome completo"), "John Doe");
    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "12345678");
    await user.type(screen.getByLabelText("Confirmar senha"), "87654321");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("As senhas não coincidem"),
    ).toBeInTheDocument();
  });

  it("calls signUp.email on valid submit", async () => {
    mockSignUp.mockResolvedValueOnce({});
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Nome completo"), "John Doe");
    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "12345678");
    await user.type(screen.getByLabelText("Confirmar senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(mockSignUp).toHaveBeenCalledWith(
      {
        email: "test@example.com",
        password: "12345678",
        name: "John Doe",
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it("redirects to dashboard on success", async () => {
    mockSignUp.mockImplementation(
      (_data: unknown, opts: { onSuccess: () => void }) => {
        opts.onSuccess();
        return Promise.resolve();
      },
    );
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Nome completo"), "John Doe");
    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "12345678");
    await user.type(screen.getByLabelText("Confirmar senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});

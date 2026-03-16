import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/modules/auth/login-form";

const { mockPush, mockSignIn } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSignIn: vi.fn(),
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
    signIn: { email: mockSignIn },
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: "Entrar" }),
    ).toBeInTheDocument();
  });

  it("renders link to sign up page", () => {
    render(<LoginForm />);
    expect(screen.getByText("Criar")).toHaveAttribute("href", "/sign-up");
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("E-mail inválido")).toBeInTheDocument();
    expect(
      await screen.findByText("Senha é obrigatória"),
    ).toBeInTheDocument();
  });

  it("calls signIn.email on valid submit", async () => {
    mockSignIn.mockResolvedValueOnce({});
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(mockSignIn).toHaveBeenCalledWith(
      { email: "test@example.com", password: "password123" },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it("redirects to dashboard on success", async () => {
    mockSignIn.mockImplementation(
      (_data: unknown, opts: { onSuccess: () => void }) => {
        opts.onSuccess();
        return Promise.resolve();
      },
    );
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "test@example.com");
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});

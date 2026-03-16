import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavUser } from "@/components/modules/user/nav-user";

const { mockPush, mockSignOut } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/lib/client", () => ({
  authClient: { signOut: mockSignOut },
}));

const defaultUser = {
  name: "John Doe",
  email: "john@example.com",
  image: null,
};

describe("NavUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the trigger button", () => {
    render(<NavUser user={defaultUser} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows user name and email in dropdown", async () => {
    const user = userEvent.setup();
    render(<NavUser user={defaultUser} />);

    await user.click(screen.getByRole("button"));

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("john@example.com")).toBeInTheDocument();
  });

  it("shows user initials as avatar fallback", async () => {
    const user = userEvent.setup();
    render(<NavUser user={defaultUser} />);

    await user.click(screen.getByRole("button"));

    expect(await screen.findByText("JD")).toBeInTheDocument();
  });

  it("calls signOut on logout click", async () => {
    mockSignOut.mockResolvedValueOnce({});
    const user = userEvent.setup();
    render(<NavUser user={defaultUser} />);

    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("Sair"));

    expect(mockSignOut).toHaveBeenCalled();
  });
});

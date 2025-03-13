import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "../../src/components/LoginForm";

vi.mock("@/hooks/useLogin", () => ({
  useLogin: () => ({ mutate: vi.fn() }),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useRouter: () => ({ update: vi.fn() }),
}));

vi.mock("@/lib/store", () => ({
  useFidoStore: () => vi.fn(),
}));

describe("LoginForm", () => {
  it("renders all form elements correctly", () => {
    render(<LoginForm />);

    expect(screen.getByText("Login to your account")).toBeInTheDocument();

    expect(
      screen.getByText(/Enter your name and email below/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation error for empty name", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<LoginForm />);

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    const errorElement = await screen.findByTestId(
      "email-error",
      {},
      { timeout: 2000 }
    );
    expect(errorElement).toHaveClass("text-red-500");
  });
});

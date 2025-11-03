import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import { test } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders title and author, but not url or likes by default", () => {
  const blog = {
    title: "Aprendendo React",
    author: "Igor",
    url: "https://react.dev",
    likes: 10,
    user: { username: "igor" },
  };

  render(<Blog blog={blog} />);

  // 🔹 Opção 1 — usando expressão regular (ignora elementos separados)
  expect(screen.getByText(/Aprendendo React/)).toBeInTheDocument();
  expect(screen.getByText(/Igor/)).toBeInTheDocument();

  // 🔹 Opção 2 — alternativa: matcher de função
  // expect(screen.getByText((content) => content.includes('Aprendendo React'))).toBeInTheDocument();
  // expect(screen.getByText((content) => content.includes('Igor'))).toBeInTheDocument();

  // não deve mostrar url nem likes
  expect(screen.queryByText("https://react.dev")).toBeNull();
  expect(screen.queryByText("likes 10")).toBeNull();
});

test("shows URL and number of likes after clicking the view button", async () => {
  const blog = {
    title: "Aprendendo React",
    author: "Igor",
    url: "https://react.dev",
    likes: 10,
    user: { username: "igor" },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  // Agora sim: verificar se aparecem na tela
  expect(screen.getByText("https://react.dev")).toBeInTheDocument();
  expect(screen.getByText("likes 10")).toBeInTheDocument();
});

test("button clicked twice, calling twice of component event handle", async () => {
  const blog = {
    title: "Aprendendo React",
    author: "Igor",
    url: "https://react.dev",
    likes: 10,
    user: { username: "igor" },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} onLike={mockHandler} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

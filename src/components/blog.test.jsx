import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";

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

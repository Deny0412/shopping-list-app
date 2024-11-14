import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav"; // Cesta ke komponentě Nav
import { ThemeProvider } from "../contexts/ThemeContext";
import { ShoppingListProvider } from "../contexts/ShoppingListContext"; // Pokud je potřeba kontext pro uživatele
import userEvent from "@testing-library/user-event";

test("toggleTheme should switch between light and dark modes using Nav component", async () => {
  // Renderujte Nav komponentu zabalenou do ThemeProvider
  render(
    <ThemeProvider>
      <ShoppingListProvider>
        {" "}
        {/* Pokud potřebujete další kontext */}
        <Nav />
      </ShoppingListProvider>
    </ThemeProvider>
  );

  // Ověření výchozího stavu
  expect(screen.getByText("Dark Mode")).toBeInTheDocument();

  // Kliknutí na tlačítko pro přepnutí režimu
  userEvent.click(screen.getByText("Dark Mode"));

  // Čekání na aktualizaci a ověření změny režimu
  expect(screen.getByText("Light Mode")).toBeInTheDocument();
});

// src/pages/_app.js
import ShoppingListProvider from "../contexts/ShoppingListContext"; // Default import
import Layout from "../components/Layout";
import "../globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShoppingListProvider>
    </ThemeProvider>
  );
}

// src/pages/_app.js
import ShoppingListProvider from "../contexts/ShoppingListContext"; // Default import
import Layout from "../components/Layout";
import "../globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ShoppingListProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ShoppingListProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

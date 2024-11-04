// src/pages/_app.js
import ShoppingListProvider from "../contexts/ShoppingListContext"; // Default import
import Layout from "../components/Layout";
import "../globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ShoppingListProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShoppingListProvider>
  );
}

// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import ShoppingList from "@/components/Overview/ShoppingList";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/detail/1");
  }, [router]);

  return <ShoppingList />;
}

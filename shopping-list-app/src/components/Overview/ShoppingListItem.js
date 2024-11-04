import Link from "next/link";

export default function ShoppingListItem({ item }) {
  // Kontrola, zda se item správně načítá
  return (
    <div key={item.id}>
      <Link href={`/detail/${item.id}`}>
        <div>{item.title}</div> {/* Zobrazení názvu položky */}
      </Link>
    </div>
  );
}

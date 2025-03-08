import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ItemsList } from "./components/ItemsList";

export const metadata: Metadata = {
  title: "Items",
  description: "List of items",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/items/new"}>Create Item</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ItemsList />
      </Suspense>
    </div>
  );
}

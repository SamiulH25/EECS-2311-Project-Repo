import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { StoresList } from "./components/StoresList";

export const metadata: Metadata = {
  title: "Stores",
  description: "List of stores",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/stores/new"}>Create Store</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <StoresList />
      </Suspense>
    </div>
  );
}

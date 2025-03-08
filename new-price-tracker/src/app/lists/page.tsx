import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ListsList } from "./components/ListsList";

export const metadata: Metadata = {
  title: "Lists",
  description: "List of lists",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/lists/new"}>Create List</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ListsList />
      </Suspense>
    </div>
  );
}

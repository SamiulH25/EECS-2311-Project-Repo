import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getItem from "../queries/getItem";
import { Item } from "../components/Item";

export async function generateMetadata(
  props: ItemPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Item = await invoke(getItem, { id: Number(params.itemId) });
  return {
    title: `Item ${Item.id} - ${Item.name}`,
  };
}

type ItemPageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function Page(props: ItemPageProps) {
  const params = await props.params;
  return (
    <div>
      <p>
        <Link href={"/items"}>Items</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Item itemId={Number(params.itemId)} />
      </Suspense>
    </div>
  );
}

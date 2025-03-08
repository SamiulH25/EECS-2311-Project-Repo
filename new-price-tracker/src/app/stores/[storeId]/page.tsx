import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getStore from "../queries/getStore";
import { Store } from "../components/Store";

export async function generateMetadata(
  props: StorePageProps
): Promise<Metadata> {
  const params = await props.params;
  const Store = await invoke(getStore, { id: Number(params.storeId) });
  return {
    title: `Store ${Store.id} - ${Store.name}`,
  };
}

type StorePageProps = {
  params: Promise<{ storeId: string }>;
};

export default async function Page(props: StorePageProps) {
  const params = await props.params;
  return (
    <div>
      <p>
        <Link href={"/stores"}>Stores</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Store storeId={Number(params.storeId)} />
      </Suspense>
    </div>
  );
}

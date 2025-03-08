import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getStore from "../../queries/getStore";
import { EditStore } from "../../components/EditStore";

type EditStorePageProps = {
  params: Promise<{ storeId: string }>;
};

export async function generateMetadata(
  props: EditStorePageProps
): Promise<Metadata> {
  const params = await props.params;
  const Store = await invoke(getStore, { id: Number(params.storeId) });
  return {
    title: `Edit Store ${Store.id} - ${Store.name}`,
  };
}

export default async function Page(props: EditStorePageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStore storeId={Number(params.storeId)} />
      </Suspense>
    </div>
  );
}

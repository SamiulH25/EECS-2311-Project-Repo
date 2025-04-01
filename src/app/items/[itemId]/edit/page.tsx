import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getItem from "../../queries/getItem";
import { EditItem } from "../../components/EditItem";

type EditItemPageProps = {
  params: Promise<{ itemId: string }>;
};

export async function generateMetadata(
  props: EditItemPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Item = await invoke(getItem, { id: Number(params.itemId) });
  return {
    title: `Edit Item ${Item.id} - ${Item.name}`,
  };
}

export default async function Page(props: EditItemPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditItem itemId={Number(params.itemId)} />
      </Suspense>
    </div>
  );
}

import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getList from "../../queries/getList";
import { EditList } from "../../components/EditList";

type EditListPageProps = {
  params: Promise<{ listId: string }>;
};

export async function generateMetadata(
  props: EditListPageProps
): Promise<Metadata> {
  const params = await props.params;
  const List = await invoke(getList, { id: Number(params.listId) });
  return {
    title: `Edit List ${List.id} - ${List.name}`,
  };
}

export default async function Page(props: EditListPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditList listId={Number(params.listId)} />
      </Suspense>
    </div>
  );
}

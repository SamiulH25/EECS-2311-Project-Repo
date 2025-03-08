"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteStore from "../mutations/deleteStore";
import getStore from "../queries/getStore";

export const Store = ({ storeId }: { storeId: number }) => {
  const router = useRouter();
  const [deleteStoreMutation] = useMutation(deleteStore);
  const [store] = useQuery(getStore, { id: storeId });

  return (
    <>
      <div>
        <h1>Project {store.id}</h1>
        <pre>{JSON.stringify(store, null, 2)}</pre>

        <Link href={`/stores/${store.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteStoreMutation({ id: store.id });
              router.push("/stores");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

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
        <h1>{store.name}</h1>

        <h2>Items:</h2>
        {store.items && store.items.length > 0 ? (
          <ul>
            {store.items.map((item, index) => (
              <li key={index}>
                <Link href={`/items/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items available in this store.</p>
        )}

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

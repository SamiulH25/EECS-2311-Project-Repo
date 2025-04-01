"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteStore from "../mutations/deleteStore";
import getStore from "../queries/getStore";
import styles from "../../styles/Home.module.css"

export const Store = ({ storeId }: { storeId: number }) => {
  const router = useRouter();
  const [deleteStoreMutation] = useMutation(deleteStore);
  const [store] = useQuery(getStore, { id: storeId });

  return (
    <>
      <div>
        <div className={styles.globe} />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>{store.name}</h1>
            <h2>Items:</h2>
          </div>

          <div className={styles.centerBox}>
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
          </div>

          <div className={styles.buttonContainer}>
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

        </div>
      </div>
    </>
  );
};

import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ItemsList } from "./components/ItemsList";
import styles from "../styles/Home.module.css"

export const metadata: Metadata = {
  title: "Items",
  description: "List of items",
};

export default function Page() {
  return (
    <>
      <div className={styles.globe} />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1><strong>Available</strong> Items</h1>
        </div>
        
        <div className={styles.centerList}>
          <div >
            <Suspense fallback={<div>Loading...</div>}>
              <ItemsList />
            </Suspense>
          </div>

          <p>
            <Link href={"/items/new"} className={styles.button}>
            Create Item
            </Link>
          </p>
        </div>

      </div>
    </>
  );
}

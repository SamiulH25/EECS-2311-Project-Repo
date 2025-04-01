import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { StoresList } from "./components/StoresList";
import styles from "../styles/Home.module.css"

export const metadata: Metadata = {
  title: "Stores",
  description: "List of stores",
};

export default function Page() {
  return (
    <div>
      <div className={styles.globe} />
      
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <h1><strong>Available</strong> Stores</h1>
        </div>

        <div className={styles.centerList}>
          <Suspense fallback={<div>Loading...</div>}>
            <StoresList />
          </Suspense>

          <p>
            <Link href={"/stores/new"} className={styles.button}>
            Create Store
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}

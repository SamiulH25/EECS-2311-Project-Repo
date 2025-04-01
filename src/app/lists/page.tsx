import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ListsList } from "./components/ListsList";
import styles from "../styles/Home.module.css"

export const metadata: Metadata = {
  title: "Lists",
  description: "List of lists",
};

export default function Page() {
  return (
    <div>

      <div className={styles.globe} />

      <div className={styles.wrapper}>
        
        <div className={styles.header}>
          <h1><strong>Your</strong> Lists</h1>
        </div>

        <div className={styles.centerList}>
          <Suspense fallback={<div>Loading...</div>}>
            <ListsList />
          </Suspense>

          <p>
            <Link href={"/lists/new"} className={styles.button}>
            Create List
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

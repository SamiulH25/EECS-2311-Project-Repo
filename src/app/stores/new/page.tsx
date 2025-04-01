import { Metadata } from "next";
import { Suspense } from "react";
import { New__ModelName } from "../components/NewStore";
import styles from "../../styles/Home.module.css"

export const metadata: Metadata = {
  title: "New Store",
  description: "Create a new store",
};

export default function Page() {
  return (
    <div>
      <div className={styles.globe} />
      
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <h1>Create <strong>New Store</strong></h1>
        </div>
        
        <div className={styles.centerList}>
          <Suspense fallback={<div>Loading...</div>}>
            <New__ModelName />
          </Suspense>
        </div>

      </div>
    
    </div>
  );
}

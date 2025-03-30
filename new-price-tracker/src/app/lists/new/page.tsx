import { Metadata } from "next"
import { Suspense } from "react"
import { New__List } from "../components/NewList"
import styles from "../../styles/Home.module.css"

export const metadata: Metadata = {
  title: "New List",
  description: "Create a new list",
}

export default function Page() {
  return (
    <div>
      <div className={styles.globe} />

      <div className={styles.wrapper}>

        <div className={styles.header}>
          <h1><strong>Create</strong> New List</h1>
        </div>

        <div className={styles.centerList}>
          <Suspense fallback={<div>Loading...</div>}>
            <New__List />
          </Suspense>
        </div>

      </div>

    </div>
  )
}

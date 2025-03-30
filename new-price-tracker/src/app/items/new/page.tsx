import { Metadata } from "next"
import { Suspense } from "react"
import { New__Item } from "../components/NewItem"
import styles from "../../styles/Home.module.css"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div>
      <div className={styles.globe} />
        <div className={styles.wrapper}>
          <div className={styles.header}>
          <h1>Create <strong>New Item</strong></h1>
          </div>

          <div className={styles.centerList}>

          <Suspense fallback={<div>Loading...</div>}>
            <New__Item />
          </Suspense>

          </div>

        </div>

    </div>
  )
}

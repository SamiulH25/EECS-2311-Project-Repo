import { Metadata } from "next"
import { Suspense } from "react"
import { New__Item } from "../components/NewItem"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div>
      <h1>Create New Project</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__Item />
      </Suspense>
    </div>
  )
}

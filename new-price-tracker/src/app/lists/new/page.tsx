import { Metadata } from "next"
import { Suspense } from "react"
import { New__List } from "../components/NewList"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div>
      <h1>Create New List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__List />
      </Suspense>
    </div>
  )
}

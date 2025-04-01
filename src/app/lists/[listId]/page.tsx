import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getList from "../queries/getList"
import { List } from "../components/List"

export async function generateMetadata(props: ListPageProps): Promise<Metadata> {
  const params = await props.params
  const List = await invoke(getList, { id: Number(params.listId) })
  return {
    title: `List ${List.id}`,
  }
}

type ListPageProps = {
  params: Promise<{ listId: string }>
}

export default async function Page(props: ListPageProps) {
  const params = await props.params
  return (
    <div>
      <p>
        <Link href={"/lists"}>Lists</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <List listId={Number(params.listId)} />
      </Suspense>
    </div>
  )
}

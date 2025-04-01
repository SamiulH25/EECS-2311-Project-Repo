"use client"
import { Suspense } from "react"
import updateStore from "../mutations/updateStore"
import getStore from "../queries/getStore"
import { UpdateStoreSchema } from "../schemas"
import { FORM_ERROR, StoreForm } from "./StoreForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import styles from "../../styles/Home.module.css"

export const EditStore = ({ storeId }: { storeId: number }) => {
  const [store, { setQueryData }] = useQuery(
    getStore,
    { id: storeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateStoreMutation] = useMutation(updateStore)
  const router = useRouter()
  return (
    <>
      <div>
        <div className={styles.globe} />
        <div className={styles.wrapper}>

          <div className={styles.header}>
            <h1><strong>Edit</strong> Store {store.id}</h1>
          </div>
            
          <div className={styles.centerList}>
            <Suspense fallback={<div>Loading...</div>}>
              <StoreForm
                submitText="Update Store"
                schema={UpdateStoreSchema}
                initialValues={store}
                onSubmit={async (values) => {
                  try {
                    const updated = await updateStoreMutation({
                      ...values,
                      id: store.id,
                    })
                    //await setQueryData(updated);
                    router.refresh()
                    router.push(`/stores/${store.id}`)
                  } catch (error: any) {
                    console.error(error)
                    return {
                      [FORM_ERROR]: error.toString(),
                    }
                  }
                }}
              />
            </Suspense>
          </div>

        </div>

      </div>
    </>
  )
}

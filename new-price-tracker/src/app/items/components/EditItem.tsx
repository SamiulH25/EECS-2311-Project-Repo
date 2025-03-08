"use client";
import { Suspense } from "react";
import updateItem from "../mutations/updateItem";
import getItem from "../queries/getItem";
import { UpdateItemSchema } from "../schemas";
import { FORM_ERROR, ItemForm } from "./ItemForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditItem = ({ itemId }: { itemId: number }) => {
  const [item, { setQueryData }] = useQuery(
    getItem,
    { id: itemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateItemMutation] = useMutation(updateItem);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Item {item.id}</h1>
        <pre>{JSON.stringify(item, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemForm
            submitText="Update Item"
            schema={UpdateItemSchema}
            initialValues={item}
            onSubmit={async (values) => {
              try {
                const updated = await updateItemMutation({
                  ...values,
                  id: item.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};

"use client";
import { FORM_ERROR, StoreForm } from "./StoreForm";
import { CreateStoreSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createStore from "../mutations/createStore";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createStoreMutation] = useMutation(createStore);
  const router = useRouter();
  return (
    <StoreForm
      submitText="Create Store"
      schema={CreateStoreSchema}
      onSubmit={async (values) => {
        try {
          const store = await createStoreMutation(values);
          router.push(`/stores/${store.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}

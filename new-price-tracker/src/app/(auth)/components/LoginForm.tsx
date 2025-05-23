"use client"
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import login from "../mutations/login"
import { Login } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { Route } from "next"
import styles from "src/app/styles/Home.module.css"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")
  return (
    <>
      <div className={styles.main}>
        <div className={styles.globe} />
          <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>Login</h1>
          </div>

          <Form className={styles.centerBox}
            submitText="Login"
            schema={Login}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await loginMutation(values)
                router.refresh()
                if (next) {
                  router.push(next as Route)
                } else {
                  router.push("/")
                }
              } catch (error: any) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={"/forgot-password"}>Forgot your password?</Link>
        </div>
          </Form>

          <div className={styles.header}>
            <div>Or <Link className={styles.textLink} href="/signup">Sign Up</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

//Home Page that User first sees when opening site

import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import styles from "./styles/Home.module.css"
import getCurrentUser from "./users/queries/getCurrentUser"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)
  return (
    <>
      <div className={styles.globe} />
      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              
              <h1>Welcome to <strong>The Price is Right</strong>!</h1>

              {/* Auth */}

              <div className={styles.buttonContainer}>
                {currentUser ? (
                  <>
                    <LogoutButton textin="Logout" />
                    <div>
                      User id: <code>{currentUser.id}</code>
                      <br />
                      User role: <code>{currentUser.role}</code>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/signup" className={styles.button}>
                      <strong>Sign Up</strong>
                    </Link>
                    <Link href="/login" className={styles.loginButton}>
                      <strong>Login</strong>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className={styles.body}>
              {/* Instructions */}
              <div className={styles.instructions}>
                <p>
                  <strong>Created By: </strong>
                </p>

                <div>
                  <div className={styles.code}>
                    <span>1</span>
                    <pre>
                      <code>Nevan Naug</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>2</span>
                    <pre>
                      <code>Anna Maximova</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>3</span>
                    <pre>
                      <code>Ashdika Siddiqee</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>4</span>
                    <pre>
                      <code>Dilpreet Bansi</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>5</span>
                    <pre>
                      <code>Samiul Hossain</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

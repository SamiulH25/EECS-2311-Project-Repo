import styles from "./styles/Home.module.css"

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
    <div className={styles.globe} />
      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <p>"Loading..."</p>
            </div>
          </div>
        </main>
      </div> 
      </>  
  )
    
}

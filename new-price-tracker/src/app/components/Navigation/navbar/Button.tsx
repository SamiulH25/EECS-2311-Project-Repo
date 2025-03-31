import styles from "src/app/styles/Home.module.css"
import Link from "next/link"

const Button = (obj: { textin: string }) => {
  return (
    <Link href="/login" className={styles.button}>
      {obj.textin}
    </Link>
  )
}
export default Button

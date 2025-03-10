import styles from "src/app/styles/Home.module.css"

const Button = ( obj:{textin: string;} ) => {
  return (
    <button className={styles.button}>
      {obj.textin}
    </button>
  );
};
export default Button;
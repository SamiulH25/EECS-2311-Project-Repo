import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import styles from "src/app/styles/Home.module.css"

const Navbar = () => {
  return (
    <>
    <div className={styles.navbar}>
      <div className={styles.buttonContainer}>
        <div>
            <ul className={styles.cleanList}>
              <li className={styles.linkContL}><Logo /></li>
              <li className={styles.linkContM}>
                <Link href="/lists">
                  <p>Shopping Lists</p>
                </Link>
              </li>
              <li className={styles.linkContM}>
                <Link href="/items">
                  <p>Items</p>
                </Link>
              </li>
              <li className={styles.linkContM}>
                <Link href="/stores">
                  <p>Stores</p>
                </Link>
              </li>
              <li className={styles.linkContM}>
                <Link href="/">
                  <p>About Us</p>
                </Link>
              </li>
              <li className={styles.linkContL}>
                <Link href="/">
                  <p>User Profile</p>
                </Link>
              </li>
              <li className={styles.linkContL}><Button textin="Sign In" /></li>
            </ul>
            
        </div>
      </div>
      </div>
    </>
  );
};

export default Navbar;
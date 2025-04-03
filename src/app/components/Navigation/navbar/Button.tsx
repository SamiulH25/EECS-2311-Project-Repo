"use client"
import styles from "src/app/styles/Home.module.css"
import Link from "next/link"
import { UrlObject } from "url";
import { useState } from "react";

const Button = (obj: {textin: string , state: boolean, link:UrlObject | __next_route_internal_types__.RouteImpl<string>}) => {

  const [value, setValue] = useState({});

  const refresh = ()=>{
      // re-renders the component
      setValue({});
  }
  
  return (
    <>
    { obj.state === true ? 
    (
        <Link onClick={refresh} href={obj.link} className={styles.button}>
          {obj.textin}
        </Link>
    ) : (
      <Link onClick={refresh} href={obj.link}>
        <p>{obj.textin}</p>
      </Link>
    )}
  </>
  )
}
export default Button

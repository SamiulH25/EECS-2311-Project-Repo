"use client"
import styles from "src/app/styles/Home.module.css"
import Link from "next/link"
import { UrlObject } from "url";

const Button = (obj: {textin: string, link:UrlObject | __next_route_internal_types__.RouteImpl<string>}) => {
  return (
      <Link href={obj.link}>
        <p>{obj.textin}</p>
      </Link>
  )
}
export default Button

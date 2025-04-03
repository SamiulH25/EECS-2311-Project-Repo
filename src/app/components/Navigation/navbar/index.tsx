import React, { useState } from "react"
import Link from "next/link"
import Logo from "./Logo"
import Button from "./Button"
import styles from "src/app/styles/Home.module.css"
import getCurrentUser from "../../../users/queries/getCurrentUser"
import { invoke } from "../../../blitz-server"
import { LogoutButton } from "../../../(auth)/components/LogoutButton"
import { UrlObject } from "url"

export default async function Navbar () {
  const currentUser = await invoke(getCurrentUser, null)

  const linkArray: {name:string, link:UrlObject | __next_route_internal_types__.RouteImpl<string>}[] = [
    {name:"About Us", link:"/"}, 
    {name:"Lists", link:"/lists"}, 
    {name:"Stores", link:"/stores"}, 
    {name:"Items", link:"/items"}, 
    {name:"User Profile", link:"/profile"} 
  ]

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.buttonContainer}>
          <div>
            <ul className={styles.cleanList}>
              <li className={styles.linkContL}>
                <Logo />
              </li>

              {linkArray.map((link) => (
                <li className={styles.linkContM} key={link.name}>
                  <Button textin={link.name} state={false} link={link.link} />
                </li>
              ))}

              <li className={styles.linkContL}>
                {currentUser ? (
                  <LogoutButton />
                ) : (
                  <Button textin="Sign In" state={true} link={"/login"} />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

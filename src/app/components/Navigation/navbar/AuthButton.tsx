import styles from "src/app/styles/Home.module.css"
import Link from "next/link"
import { UrlObject } from "url";
import { invoke } from "@/src/app/blitz-server";
import getCurrentUser from "@/src/app/users/queries/getCurrentUser";
import { LogoutButton } from "@/src/app/(auth)/components/LogoutButton";

const AuthButton = async (obj: {textin: string, link:UrlObject | __next_route_internal_types__.RouteImpl<string>}) => {
    const currentUser = await invoke(getCurrentUser, null)
    
    
    return (
        <>
            {currentUser ? (
                <LogoutButton textin={"Logout"} />
            ) : (
                <Link href={obj.link} className={styles.button}>
                    <p>{obj.textin}</p>
                </Link>
            )}
        </>
    )
}

export default AuthButton
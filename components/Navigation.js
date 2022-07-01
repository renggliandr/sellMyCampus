import Link from "next/link"
import { useGlobalContext } from "../store"
import { router } from "next/router"

import styles from "./Navigation.module.css"



export default function Navigation () {

    const { session, login, logout } = useGlobalContext()

    const logout_clicked = async () => {
        await logout();
        router.push("/")


    }


    return (
        <div className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="/postItem">Post Item</Link>
        {session && <Link href="/">Meine Artikel</Link>}
        {!session && <Link href="/login">Login</Link>}
        {session && <Link href="/"><a onClick={logout_clicked}>Logout</a></Link> }
        </div>
    )

}
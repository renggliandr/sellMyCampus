import {router} from "next/router"
import Link from "next/link";
import Button from "./Button";
import {useState} from "react";
import UsersAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import styles from "./LoginRegistration.module.css"

const regexOnlyWhiteSpace = /(?!^\s+$)^.*$/m;

const defaultUser = {
    username: "",
    password: ""
}

export default function LoginRegistration({ type }) {
    const { session, login, logout } = useGlobalContext()

    const [user, setUser] = useState(defaultUser)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [registered, setRegistered] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser(
            {
                ...user,
                ...{ [name]: value }
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateUser()) {
            setIsLoading(true)
            if (type === "login") {
                loginUser()
            }
            if (type === "sign-up") {
                registerUser()
            }
            setIsLoading(false)
        }
    }

    const loginUser = async () => {
        try {
            const response = await UsersAPI.login(user)

            if (response) {
                if (session) {
                    logout()
                }
                login(response)
                setError(null)
                router.push("/")
            }
        } catch (e) {
            setError("Der Benutzer existiert nicht oder die Eingaben sind falsch!")
        }
    }

    const registerUser = async () => {
        try {
            const newUser = await UsersAPI.signUp(user)
            if (newUser) {
                setRegistered(true)
            }
        } catch (a) {
            setError("Benutzer konnte nicht erstellt werden!")
        }
    }

    const validateUser = () => {
        if (!regexOnlyWhiteSpace.test(user.username) || user.password === "" || !regexOnlyWhiteSpace.test(user.password)) {
            setError("Bitte geben sie einen gültigen Username und Passwort ein!")
            return false
        } else {
            setError(null)
            return true
        }
    }

    return (
        !registered ?
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} type="text"
                        name="username" placeholder="Username" />
                </div>

                <div>
                    <input onChange={handleChange} type="password"
                        name="password" placeholder="Password" />
                </div>
                <Button disabled={isLoading} type={"submit"} text={type === "login" ? "Login" : "Create User"}>
                    {isLoading ? "...Loading" : "Login"}
                </Button>
                {error && <div className={styles.error}>{error}</div>}
                {type === "login" &&
                    <Link href={"/sign-up"}><a className={styles.link}>Benutzer erstellen</a></Link>}
            </form> :
            <div className={styles.registered}>
                <h1>User wurde erfolgreich erstellt</h1>
            </div>
    )
}
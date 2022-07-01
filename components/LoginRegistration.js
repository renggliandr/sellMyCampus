import {router} from "next/router"
import Link from "next/link";
import Button from "./Button";
import {useState} from "react";
import UsersAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import styles from "./LoginRegistration.module.css"

const regexOnlyWhiteSpace = /(?!^\s+$)^.*$/m;



export default function LoginRegistration({ type, users }) {
    const { session, login, logout } = useGlobalContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [registered, setRegistered] = useState(false)

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

    const loginUser = () => {
        
        let response = null
        let id = 0
        console.log(users)

        for(let i = 0; i < users.users.length; i++){
            console.log(users.users[i])
            if(users.users[i].username == username){
                if(users.users[i].password == password){
                    response = "Treffer"
                    id = users.users[i].id
                }
            }
        }

        if (response) {
            if (session) {
                logout()
            }
            console.log(id)
            const user = {
                "username": username,
                "password": password,
                "id": id
            }
            login(user)
            setError(null)
            router.push("/")
        } else{
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
        if (!regexOnlyWhiteSpace.test(username) || password === "" || !regexOnlyWhiteSpace.test(password)) {
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
                    <input onChange={(e) => setUsername(e.target.value)} type="text"
                        name="username" placeholder="Username" />
                </div>

                <div>
                    <input onChange = {(e) => setPassword(e.target.value)} type="password"
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
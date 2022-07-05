import {router} from "next/router"
import Link from "next/link";
import Button from "./Button";
import {useState} from "react";
import UsersAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import styles from "./LoginRegistration.module.css"

const regexOnlyWhiteSpace = /(?!^\s+$)^.*$/m;



export default function LoginRegistration({ type, users, highestId }) {
    const { session, login, logout } = useGlobalContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
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
        let idNew
        for(let i = 0; i<users.length; i++)
        {
            if(users[i].published == highestId[0]){
                idNew = (parseInt(users[i].id) + 1).toString()
            }
        }

        let today = new Date(), 
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

        const user = {
            "username": username,
            "password": password,
            "published": date
        }
        
        let newUser = null
        try {
            setRegistered(true)
            newUser = await UsersAPI.signUp(user)
           
        } catch (a) {
        }

        if (newUser) {
            setRegistered(true)
        } else{
            //setError("Benutzer konnte nicht erstellt werden!")
        }
    }

    const validateUser = () => {
        if (!regexOnlyWhiteSpace.test(username) || password === "" || !regexOnlyWhiteSpace.test(password)) {
            setError("Bitte geben sie einen gültigen Username und Passwort ein!")
            return false
        } 
        if (type === "sign-up") {
            if(password != passwordConfirmation){
                setError("Passwort stimmt nicht überein")
                return false
            }
        }

        setError(null)
        return true
        
    }

    return (
        !registered ?
            <div>
                {type === "login" &&
                    <h1>Login</h1>}
                {type === "sign-up" &&
                <h1>Neuen User Erstellen</h1>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <input onChange={(e) => setUsername(e.target.value)} type="text"
                            name="username" placeholder="Username" />
                    </div>

                    <div className={styles.input}>
                        <input onChange = {(e) => setPassword(e.target.value)} type="password"
                            name="password" placeholder="Password" />
                    </div>
                    {type === "sign-up" &&
                    <div className={styles.input}>
                        <input onChange = {(e) => setPasswordConfirmation(e.target.value)} type="password"
                            name="passwordConfirmation" placeholder="Password Confirmation" />
                    </div>}
                    <Button disabled={isLoading} type={"submit"} text={type === "login" ? "Login" : "Create User"}>
                        {isLoading ? "...Loading" : "Login"}
                    </Button>
                    {error && <div className={styles.error}>{error}</div>}
                    {type === "login" &&
                        <p>Sind Sie neu hier? <Link href={"/sign-up"}><a className={styles.linkLogin}>Hier können Sie einen neuen Account erstellen!</a></Link></p>}
                    {type === "sign-up" &&
                    <p>Haben Sie bereits ein Account? <Link href={"/login"}><a className={styles.linkLogin}>Hier geht es zum Login!</a></Link></p>}
                </form>
            </div>
                 :
            <div className={styles.registered}>
                <h1>User wurde erfolgreich erstellt</h1>
            </div>
    )
}
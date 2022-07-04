import jwtDecode from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

const STORAGE_KEY = "session"

const useSession = () => {

    const[loading, setLoading] = useState(true)
    const[session, setSession] = useState(null)

    const login = (_session) => {
        setSession(_session)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_session))
    }

    const logout = () => {
        setSession(null)
        localStorage.removeItem(STORAGE_KEY)
    }

    useEffect(() => {
        if (!window) return
        const session = JSON.parse(localStorage.getItem(STORAGE_KEY))
  


        if (session !== null) {
        /*
            const { exp } = jwtDecode(session.accessToken)
            const d = new Date(0)
            d.setUTCSeconds(exp)
            const now = new Date()

            if (now >= d) {
                console.log("jwt expired")
                logout()
                return
            }
        */
            login(session)
        }

        setLoading(false)
    }, [])

    return { session, login, logout, loading }
}

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = ({ children }) => {
    const state = useSession()
    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider

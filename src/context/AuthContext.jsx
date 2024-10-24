import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext(null)

const useAuth = () => {
    return(
        useContext(AuthContext)
    )
}
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const cancelaSuscripcion = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return cancelaSuscripcion
    },[])
    return(
        <AuthContext.Provider value={{user:user}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext, useAuth }
import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const cerrarSesion = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            // console.error('Error al cerrar sesión:', error)
        }
    }
    
    useEffect(() => {
        const cancelaSuscripcion = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return cancelaSuscripcion
    },[])
    
    return(
        <AuthContext.Provider value={{ user, loading, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext, useAuth }
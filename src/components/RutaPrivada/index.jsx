import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const RutaPrivada = ({ children }) => {
    const { user, loading } = useAuth()
    
    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return <div>Cargando...</div>
    }
    
    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
        return <Navigate replace to="/signin"/>
    }
    
    return children
}
export default RutaPrivada
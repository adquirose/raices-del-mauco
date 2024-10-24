import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const RutaPrivada = ({ children }) => {
    const { user } = useAuth()
    
    if(user){
        return(children)
    }else{
        return <Navigate replace to="/signin"/>
    }
    
}
export default RutaPrivada
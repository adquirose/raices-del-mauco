import IconoCerrarSesion from './../../assets/imagenes/log-out.svg?react'
import Button from '../../elements/Button'
import { auth } from '../../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const BotonCerrarSesion = () => {
    const navigate = useNavigate()
    const cerrarSesion = async() => {
        try{
            await signOut(auth)
            navigate('/signin')
        }catch(error){
            // console.log(error)
        }
    }
    return(
        <Button onClick={cerrarSesion}>
            <IconoCerrarSesion/>
        </Button>
    )
}
export default BotonCerrarSesion
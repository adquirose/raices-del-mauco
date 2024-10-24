import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { Link } from 'react-router-dom';
import ImgLogo from '../assets/logo-color.png'

import Alerta from '../components/Alerta'
import theme from '../constants';

const Container = styled.div`
    background:gray;
    display:flex;
    flex-direction:column;
    width:100vw;
    height:100vh;
    justify-content:center;
    align-items:center;
`
const Formulario = styled.form`
    max-width:340px;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius:5px;
`;
const ContenedorBoton = styled.div`
    display: flex;
    justify-content: center;
    margin: 2.5rem 0;  /* 40px */
`;
export const Input = styled.input`
    background: ${theme.grisClaro};
    cursor: pointer;
    margin: 0.25rem 0;
    border-radius: 0.25rem;
    border:none;
    height: 2.25rem; 
    width: 70%;
    padding: 0 1.25rem; 
    font-size: 1rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
const Logo = styled.img`
    width:100%;
    max-width:250px;
    padding-bottom:36px;
`
Logo.defaultProps={
    src:ImgLogo
}
const Button = styled(Link)`
    background: ${(props) => (props.$primario ? '#5B69E2' : '#000')};
    width: ${(props) => props.$conIcono ? '15.62rem' : 'auto'}; /* 250px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
 
    svg {
        height: ${(props) => props.$iconoGrande ? '100%' : '0.75rem;'};  /* 12px */
        fill: white;
    }
`;

const INITIAL_STATE_ALERTA = {
    active: false, tipo:'', mensaje:'' 
}
const SignIn = () => {
    const [data, setData] = useState({email:'', password:''})
    const [alerta, setAlerta] = useState(INITIAL_STATE_ALERTA)

    const navigate = useNavigate()

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        setAlerta({ ...INITIAL_STATE_ALERTA })

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(email)){
            setAlerta({active:true, tipo:'error', mensaje:'Correo no es valido'})
            return
        }
        if(email === '' || password === ''){
            setAlerta({active:true, tipo:'error', mensaje:'Rellena todos los campos'})
            return
        }
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setAlerta({active:true, mensaje:'Usuario registrado', tipo:'exito'})
            navigate('/lista-de-lotes')
        } catch(error){
            let mensaje 
            switch(error.code){
				case 'auth/wrong-password':
					mensaje = 'La contraseña no es correcta'
					break;
				case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este email'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
			}
            setAlerta({active:true, mensaje, tipo:'error'})
        }
    }
    const handleOnChange = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }
    const { email, password } = data 
    return(
        <Container>
            <Logo/>
            <Formulario onSubmit={handleOnSubmit}>
                
                <Input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder='Correo Electronico'/>
                <Input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder='Contraseña'
                />
                <ContenedorBoton>
                    <Button as="button" type="submit" $primario>Iniciar Sesion</Button>
                </ContenedorBoton>
            </Formulario>
            <Alerta alerta={alerta} setAlerta={setAlerta}/>
        </Container>
    )
}
export default SignIn
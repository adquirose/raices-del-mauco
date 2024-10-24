/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from 'axios'
import { ProyectoContainer } from "../Proyecto";
import Alerta from "../Alerta";
import styled from "styled-components";
import theme from "../../constants";
import { MobileContact, Email } from '../Icons'

const INITIAL_STATE = {
    nombre:'',
    email:'',
    telefono:'',
    mensaje:'',
}
const INITIAL_STATE_ALERTA = {
     active:false, mensaje:'', tipo:''
}
const Form = styled.form`
    width:100%;
    display:flex;
    flex-direction:column;
    
    
`

const Input = styled.input`
    background: ${theme.grisClaro};
    cursor: pointer;
    border-radius: 0.25rem;
    border: none;
    height:38px;
    
    max-width:100%;
    padding-left:0.75rem;
    font-size: 1.2rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`
const Textarea = styled.textarea`
    height:120px;
    background: ${theme.grisClaro};
    cursor: pointer;
    border-radius: 0.25rem;
    border: none;
    max-width:100%;
    font-family:'Work Sans', sans-serif; 
    padding-left:0.75rem;
    padding-top:0.75rem;
    font-size: 1.2rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
    
`
const InputLabel = styled.div`
    display:flex;
    flex-direction:column;
    min-height:60px;
    padding:0.25rem 0;
    &:last-child{
       
    }
`
const Button = styled.button`
    border-radius:5px;
    padding:0.75rem 0.75rem;
    background-color: ${props => props.disabled ? ' lightblue': 'green'};
    color:white;
    font-size: 1rem;
    border:none;
    cursor:pointer;
    height:2.5rem;
    width:120px;

    transition: .5s ease all;
    &:hover{
        background-color:rgba(blue,0.25);
    } 
`
const Anchor = styled.a`
    text-decoration:none;
    color:black;
    padding-top:6px;

`
const Contacto = () => {
    const [data, setData] = useState({...INITIAL_STATE})
    const [alerta, setAlerta] = useState({...INITIAL_STATE_ALERTA})
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (event) => {
        setData({...data, [event.target.name]:event.target.value})
    }
    const handleOnsubmit = (event) => {
        event.preventDefault()
        const { nombre, email, telefono, mensaje } = data 
        const msj = `
            <div>
                <p>Nombre: ${nombre} </p>
                <p>Email: ${email} </p>
                <p>Telefono: ${telefono}</p>
                <p>Mensaje: ${mensaje}</p>
            </div>
        `
    
        const info = {
            to:'contacto@raicesdemauco.cl',
            replyTo: email,
            subject:'Formulario Contacto',
            text:'Santa María',
            html: msj,
            nombre: nombre,
            email: email,
            telefono:telefono,
        }
        setIsLoading(true)
        axios.post('https://us-central1-firemailer.cloudfunctions.net/submitContactoFZ', info,{ headers: { "Access-Control-Allow-Origin": "*" }})
            .then(res => {
                console.log(res.data.message)
                setIsLoading(false)
                setAlerta({tipo:'exito', mensaje:'Mensaje enviado', active:true})
                
            })
            .catch(err => {
                console.log(`ha ocurrido un error ${err}`)
                setAlerta({tipo:'error', mensaje:'Ocurrio un error', active:true})
            })
            setData({...INITIAL_STATE})  
    }
    const { nombre, email, telefono, mensaje } = data
    const isDisabled = nombre === '' || email === '' || telefono === '' 
    return(
        <>
            <ProyectoContainer>
                <Form onSubmit={handleOnsubmit}>
                    <h2>Para más información</h2>
                    <InputLabel>
                        <Input type="text" name="nombre" placeholder="Tu Nombre" onChange={handleOnChange} value={nombre}/>
                    </InputLabel>
                    <InputLabel>
                        <Input type="email" name="email" placeholder="Tu Email" onChange={handleOnChange} value={email}/>
                    </InputLabel>
                    <InputLabel>
                        <Input type="text" name="telefono" placeholder="Tu Telefono" onChange={handleOnChange} value={telefono}/>
                    </InputLabel>
                    <InputLabel>
                        <Textarea type="textarea" name="mensaje" placeholder="Mensaje" onChange={handleOnChange} value={mensaje}/>
                    </InputLabel>
                    <InputLabel>
                        <Button disabled={isDisabled} type="submit"> {isLoading ? 'Enviando...' : 'Enviar'}</Button>
                    </InputLabel>
                </Form>
                <div>
                    <div onClick={() => window.open('tel:+56946346676')} style={{display:'flex', alignItems:'center', cursor:'pointer'}}>
                        <MobileContact width="32" height="32" strokewidth="2"/>
                        <div style={{paddingLeft:12}}>
                            <p style={{margin:0}}>+569 4634 6676</p>
                        </div>
                    </div>
                    <Anchor  href="mailto:contacto@raicesdemauco.cl" style={{display:'flex', alignItems:'center', cursor:'pointer'}}>
                        <Email width="32" height="32" strokewidth="2"/>
                        <div style={{paddingLeft:12}}>
                            <p style={{margin:0}}>contacto@raicesdemauco.cl</p>
                        </div>
                    </Anchor>
                </div>
            </ProyectoContainer>
            <Alerta alerta={alerta} setAlerta={setAlerta}/> 
        </>
    )
}
export default Contacto
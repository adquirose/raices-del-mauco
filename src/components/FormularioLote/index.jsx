/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import agregarLote from '../../firebase/agregarLote'
import Alerta from '../Alerta'
import { getUnixTime } from 'date-fns'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { fromUnixTime } from 'date-fns'
import editarLote from '../../firebase/editarLote.js'
import SelectEstados from '../SelectEstados/index.jsx'
import theme from '../../constants'

const FormContainer = styled.div`
    border: 1px solid gray;
    max-width:360px;
    width: 100%;
    max-height: 620px;
    min-height:310px;
    overflow-y:auto;
    box-shadow: 0 1.25rem 2.5rem rgba(0,0,0,.05);
    border-radius: 0.625rem;
    padding: 1.25rem;
   
    @media(max-width:420px){
        padding: 16px;
        max-width:320px;
    }
`
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
   
`
const Form = styled.form`
    height:100%;
    max-width:100%;
    display:grid;
    grid-gap:2px;
    grid-template-columns:repeat(auto-fill,minmax(320px, 1fr));
    
    grid-auto-rows:auto;
`
const Label = styled.label`
    max-width:190px;
    min-width:180px;
    font-size: 1.25rem; 
    align-self:center;
    margin-right:1rem;
`
const Input = styled.input`
    background: ${theme.grisClaro};
    cursor: pointer;
    min-width:40px;
    max-width:240px;
    width:100%;
    border-radius: 0.25rem;
    border: none;
    position: relative;
    height: 36px; 
    padding-left:1.25rem;
    font-size: 1rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`
const TextArea = styled.textarea`
    background: ${theme.grisClaro};
    cursor: pointer;
    border-radius: 0.25rem;
    border: none;
    max-height: 120px; 
    width:100%;
    min-width: 320px;
    box-sizing:border-box;
    padding-left:1.25rem;
    margin-top:0.5rem;
    padding-top:1rem;
    
    font-size: 1.25rem; 
    font-family:'Work Sans', sans-serif; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
    @media(max-width:420px){
        padding: 16px;
    }
`
const InputLabel = styled.div`
    display:flex;
    width:100%;
    margin:0.25rem 0;
    box-sizing:border-box;
`
const Button = styled.button`
    border-radius:5px;
    padding:0.75rem 0.75rem;
    background-color: lightblue;
    color:white;
    font-size: 1rem;
    border:none;
    cursor:pointer;
    height:3rem;
    transition: .5s ease all;
    &:hover{
        background-color:blue;
    }
    
`
const INITIAL_STATE_LOTE = {
    ath:'',
    atv:'',
    nombreSpot:'',
    estado:'disponible',
    nombreLote:'',
    valor:'',
    superficie:'',
    superficieUtil:'',
    fecha: new Date()
}
const INITIAL_STATE_ALERTA = {
    active: false, tipo:'', mensaje:'' 
}
const FormularioLote = ({lote}) => {

    const [data, setData] = useState({...INITIAL_STATE_LOTE})
    const [alerta, setAlerta] = useState({...INITIAL_STATE_ALERTA})
    const navigate = useNavigate()
    const { user } = useAuth()
    
    useEffect(() => {
        if(lote){
            if(user.uid){
                setData({            
                    nombreLote: lote.data().nombreLote,
                    valor: lote.data().valor,
                    estado:lote.data().estado,
                    fecha: fromUnixTime(lote.data().fecha),
                    ...lote.data()
                })
            }else{
                navigate('/lista-de-lotes')
            }
        }
    },[lote, user, navigate])
    const handleChange = event => {
        setData({
            ...data, 
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        const { fecha, valor, estado, nombreLote, superficie, superficieUtil } = data 
        const newLote = { valor, estado, nombreLote, superficie, superficieUtil, fecha: getUnixTime(fecha), uid:user.uid }
        if(lote){
            editarLote({
                ...data,
                id:lote.id,
                fecha:getUnixTime(data.fecha)
            }).then(() => {
                setAlerta({active: true, tipo:'exito', mensaje:'Lote actualizado' })
            }).then(() => {
                navigate("/lista-de-lotes")
        }).catch((error) => console.log(error))
        }else{
            agregarLote(newLote)
                .then(() => {
                    setData({...INITIAL_STATE_LOTE})
                    setAlerta({active: true, tipo:'exito', mensaje:'Se ha creado un lote en el masterplan' })
                })
                .catch((error)=> {
                    setAlerta({active: true, tipo:'error', mensaje:`Ocurrio un error: ${error}` })
                })
        }
    }
    return(
        <Container>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <InputLabel>
                        <Label>Nombre del Lote:</Label>
                        <Input type="text" name="nombreLote" value={data.nombreLote} onChange={handleChange} placeholder="Nombre Lote"/>
                    </InputLabel>
                    <InputLabel>
                        <Label>Valor:</Label>
                        <Input type="text" name="valor" value={data.valor} onChange={handleChange} placeholder="Valor UF"/>
                    </InputLabel>
                    <InputLabel>
                        <Label>Estado:</Label>
                        <SelectEstados data={data} setData={setData}/>
                    </InputLabel>
                    <InputLabel>
                        <Label>Superficie M2</Label>
                        <Input type="text" name="superficie" value={data.superficie} onChange={handleChange} placeholder="Superficie M2"/>
                    </InputLabel>
                    <InputLabel>
                        <Label>Sup. Util M2</Label>
                        <Input type="text" name="superficieUtil" value={data.superficieUtil} onChange={handleChange} placeholder="Superficie Util M2"/>
                    </InputLabel>
                    
                    <InputLabel>
                        <Button type="submit">{lote ? 'Actualizar': 'Crear Lote'}</Button>
                    </InputLabel>
                    
                </Form>
                <Alerta alerta={alerta} setAlerta={setAlerta}/>
            </FormContainer>
        </Container>
    )
}
export default FormularioLote
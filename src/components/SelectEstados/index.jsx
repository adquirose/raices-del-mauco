/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import theme from "../../constants";
import IconoDown from './../../assets/imagenes/down.svg?react'

const ContenedorSelect = styled.div`
    background: ${theme.grisClaro};
    cursor: pointer;
    
    border-radius: 0.25rem; 
    position:relative;
    height: 100%; 
    min-width:120px;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1rem; 
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
 
const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    height:36px;
    justify-content: space-between;
    svg {
        width: 1rem;
        height: auto;
        margin-left: 1.25rem;
    }
`;
 
const Opciones = styled.div`
    background: ${theme.grisClaro};
    position: absolute;
    top: 2.5rem;
    z-index:100;
    left: 0;
    width: 100%;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;
 
const Opcion = styled.div`
    padding: 0.6rem 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
// eslint-disable-next-line react/prop-types
const SelectEstados = ({ data, setData }) => {

    const [mostrarSelect, setMostrarSelect] = useState(false)
    
    const estados = [
        {id: 'disponible', texto: 'Disponible'},
        {id: 'vendido', texto: 'Vendido'},
        {id: 'reservado', texto: 'Reservado'},
        {id: 'nodisponible', texto: 'NoDisponible'},
    ]
    const handleOnClick = (event) => {
        setData({...data, estado: event.currentTarget.dataset.valor})
    }
    
    return(
        <ContenedorSelect onClick={() => setMostrarSelect(!mostrarSelect)}>
            <OpcionSeleccionada>
                {data.estado}
                <IconoDown/>
            </OpcionSeleccionada>
            {mostrarSelect && 
                <Opciones>
                    {estados.map( estado => 
                        <Opcion
                            onClick={handleOnClick}
                            key={estado.id}
                            data-valor={estado.id}
                            >
                                {estado.texto}
                        </Opcion>)
                    }
                </Opciones>
            }
        </ContenedorSelect>
    )
}
export default SelectEstados
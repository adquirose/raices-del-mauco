/* eslint-disable react/prop-types */
import styled, { keyframes } from 'styled-components'
import { Menu2, ERemove } from '../Icons'
import { useState, useEffect } from 'react'
import useScreenSize from '../../hooks/useScreenSize';

const slideIn = keyframes`
    0% {
        transform: translateX(-280px); 
        opacity: 0;
    }
    100% {
        transform: translateX(10px);
        opacity: 1;
    }
`;
const slideOut = keyframes`
    0% {
        transform: translateX(0px); 
        opacity: 1;
    }
    100% {
        transform: translateX(-280px);
        opacity: 0;
    }
`;
const ContainerNav = styled.div`
    width:280px;
    opacity:0;
    position:absolute;
    top:10px;
    z-index:4;
    border-radius:7px;
    background-color:rgba(255,255,255,0.7);
    animation:${props => props.$animation} 0.5s;
    animation-fill-mode: forwards;
`
const List = styled.ul`
    margin:0;
    padding:3rem 0;
    list-style:none;
    display:flex;
    flex-direction:column;
    justify-content:start;
    height:100%;
    width:100%;
`
const Item = styled.li`
    padding: 0.5rem 1.75rem;
    line-height:2;
    font-size:1.25rem;
    color:black;
    cursor:pointer;
    &:hover{
        color:white;
        background-color:gray;
    } 
`
const Button = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    padding:0;  
`

const Navbar = ({handleClick}) => {
    const [activo, setActivo] = useState(false)
    const [animation, setAnimation] = useState(null)
    const { width } = useScreenSize()

    useEffect(() => {
        if(width > 500){
            setAnimation(slideIn)
            setActivo(true)
        }else{
            setAnimation(slideOut)
            setActivo(false)
        }
    },[width])

    const handleAnimation = () => {
        if(!activo){
            setAnimation(slideIn)
            setActivo(true)  
        }else{
            setAnimation(slideOut)
            setActivo(false)
        }
    }

    return(
        <>  
            <ContainerNav $animation={animation}>
                <div style={{position:'absolute', top:'10px', right:'10px', zIndex:'10'}}>
                    <Button onClick={handleAnimation}>
                        <ERemove width={32} height={32}/>
                    </Button>
                </div>
                <List>
                    <Item onClick={() => handleClick('proyecto')}>Proyecto</Item>
                    <Item onClick={() => handleClick('ubicacion')}>Ubicación</Item>
                    <Item onClick={() => handleClick('galeria')}>Galeria</Item>
                    <Item onClick={() => handleClick('contacto')}>Contacto</Item>
                    <Item onClick={() => handleClick('entorno')}>Entorno</Item>
                </List>
            </ContainerNav>
    
        {!activo && 
            <div style={{position:'absolute', top:'10px', left:'10px', zIndex:'10'}}>
                <Button onClick={handleAnimation}>
                    <Menu2 fill="white" width={42} height={42}/>
                </Button>
            </div>
        }
        </>
    )
}
export default Navbar
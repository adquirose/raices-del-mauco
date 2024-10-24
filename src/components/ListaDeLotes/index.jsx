import useObtenerLotes from "../../hooks/useObtenerLotes"
import styled from "styled-components"
import IconoFlecha from '../../assets/imagenes/flecha.svg?react';
import { Link, useNavigate } from "react-router-dom"
import IconoEditar from '../../assets/imagenes/editar.svg?react'
// import IconoBorrar from '../../assets/imagenes/borrar.svg?react'
// import borrarLote from '../../firebase/borrarLote'
// import convertirAMoneda from "../../functions/convertirAMoneda"
import theme from "../../constants";
import BotonCerrarSesion from "../BotonCerrarSesion";
import Button from "../../elements/Button";

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
`
const Header = styled.div`
    position:fixed;
    z-index:20;
    background:white;
    width:100%;
    height:60px;
    display:flex;
    justify-content:space-around;
    align-items:center;   
`
const ContainerTitulo = styled.div`
    display: grid;
    grid-template-columns: minmax(30px,1fr) minmax(100px,1fr) minmax(100px,1fr) minmax(90px,1fr);
    position:fixed;
    z-index:20;
    background:white;
    min-width:360px;
    max-width:720px;
    width:100%;
    height:60px;
    top:60px;
`
const Lista = styled.ul`
    min-width:360px;
    max-width:720px;
    width:100%;
    list-style: none;
    padding-top:120px !important;
    padding-left:0;
    overflow-y:auto;
    margin:0;
    @media(max-width: 380px){
        padding: 0;
    }
`;
const Item = styled.li`
    position:relative;
    background:white;
    z-index:1;
    padding: 1rem 0;
    border-bottom: 2px solid #F2F2F2;
    display: grid;
    grid-template-columns: minmax(30px,1fr) minmax(100px,1fr) minmax(100px,1fr) minmax(90px,1fr);
    gap: 5px;
    &:hover button,
    &:hover a {
        opacity: 1;
    }
    
`;
const Icono = styled(IconoFlecha)`
    width: 50%;
    height: auto;
    fill: #fff;
`;
const Span = styled.span`
    font-size: 1.25rem;
    text-transform: capitalize;
    width: 100%;
    text-align:center;
    line-height:2;
`;
  
const ContenedorBotones = styled.div`
    display:flex;
    justify-content:center;
    @media (max-width: 50rem) { /* 80px */
        justify-content: end;
    }
`;
 
const BotonAccion = styled.button`
    outline: none;
    background: ${theme.grisClaro};
    border: none;
    width: 2.5rem; /* 40px */
    display: inline-block;
    height: 2.5rem; /* 40px */
    line-height: 2.5rem; /* 40px */
    font-size: 16px;
    cursor: pointer;
    border-radius: 0.31rem; /* 5px */
    margin-left: 0.625rem; /* 10px */
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
 
    &:hover {
        background: ${theme.grisClaro2};
    }
 
    svg {
        width: 1.125rem; /* 18px */
    }

`;
 
const ContenedorSubtitulo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
 
const Subtitulo = styled.h3`
    color: ${theme.grisClaro2};
    font-weight: 400;
    font-size: 40px;
    padding: 2.5rem 0; /* 40px */
`;
 

const ListaDeLotes = () => {
    const lotes = useObtenerLotes()
    const navigate = useNavigate()
    return(
        <Container>
            <Header>
                <Button onClick={({ruta="/"}) => navigate(ruta)}>
                    <Icono/>
                </Button>
                <BotonCerrarSesion/> 
            </Header>
            <ContainerTitulo>
                    <Span>Lote</Span>
                    <Span>Estado</Span>
                    <Span>Valor UF</Span>
                    <Span>Editar</Span>
            </ContainerTitulo>
            <Lista>
                {lotes.map((lote) => {
                    return(
                        <Item key={lote.id}>
                            <Span>
                                {lote.nombreLote}
                            </Span>
                            <Span>
                                {lote.estado}
                            </Span>
                            <Span>
                            {Number(lote.valor)}
                            </Span>
                            <ContenedorBotones>
                                <BotonAccion to={`/edit/${lote.id}`} as={Link}><IconoEditar/></BotonAccion>
                                {/* <BotonAccion onClick={() => borrarLote(lote.id)}>
                                    <IconoBorrar/>
                                </BotonAccion> */}
                            </ContenedorBotones>
                        </Item>
                    
                    )
                })}
                
                {lotes.length === 0 && 
                    <ContenedorSubtitulo>
                        <Subtitulo>Cargando...</Subtitulo>
                        
                    </ContenedorSubtitulo>
                }
            </Lista>
        </Container>
    )
}
export default ListaDeLotes
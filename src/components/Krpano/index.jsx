/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import useKrpano from 'react-krpano-hooks'
import styled, { keyframes } from 'styled-components'
import BtnUser from '../../elements/BtnUser'
import useObtenerLotes from '../../hooks/useObtenerLotes'
import { LogoWhatsapp } from '../Icons' 

const slideIn = keyframes`
    0% {
        transform: translateX(-340px); 
        opacity: 0;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;
const KrpanoContainer = styled.div`
    width:100%;
    height:100%;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    position:relative;
`
const FichaContainer = styled.div`
    -webkit-box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    -moz-box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    width:340px;
    height:310px;
    background-color:rgba(255,255,255,0.95);
    border-radius:5px;
    display:flex;
    flex-direction:column;
    position:relative;
    top:calc(50vh - 160px);
    padding:0.5rem;
    left:5px;
    animation:${slideIn} 1s;
    position:absolute;
    z-index:5;
`
const Button = styled.button`
    border:none;
    padding:0.5rem 1rem;
    max-width:120px;
    border-radius:5px;
    background:${props => props.$background ? props.$background :'#5B69E2'};
    color:${props => props.color ? props.color: 'white'};
    cursor:pointer;
    font-size:0.75rem;

`
const Image = styled.img`
    width:100%;
    src:${props => props.src};
`
const ButtonGroup = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding-top:18px;
    box-sizing:border-box;
    width:auto;
`
const ContainerTitulo = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    box-sizing:border-box;
    padding:0 1rem;
`
const Titulo = styled.h2`
    font-size:2rem;
    font-weight:500;
    color:black;
    margin:0;
    line-height:1.75;
`
const P = styled.p`
    font-size: 1rem;
    margin:0.5rem 0;
    text-transform:capitalize;   
`
const ContainerText = styled.div`
    height:175px;
    width:100%;
    overflow-y:auto;
    box-sizing:border-box;
    padding:0 1rem;
`
const linkWs = id => {
    return `https://wa.me/56946346676?text=Hola%20Estoy%20interesado%20en%20el%20lote%20${id}`
}
const Ficha = ({ dataLote = {}, setVisibleFicha, visibleFicha }) => {
    const formatter = new Intl.NumberFormat('de-DE', {});
    const valor = formatter.format(dataLote.valor)
    const superficie = formatter.format(dataLote.superficie)
    const superficieUtil = formatter.format(dataLote.superficieUtil)
    const estado = dataLote.estado == 'nodisponible' ? 'No disponible' : dataLote.estado
    return(
        <FichaContainer $visibleFicha={visibleFicha}>
            {/* <Image src={`images/fichas/foto${dataLote.html}.jpg`}/> */}
            <ContainerTitulo>
                <Titulo>Lote {dataLote.nombreLote}</Titulo>
                <Button $background="none" onClick={() => window.open(linkWs(dataLote.html),'blank')}>
                    <LogoWhatsapp fill="black" width="36" height="36"/>
                </Button>
            </ContainerTitulo>
            <ContainerText>
                <P>Estado: { estado }</P>
                <P>Valor: UF { valor }</P>
                <P>Superficie ROL: { superficie } M2</P>
                <P>Superficie Util: { superficieUtil } M2</P>
                <P>{dataLote.caracteristica}</P>
            </ContainerText>
            <ButtonGroup>
                <Button type="Button" onClick={() => setVisibleFicha(!visibleFicha)}>CONTINUAR</Button>
                <Button $background="gray" disabled type="Button" onClick={() => window.open('/plano.pdf')}>DESCARGAR PLANO</Button>
            </ButtonGroup> 
        </FichaContainer>
    )
}
// const slideOut = keyframes`
//     0% {
//         transform: translateX(20px); 
//         opacity: 1;
//     }
//     100% {
//         transform: translateX(-340px);
//         opacity: 0;
//     }
// `;


const Krpano = () => {
    const lotes = useObtenerLotes()
    const [nombreEscena, setNombreEscena] = useState('')
    const [visibleFicha, setVisibleFicha] = useState(false)
    const [nombreSpotFicha, setNombreSpotFicha] = useState('')
    const [loteFiltrado, setLoteFiltrado] = useState({})

    const { containerRef, callKrpano } = useKrpano({
        height:'100%', width:'100%',
        globalFunctions:{
            mostrarFicha: (nombreHs) => {
                setNombreSpotFicha(nombreHs) 
                setVisibleFicha(true)
            },
            nameScene: (escena) => {
                setNombreEscena(escena)
            }
        }
    })
    
    useEffect(() => {
        const crearSpots = () => {
            lotes.map((lote) => {
                callKrpano(`crear_hs(${lote.nombreSpot}, ${lote.ath}, ${lote.atv}, ${lote.estado}, ${lote.html});` )
            })
        }
        if(nombreEscena === 'scene_master'){
            crearSpots()
        }
    },[callKrpano, lotes, nombreEscena])

    useEffect(()=> {
        const filtroLote = (nombreHs) => lotes.find((lote) => lote.nombreSpot === nombreHs) 
        setLoteFiltrado(filtroLote(nombreSpotFicha))
       
    },[nombreSpotFicha, lotes])

    return(
        <KrpanoContainer>
            <div ref={containerRef}/>
            {visibleFicha && 
                <Ficha dataLote={loteFiltrado} visibleFicha={visibleFicha} setVisibleFicha={setVisibleFicha}/> } 
            <BtnUser/>
        </KrpanoContainer>   
    )
}
export default Krpano


import styled from "styled-components"
import Logo from "../../assets/logo-color.png"
import { MobileContact } from '../Icons'

export const ProyectoContainer = styled.div`
    max-width:520px;
    min-width:340px;
    width:90%;
    height:100%;
    max-height:560px;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    z-index:6;
    justify-self:center;
    align-self:center;
    border-radius:7px;
    box-shadow: 4px 9px 50px -10px rgba(0,0,0,0.85);
    background-color:white;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding-left:1rem;
    padding-right:1rem;
    padding-top:0;
    @media(max-width:420px){
        padding:0.75rem;
        max-height:480px;
       
    }
`
const Parrafo = styled.p`
    padding: 0.5rem 0.5rem;
    text-align:${ props => props.$textAlign ? props.$textAlign : 'justify'};
    margin:0;
    font-size:${ props => props.$fontSize ? props.$fontSize : '1rem'};
    font-weight:${ props => props.$fontWeight ? props.$fontWeight : 'normal'}
`
// const Titulo = styled.h2`
//     font-size:${ props => props.$fontSize ? props.$fontSize : '1.75rem'};
//     font-weight:600;
//     margin:0;
// `
const Subtitulo = styled.h3`
    font-size:1.25rem;
    font-weight:600;
    margin-top:7px;
`
const Proyecto = () => {
    return(
        <ProyectoContainer>
            <img src={Logo} alt="logo-proyecto" style={{width:'180px'}}/>
            <Subtitulo>Naturaleza y Tranquilidad a tu Alcance</Subtitulo>
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Ubicación privilegiada</Parrafo>
                <Parrafo>
                    A solo 5 km de la rotonda de Concón, en el sector Las Gaviotas, comuna de
                    Quintero. Raíces del Mauco te ofrece un entorno natural único, a minutos de la
                    costa. Parcelas desde 1.000 m² útiles pensadas para quienes buscan un estilo de
                    vida conectado con la naturaleza, sin alejarse de la ciudad.
                </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Características del Proyecto</Parrafo>
                <Parrafo>
                - Cercanía: Sector Las Gaviotas, a minutos de la rotonda Concón.<br/>
                - Parcelas amplias: Desde 1.000 m² útiles, ideales para tu hogar.<br/>
                - Infraestructura: Luz eléctrica, pórtico de entrada, cámaras de seguridad,
                mirador con área de descanso, y caminos de maicillo con solera tipo
                manquehue.<br/>
                - Entorno natural: Flora nativa y paisajes inigualables.
            </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Conectividad</Parrafo>
                <Parrafo>
                    Cercano a Concón, Viña del Mar y Valparaíso. Accede fácilmente a servicios,
                    colegios, centros de salud, comercio y recreación.
                </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Precio de las Parcelas</Parrafo>
                <Parrafo $textAlign="left">
                    Desde UF 995.
                </Parrafo>
            </div>
           
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >¡Descubre tu nuevo hogar en Raíces del Mauco! Agenda tu visita hoy mismo.</Parrafo>   
            </div>
            <div style={{width:'100%', paddingBottom:'24px'}}>
                <a style={{textDecoration:'none', color:'black', display:'flex', alignItems:'center', justifyContent:'center'}} href="tel:+56946346676">
                    <MobileContact width="36" strokewidth="2"/>
                    +56 9 4634 6676
                </a>
            </div>
        </ProyectoContainer>
    )
}
export default Proyecto
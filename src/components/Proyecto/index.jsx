import styled from "styled-components"
import Logo from "../../assets/logo-color.png"
import { LogoWhatsapp } from '../Icons'

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
                    A solo 5 km de la rotonda de Concón, en el sector de Las Gaviotas, 
                    comuna de Quintero, Raíces del Mauco te ofrece un entorno natural único, 
                    a minutos de las playas de Concón y fácil conexión a las rutas que llevan 
                    a Maitencillo, Zapallar y Cachagua. Parcelas desde 1.000 m² útiles, 
                    ideales para quienes buscan un estilo de vida en armonía con la naturaleza, 
                    sin alejarse de la ciudad.
                </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Características del Proyecto</Parrafo>
                <Parrafo>
                    - Infraestructura: Luz eléctrica, pórtico de entrada, 
                        cámaras de seguridad, mirador con área de descanso, y caminos compactados con maicillo y solera tipo manquehue. 
                    - Entorno natural: Flora nativa y paisajes inigualables.

            </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Conectividad</Parrafo>
                <Parrafo>
                    Cercano a Concón, Viña del Mar y Valparaíso y conectado a ruta F-30 a Santiago. Accede fácilmente a comercio, centros de salud, colegios y recreación.
                </Parrafo>
            </div>
            
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >Precio de las Parcelas</Parrafo>
                <Parrafo $textAlign="left">
                    Desde UF 995.
                    <br/><br/>
                    ¡Descubre tu nuevo hogar en Raíces del Mauco! Agenda tu visita hoy mismo.
                </Parrafo>
            </div>
           
            <div style={{width:'100%', paddingBottom:'7px'}}>
                <Parrafo $textAlign="left" $fontWeight="600" >¡Descubre tu nuevo hogar en Raíces del Mauco! Agenda tu visita hoy mismo.</Parrafo>   
            </div>
            <div style={{width:'100%', paddingBottom:'24px'}}>
                <a style={{textDecoration:'none', color:'black', display:'flex', alignItems:'center', justifyContent:'center'}} href="https://wa.me/56946346676?text=Hola%20Estoy%20interesado%20en%20el%20Proyecto%20Raices%20de%20Mauco">
                    <LogoWhatsapp fill="black" width="36" height="36"/>
                    <span style={{paddingLeft:12}}>+56 9 4634 6676</span>
                </a>
            </div>
        </ProyectoContainer>
    )
}
export default Proyecto
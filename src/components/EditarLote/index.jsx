import styled from "styled-components"
import BtnRegresar from "../../elements/BtnRegresar"
import FormularioLote from '../FormularioLote'
import { useParams } from "react-router-dom"
import useObtenerLote from "../../hooks/useObtenerLote"

const Header = styled.div`
    position:fixed;
    top:0;
    z-index:20;
    background:white;
    width:100%;
    height:60px;
    display:flex;
    justify-content:space-around;
    align-items:center;   
`
const EditarLote = () => {
    const { id } = useParams()
    const [lote] = useObtenerLote(id)
    
    return(
        <>
            <Header>
                <BtnRegresar ruta="/lista-de-lotes"/>    
            </Header>
            <FormularioLote lote={lote}/>
        </>  
    )
}
export default EditarLote
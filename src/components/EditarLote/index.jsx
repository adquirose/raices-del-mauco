import { useParams } from "react-router-dom"
import FormularioLote from '../FormularioLote'
import useObtenerLote from "../../hooks/useObtenerLote"

const EditarLote = () => {
    const { id } = useParams()
    const [lote] = useObtenerLote(id)
    
    return <FormularioLote lote={lote} />
}

export default EditarLote
import { useEffect, useState } from "react";
import { db } from '../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"

const useObtenerLote = (id) => {
    const [lote, setLote] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const obtenerLote = async () => {
            const documento = await getDoc(doc(db,'proyectos/raices-mauco/lotes', id))
            if(documento.exists){
                setLote(documento)
            }else{
                navigate('/lista-de-lotes')
            }
        }
        obtenerLote()
    },[id, navigate])
    return [lote]
}
export default useObtenerLote
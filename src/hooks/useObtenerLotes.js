import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

const useObtenerLotes = () => {
    const [lotes, setLotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async() => {
        try {
            setLoading(true)
            setError(null)
            setLotes([]) // Limpiar lotes previos
            
            // console.log('Obteniendo lotes desde Firestore...')
            const querySnapshot = await getDocs(query(collection(db, "proyectos","raices-mauco", "lotes"),orderBy("html")))
            
            const lotesArray = []
            querySnapshot.forEach((doc) => {
                const newLote = {
                    id: doc.id,
                    ...doc.data()
                }
                lotesArray.push(newLote)
            });
            
            // console.log(`${lotesArray.length} lotes obtenidos desde Firestore`)
            setLotes(lotesArray)
        } catch (err) {
            // console.error('Error obteniendo lotes:', err)
            setError(err.message || 'Error al cargar los lotes')
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(()=> {
        fetchData()
    },[])
    

    // useEffect(() => {
    //     const consulta = query(
    //         collection(db, 'lotes')
    //     )
    //     const unsuscribe = onSnapshot(consulta,(snapshot) => {
    //         setLotes(snapshot.docs.map((lote) => {
    //             console.log('peticion lotes!')
    //             return { ...lote.data(), id: lote.id }
    //         }))
    //     })
    //     return unsuscribe
    // },[])
    return { lotes, loading, error }
}
export default useObtenerLotes
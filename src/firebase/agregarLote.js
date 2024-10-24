import { db } from './firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const agregarLote = (data) => {
    const { nombreSpot, ath, atv, nombreLote, estado, valor, fecha, uid} = data
    return addDoc(collection(db, 'lotes'),{
        nombreSpot,
        ath,
        atv,
        nombreLote,
        estado,
        valor, 
        fecha, 
        uid
    })
}
export default agregarLote
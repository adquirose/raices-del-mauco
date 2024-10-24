import { db } from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

const borrarLote = async(id) => {
    try{
        await deleteDoc(doc(db, 'proyectos/raices-mauco/lotes', id))
    }catch(error){
        console.log(error)
    }
}
export default borrarLote
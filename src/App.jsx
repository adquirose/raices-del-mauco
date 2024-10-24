import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Krpano from './components/Krpano'
import styled from 'styled-components'
import Proyecto from './components/Proyecto'
import Ubicacion from './components/Ubicacion'
import Entorno from './components/Entorno'
import Galeria from './components/Galeria'
import Contacto from './components/Contacto'

const INITIAL_STATE = {
  loading:false,
  error:false,
  sectionActiva:false
}
const Background = styled.div`
  background-color: rgba(255,255,255,0.75);
  width:100%;
  height:100%;
  grid-row: 1 / -1 ;
  grid-column: 1 / -1;
  z-index:5;
`
function App() {
  const [estado, setEstado] = useState({...INITIAL_STATE})
  const { sectionActiva } = estado
  const handleClick = (name) => {
    setEstado({...estado, sectionActiva: name})
  }
  
  const renderSection = () => {
    switch (sectionActiva) {
      case "proyecto":{
        return <Proyecto/>
      }
      case "ubicacion":
        return <Ubicacion/>
      case "galeria":
        return <Galeria estado={estado} setEstado={setEstado}/>
      case "contacto":
        return <Contacto estado={estado} setEstado={setEstado}/>
      case "entorno":
        return <Entorno estado={estado} setEstado={setEstado}/>
      default:
        break;
    }
  }
  return(
    <>
      <Navbar handleClick={handleClick} />
      <Krpano handleClick={handleClick}/>

      {sectionActiva && 
        <Background onClick={() => setEstado({...estado, sectionActiva:false})}/>
      }
      {sectionActiva &&
        renderSection()
      }
     
    </>
  )
}
export default App
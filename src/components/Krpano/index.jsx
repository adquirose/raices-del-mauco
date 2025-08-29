/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
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

const slideOut = keyframes`
    0% {
        transform: translateX(0px); 
        opacity: 1;
    }
    100% {
        transform: translateX(-340px);
        opacity: 0;
    }
`;
const KrpanoContainer = styled.div`
    width:100%;
    height:100%;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    position:relative;
`

const LoadingContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(44, 62, 80, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
`

const LoadingSpinner = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const LoadingText = styled.div`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    font-family: 'Work Sans', sans-serif;
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
    position:absolute;
    top:calc(50vh - 160px);
    padding:0.5rem;
    left:5px;
    z-index:5;
    animation: ${props => props.$fichaAnimating === 'in' ? slideIn : props.$fichaAnimating === 'out' ? slideOut : slideIn} 0.5s ease-in-out;
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
const ContainerText = styled.div`
    height:175px;
    width:100%;
    overflow-y:auto;
    box-sizing:border-box;
    padding:0 1rem;
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

const ButtonGroup = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding-top:18px;
    box-sizing:border-box;
    width:auto;
`

const linkWs = id => {
    return `https://wa.me/56946346676?text=Hola%20Estoy%20interesado%20en%20el%20lote%20${id}`
}
const Ficha = ({ dataLote = {}, setVisibleFicha, visibleFicha, fichaAnimating, setFichaAnimating }) => {
    const formatter = new Intl.NumberFormat('de-DE', {});
    const valor = formatter.format(dataLote.valor)
    const superficie = formatter.format(dataLote.superficie)
    const superficieUtil = formatter.format(dataLote.superficieUtil)
    const estado = dataLote.estado == 'nodisponible' ? 'No disponible' : dataLote.estado

    const cerrarFicha = () => {
        setFichaAnimating('out')
        setTimeout(() => {
            setVisibleFicha(false)
            setFichaAnimating('')
        }, 500)
    }

    return(
        <FichaContainer $fichaAnimating={fichaAnimating}>
            <ContainerTitulo>
                <Titulo>Lote {dataLote.nombreLote}</Titulo>
                <Button $background="none" onClick={() => window.open(linkWs(dataLote.nombreLote),'blank')}>
                    <LogoWhatsapp fill="black" width="36" height="36"/>
                </Button>
            </ContainerTitulo>
            <ContainerText>
                <P>Estado: {estado}</P>
                {estado === 'disponible' && 
                    <P>Valor: UF {valor}</P>
                }
                <P>Superficie ROL: {superficie} M2</P>
                <P>Superficie Util: {superficieUtil} M2</P>
                {dataLote.caracteristica && <P>{dataLote.caracteristica}</P>}
            </ContainerText>
            <ButtonGroup>
                <Button type="Button" onClick={cerrarFicha}>CONTINUAR VIENDO</Button>
                <Button type="Button" onClick={() => window.open('/plano.pdf')}>DESCARGAR PLANO</Button>
            </ButtonGroup> 
        </FichaContainer>
    )
}


const Krpano = () => {
    const { lotes, loading: lotesLoading, error: lotesError } = useObtenerLotes()
    const [nombreEscena, setNombreEscena] = useState('')
    const [visibleFicha, setVisibleFicha] = useState(false)
    const [nombreSpotFicha, setNombreSpotFicha] = useState('')
    const [loteFiltrado, setLoteFiltrado] = useState({})
    const [krpanoLoaded, setKrpanoLoaded] = useState(false)
    const [spotsCreated, setSpotsCreated] = useState(false)
    const [fichaAnimating, setFichaAnimating] = useState('') // 'in', 'out', o ''
    const krpanoRef = useRef(null)
    const krpanoInstance = useRef(null)

    // useEffect para configurar las funciones globales con acceso a lotes actualizados
    useEffect(() => {
        // Solo configurar las funciones si tenemos lotes
        if (lotes.length > 0) {
            // Redefinir la función cada vez que los lotes cambien
            window.js_mostrarficha = (nombreHs) => {
                // Si nombreHs no se pasó correctamente, intentar obtenerlo de krpano
                if (!nombreHs && krpanoInstance.current) {
                    nombreHs = krpanoInstance.current.get('global.hotspot_nombre')
                }
                
                if (!nombreHs) {
                    return
                }
                
                // Buscar el lote correspondiente
                const loteEncontrado = lotes.find(lote => lote.nombreSpot === nombreHs)
                
                if (!loteEncontrado) {
                    return
                }
                
                // Usar setTimeout para asegurar que los estados se actualicen correctamente
                setTimeout(() => {
                    setFichaAnimating('in') // Activar animación de entrada
                    setNombreSpotFicha(nombreHs)
                    setLoteFiltrado(loteEncontrado)
                    setVisibleFicha(true)
                    
                    // Resetear animación después de que termine
                    setTimeout(() => {
                        setFichaAnimating('')
                    }, 500)
                }, 10)
            }
        }
    }, [lotes, visibleFicha, nombreSpotFicha, fichaAnimating])

    useEffect(() => {
        // Verificar que el ref esté disponible
        if (!krpanoRef.current) {
            const checkRef = setInterval(() => {
                if (krpanoRef.current) {
                    clearInterval(checkRef)
                    loadKrpanoScript()
                }
            }, 50)
            
            setTimeout(() => {
                clearInterval(checkRef)
                if (!krpanoRef.current) {
                    // console.error('krpanoRef.current no disponible después del timeout')
                }
            }, 3000)
            return
        }
        
        loadKrpanoScript()
        
        function loadKrpanoScript() {
            // Verificar si el script ya existe
            const existingScript = document.querySelector('script[src="/krpano/krpano.js"]')
            if (existingScript) {
                checkKrpanoAvailability()
                return
            }
            
            const script = document.createElement('script')
            script.src = '/krpano/krpano.js'
            script.onload = () => {
                checkKrpanoAvailability()
            }
            
            script.onerror = (error) => {
                // console.error('Error cargando script:', error)
            }
            
            document.head.appendChild(script)
        }
        
        function checkKrpanoAvailability() {
            let attempts = 0
            const maxAttempts = 50
            
            const checkInterval = setInterval(() => {
                attempts++
                
                // Verificar tanto window.krpano como window.krpanoJS
                if (window.krpano || window.krpanoJS || window.embedpano) {
                    clearInterval(checkInterval)
                    initializeKrpano()
                } else if (attempts >= maxAttempts) {
                    // console.error('Krpano no disponible después de', maxAttempts, 'intentos')
                    clearInterval(checkInterval)
                }
            }, 100)
        }
        
        function initializeKrpano() {
            if (!krpanoRef.current) {
                // console.error('krpanoRef.current no disponible en initializeKrpano')
                return
            }
            
            if (krpanoInstance.current) {
                return
            }
            
            try {
                // Las funciones globales ahora se configuran en el useEffect separado
                // que tiene acceso a los lotes actualizados

                window.js_namescene = (escena) => {
                    setNombreEscena(escena)
                }
                
                const config = {
                    target: krpanoRef.current,
                    xml: '/krpano/tour.xml',
                    consolelog: true,
                    debugmode: false,
                    onready: (krpano) => {
                        krpanoInstance.current = krpano
                        setKrpanoLoaded(true)
                    },
                    onerror: (error) => {
                        // console.error('Error en krpano onready:', error)
                    }
                }
                
                // Usar embedpano que ya sabemos que está disponible
                window.embedpano(config)
                
            } catch (error) {
                // console.error('Error en initializeKrpano:', error)
            }
        }
        
        return () => {
            // Limpiar la referencia de la instancia de krpano
            if (krpanoInstance.current) {
                krpanoInstance.current = null
            }
            // Limpiar funciones globales
            if (window.js_mostrarficha) delete window.js_mostrarficha
            if (window.js_namescene) delete window.js_namescene
        }
    }, [])

    // Función para ejecutar comandos de krpano
    const callKrpano = (command) => {
        if (krpanoInstance.current) {
            try {
                krpanoInstance.current.call(command)
            } catch (error) {
                // console.error('Error al ejecutar comando krpano:', command, error)
            }
        }
    }
    
    // Efecto para crear spots: solo una vez cuando Krpano esté listo y los lotes estén cargados
    useEffect(() => {
        const crearSpots = () => {
            if (!krpanoInstance.current) {
                return
            }
            
            lotes.forEach((lote, index) => {
                setTimeout(() => {
                    const command = `crear_hs(${lote.nombreSpot}, ${lote.ath}, ${lote.atv}, ${lote.estado}, ${lote.html});`
                    callKrpano(command)
                }, index * 50) // Delay progresivo para evitar sobrecarga
            })
            
            setTimeout(() => {
                setSpotsCreated(true)
            }, lotes.length * 50 + 500)
        }
        
        // Condiciones para crear spots (solo una vez):
        // 1. Krpano debe estar cargado
        // 2. Los lotes deben estar cargados (no loading)
        // 3. Debe haber lotes disponibles
        // 4. Los spots no deben haberse creado ya
        // 5. krpanoInstance debe estar disponible
        const shouldCreateSpots = (
            krpanoLoaded && 
            !lotesLoading && 
            lotes.length > 0 && 
            !spotsCreated &&
            krpanoInstance.current
        )
        
        if (shouldCreateSpots) {
            setTimeout(() => {
                crearSpots()
            }, 500) // Pequeño delay para asegurar que krpano esté completamente listo
        }
    }, [krpanoLoaded, lotesLoading, lotes, spotsCreated])

    useEffect(() => {
        const filtroLote = (nombreHs) => lotes.find((lote) => lote.nombreSpot === nombreHs)
        const loteEncontrado = filtroLote(nombreSpotFicha)
        
        if (loteEncontrado) {
            setLoteFiltrado(loteEncontrado)
        }
    }, [nombreSpotFicha, lotes])

    return(
        <KrpanoContainer>
            {/* Loading indicator para carga de lotes */}
            {(lotesLoading || (!krpanoLoaded && !lotesError)) && (
                <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>
                        {lotesLoading ? 'Cargando lotes...' : 'Inicializando recorrido virtual...'}
                    </LoadingText>
                </LoadingContainer>
            )}

            <div 
                ref={krpanoRef}
                id="krpano-container"
                style={{ 
                    width: '100%', 
                    height: '100%',
                    backgroundColor: '#000000'
                }}
            />
            {visibleFicha && 
                <Ficha 
                    dataLote={loteFiltrado} 
                    visibleFicha={visibleFicha} 
                    setVisibleFicha={setVisibleFicha}
                    fichaAnimating={fichaAnimating}
                    setFichaAnimating={setFichaAnimating}
                /> } 
            <BtnUser/>
        </KrpanoContainer>   
    )
}
export default Krpano

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import useObtenerLotes from '../../hooks/useObtenerLotes'
import { LogoWhatsapp } from '../Icons'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    IconButton,
    Fab
} from '@mui/material'
import {
    Login as LoginIcon,
    Close as CloseIcon,
    List as ListIcon
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles' 

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
const StyledButton = styled.button`
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

// Tema de Material-UI
const theme = createTheme({
    palette: {
        primary: {
            main: '#2C3E50',
            light: '#34495E',
            dark: '#1A252F',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#7F8C8D',
            light: '#95A5A6',
            dark: '#5D6D6E',
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#ECF0F1',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#2C3E50',
            secondary: '#7F8C8D'
        },
        error: {
            main: '#C0392B',
            light: '#E74C3C'
        }
    },
    typography: {
        fontFamily: 'Work Sans, sans-serif',
    },
})

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
                <StyledButton $background="none" onClick={() => window.open(linkWs(dataLote.nombreLote),'blank')}>
                    <LogoWhatsapp fill="black" width="36" height="36"/>
                </StyledButton>
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
                <StyledButton type="Button" onClick={cerrarFicha}>CONTINUAR VIENDO</StyledButton>
                <StyledButton type="Button" onClick={() => window.open('/plano.pdf')}>DESCARGAR PLANO</StyledButton>
            </ButtonGroup> 
        </FichaContainer>
    )
}


const Krpano = () => {
    const { lotes, loading: lotesLoading, error: lotesError } = useObtenerLotes()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const [nombreEscena, setNombreEscena] = useState('')
    const [visibleFicha, setVisibleFicha] = useState(false)
    const [nombreSpotFicha, setNombreSpotFicha] = useState('')
    const [loteFiltrado, setLoteFiltrado] = useState({})
    const [krpanoLoaded, setKrpanoLoaded] = useState(false)
    const [spotsCreated, setSpotsCreated] = useState(false)
    const [fichaAnimating, setFichaAnimating] = useState('') // 'in', 'out', o ''
    
    // Estados para el modal de login
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginAlert, setLoginAlert] = useState({ active: false, tipo: '', mensaje: '' })
    
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

    // Funciones para manejar el modal de login
    const handleLoginClick = () => {
        if (user) {
            // Si está autenticado, ir a lista de lotes
            navigate('/lista-de-lotes')
        } else {
            // Si no está autenticado, mostrar modal
            setOpenLoginModal(true)
        }
    }

    const handleLoginClose = () => {
        setOpenLoginModal(false)
        setLoginAlert({ active: false, tipo: '', mensaje: '' })
        setLoginData({ email: '', password: '' })
    }

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setLoginAlert({ active: false, tipo: '', mensaje: '' })
        setLoginLoading(true)

        const { email, password } = loginData

        // Validaciones
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if (!expresionRegular.test(email)) {
            setLoginAlert({ active: true, tipo: 'error', mensaje: 'Correo no es válido' })
            setLoginLoading(false)
            return
        }
        if (email === '' || password === '') {
            setLoginAlert({ active: true, tipo: 'error', mensaje: 'Rellena todos los campos' })
            setLoginLoading(false)
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setLoginAlert({ active: true, mensaje: 'Inicio de sesión exitoso', tipo: 'success' })
            setTimeout(() => {
                handleLoginClose()
                navigate('/lista-de-lotes')
            }, 1000)
        } catch (error) {
            let mensaje
            switch (error.code) {
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    mensaje = 'Credenciales incorrectas'
                    break
                case 'auth/user-not-found':
                    mensaje = 'Usuario no encontrado'
                    break
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido'
                    break
                default:
                    mensaje = 'Error al iniciar sesión'
                    break
            }
            setLoginAlert({ active: true, mensaje, tipo: 'error' })
        } finally {
            setLoginLoading(false)
        }
    }

    return(
        <ThemeProvider theme={theme}>
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
            
            {/* Botón flotante para login/admin */}
            <Fab
                color="primary"
                size="small"
                onClick={handleLoginClick}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1000
                }}
            >
                {user ? <ListIcon /> : <LoginIcon />}
            </Fab>

            {/* Modal de Login */}
            <Dialog
                open={openLoginModal}
                onClose={handleLoginClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pb: 1,
                    color: 'primary.main'
                }}>
                    Acceso Administrativo
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleLoginClose}
                        aria-label="cerrar"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent>
                    {loginAlert.active && (
                        <Alert 
                            severity={loginAlert.tipo} 
                            sx={{ mb: 2 }}
                            onClose={() => setLoginAlert({ active: false, tipo: '', mensaje: '' })}
                        >
                            {loginAlert.mensaje}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginData.email}
                            onChange={handleLoginChange}
                            disabled={loginLoading}
                            variant="outlined"
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            disabled={loginLoading}
                            variant="outlined"
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loginLoading}
                            sx={{ 
                                mt: 3, 
                                mb: 2, 
                                height: 48
                            }}
                        >
                            {loginLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </KrpanoContainer>
        </ThemeProvider>   
    )
}
export default Krpano

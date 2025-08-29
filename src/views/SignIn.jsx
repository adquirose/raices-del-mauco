import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Alert,
    CircularProgress
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ImgLogo from '../assets/logo-color.png'

// Crear tema personalizado con paleta sobria
const theme = createTheme({
    palette: {
        primary: {
            main: '#2C3E50',        // Azul marino oscuro
            light: '#34495E',       // Azul gris
            dark: '#1A252F',        // Azul muy oscuro
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#7F8C8D',        // Gris medio
            light: '#95A5A6',       // Gris claro
            dark: '#5D6D6E',        // Gris oscuro
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#ECF0F1',     // Gris muy claro
            paper: '#FFFFFF'
        },
        text: {
            primary: '#2C3E50',
            secondary: '#7F8C8D'
        },
        error: {
            main: '#C0392B',        // Rojo sobrio
            light: '#E74C3C'
        },
        warning: {
            main: '#E67E22',        // Naranja sobrio
            light: '#F39C12'
        },
        success: {
            main: '#27AE60',        // Verde sobrio
            light: '#2ECC71'
        }
    },
    typography: {
        fontFamily: 'Work Sans, sans-serif',
    },
})

const INITIAL_STATE_ALERTA = {
    active: false, 
    tipo:'', 
    mensaje:'' 
}

const SignIn = () => {
    const [data, setData] = useState({email:'', password:''})
    const [alerta, setAlerta] = useState(INITIAL_STATE_ALERTA)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        setAlerta({ ...INITIAL_STATE_ALERTA })
        setLoading(true)

        const { email, password } = data

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(email)){
            setAlerta({active:true, tipo:'error', mensaje:'Correo no es válido'})
            setLoading(false)
            return
        }
        if(email === '' || password === ''){
            setAlerta({active:true, tipo:'error', mensaje:'Rellena todos los campos'})
            setLoading(false)
            return
        }
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setAlerta({active:true, mensaje:'Inicio de sesión exitoso', tipo:'success'})
            navigate('/lista-de-lotes')
        } catch(error){
            let mensaje 
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontró ninguna cuenta con este email'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                    break;
                case 'auth/invalid-credential':
                    mensaje = 'Las credenciales proporcionadas son incorrectas.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesión.'
                    break;
            }
            setAlerta({active:true, mensaje, tipo:'error'})
        } finally {
            setLoading(false)
        }
    }

    const handleOnChange = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }

    const { email, password } = data 

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 0, sm: 2 }, // Sin padding en móviles
                px: { xs: 0, sm: 2 } // Sin padding horizontal en móviles
            }}>
                <Container 
                    component="main" 
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: { xs: '100%', sm: 400 }, // Full width en móviles
                        px: { xs: 1, sm: 0 }, // Padding horizontal mínimo para móviles
                        py: { xs: 2, sm: 0 } // Padding vertical en móviles
                    }}
                >
                <Paper 
                    elevation={6}
                    sx={{
                        padding: { xs: 2, sm: 4 }, // Menos padding en móviles
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderRadius: { xs: 0, sm: 2 }, // Sin border radius en móviles para usar todo el ancho
                        boxShadow: { 
                            xs: '0 2px 8px rgba(44, 62, 80, 0.1)', 
                            sm: '0 8px 32px rgba(44, 62, 80, 0.1)' 
                        },
                        width: '100%',
                        maxWidth: '100%', // Siempre usa el 100% del ancho disponible
                        mx: 0 // Sin margen horizontal
                    }}
                >
                    <Box
                        component="img"
                        src={ImgLogo}
                        alt="Logo"
                        sx={{
                            width: '100%',
                            maxWidth: { xs: 200, sm: 250 }, // Logo más pequeño en móviles
                            marginBottom: { xs: 2, sm: 3 }, // Menos margen en móviles
                            height: 'auto'
                        }}
                    />
                    
                    <Avatar sx={{ 
                        m: 1, 
                        bgcolor: 'primary.main',
                        width: { xs: 40, sm: 56 }, // Avatar más pequeño en móviles
                        height: { xs: 40, sm: 56 }
                    }}>
                        <LockOutlined sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                    </Avatar>
                    
                    <Typography 
                        component="h1" 
                        variant="h5" 
                        sx={{ 
                            mb: 2,
                            fontSize: { xs: '1.3rem', sm: '1.5rem' }, // Texto más pequeño en móviles
                            textAlign: 'center',
                            fontWeight: 600
                        }}
                    >
                        Iniciar Sesión
                    </Typography>

                    {alerta.active && (
                        <Alert 
                            severity={alerta.tipo === 'error' ? 'error' : 'success'} 
                            sx={{ 
                                width: '100%', 
                                mb: 2,
                                fontSize: { xs: '0.85rem', sm: '0.875rem' } // Texto más pequeño en móviles
                            }}
                            onClose={() => setAlerta(INITIAL_STATE_ALERTA)}
                        >
                            {alerta.mensaje}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleOnSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleOnChange}
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.9rem', sm: '1rem' } // Texto más pequeño en móviles
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }
                            }}
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
                            value={password}
                            onChange={handleOnChange}
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }
                            }}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ 
                                mt: { xs: 2, sm: 3 }, // Menos margen superior en móviles
                                mb: 2, 
                                height: { xs: 48, sm: 50 }, // Botón más compacto en móviles
                                fontSize: { xs: '1rem', sm: '1.1rem' }, // Texto más pequeño en móviles
                                fontWeight: 600,
                                position: 'relative',
                                borderRadius: { xs: 1, sm: 1 } // Bordes menos redondeados en móviles
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </Box>
                </Paper>
            </Container>
            </Box>
        </ThemeProvider>
    )
}

export default SignIn
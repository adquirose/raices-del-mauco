/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import agregarLote from '../../firebase/agregarLote'
import { getUnixTime } from 'date-fns'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { fromUnixTime } from 'date-fns'
import editarLote from '../../firebase/editarLote.js'
import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    AppBar,
    Toolbar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material'
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Add as AddIcon,
    Cancel as CancelIcon
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

const INITIAL_STATE_LOTE = {
    ath:'',
    atv:'',
    nombreSpot:'',
    estado:'disponible',
    nombreLote:'',
    valor:'',
    superficie:'',
    superficieUtil:'',
    fecha: new Date(),
    html:'',
    caracteristica:''
}

const INITIAL_STATE_ALERTA = {
    active: false, 
    tipo:'', 
    mensaje:'' 
}

const FormularioLote = ({lote}) => {
    const [data, setData] = useState(INITIAL_STATE_LOTE)
    const [alerta, setAlerta] = useState(INITIAL_STATE_ALERTA)
    const [loading, setLoading] = useState(false)
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
            navigate('/')
        }
    },[user, navigate])

    // Efecto para cargar los datos del lote cuando esté disponible
    useEffect(() => {
        if (lote) {
            let loteData = {}
            
            // Si es un documento de Firestore, extraer los datos
            if (lote.data && typeof lote.data === 'function') {
                loteData = lote.data()
                loteData.id = lote.id
            } 
            // Si ya es un objeto plano
            else if (typeof lote === 'object') {
                loteData = lote
            }

            setData({
                ath: loteData.ath || '',
                atv: loteData.atv || '',
                nombreSpot: loteData.nombreSpot || '',
                estado: loteData.estado || 'disponible',
                nombreLote: loteData.nombreLote || '',
                valor: loteData.valor || '',
                superficie: loteData.superficie || '',
                superficieUtil: loteData.superficieUtil || '',
                fecha: loteData.fecha ? fromUnixTime(loteData.fecha) : new Date(),
                html: loteData.html || '',
                caracteristica: loteData.caracteristica || '',
                id: loteData.id || ''
            })
        }
    }, [lote])

    const handleChange = event => {
        setData({
            ...data, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setAlerta({...INITIAL_STATE_ALERTA})

        try {
            const { fecha, valor, estado, nombreLote, superficie, superficieUtil } = data 
            const newLote = { valor, estado, nombreLote, superficie, superficieUtil, fecha: getUnixTime(fecha), uid:user.uid }
            
            if(lote && data.id){
                await editarLote({
                    ...data,
                    id: data.id,
                    fecha: getUnixTime(data.fecha)
                })
                setAlerta({active: true, tipo:'success', mensaje:'Lote actualizado exitosamente' })
                setTimeout(() => navigate("/lista-de-lotes"), 1500)
            } else {
                await agregarLote(newLote)
                setData({...INITIAL_STATE_LOTE})
                setAlerta({active: true, tipo:'success', mensaje:'Lote creado exitosamente' })
            }
        } catch (error) {
            setAlerta({active: true, tipo:'error', mensaje:`Ocurrio un error: ${error.message}` })
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/lista-de-lotes')
    }

    const handleCancel = () => {
        if (data.id) {
            // Si está editando, mostrar dialog de confirmación
            setOpenCancelDialog(true)
        } else {
            // Si está creando, regresar sin confirmación
            navigate('/lista-de-lotes')
        }
    }

    const handleConfirmCancel = () => {
        setOpenCancelDialog(false)
        navigate('/lista-de-lotes')
    }

    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false)
        // Devolver foco a un elemento específico después de cerrar
        setTimeout(() => {
            const cancelButton = document.querySelector('[data-testid="cancel-button"]')
            if (cancelButton) {
                cancelButton.focus()
            }
        }, 100)
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: 'background.default'
            }}>
                {/* Header */}
                <AppBar position="sticky" elevation={2}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {data.id ? 'Editar Lote' : 'Crear Nuevo Lote'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="sm" sx={{ py: 3 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombreLote"
                                label="Nombre del Lote"
                                name="nombreLote"
                                value={data.nombreLote || ''}
                                onChange={handleChange}
                                placeholder="Ej: 1, 2, 3..."
                                disabled={loading || !!data.id} // Convertir data.id a boolean
                                InputProps={{
                                    readOnly: !!data.id, // Solo lectura si tiene ID (modo edición)
                                }}
                                helperText={data.id ? "El nombre del lote no puede modificarse" : ""}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="valor"
                                label="Valor UF"
                                name="valor"
                                type="number"
                                value={data.valor || ''}
                                onChange={handleChange}
                                placeholder="Ej: 1300"
                                disabled={loading}
                            />

                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="estado-label">Estado</InputLabel>
                                <Select
                                    labelId="estado-label"
                                    id="estado"
                                    name="estado"
                                    value={data.estado || 'disponible'}
                                    label="Estado"
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <MenuItem value="disponible">Disponible</MenuItem>
                                    <MenuItem value="reservado">Reservado</MenuItem>
                                    <MenuItem value="vendido">Vendido</MenuItem>
                                    <MenuItem value="nodisponible">No Disponible</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="superficie"
                                label="Superficie ROL (M²)"
                                name="superficie"
                                type="number"
                                value={data.superficie || ''}
                                onChange={handleChange}
                                placeholder="Ej: 450"
                                disabled={loading}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="superficieUtil"
                                label="Superficie Útil (M²)"
                                name="superficieUtil"
                                type="number"
                                value={data.superficieUtil || ''}
                                onChange={handleChange}
                                placeholder="Ej: 400"
                                disabled={loading}
                            />

                            {/* Alert */}
                            {alerta.active && (
                                <Alert 
                                    severity={alerta.tipo} 
                                    sx={{ mt: 2, mb: 2 }}
                                    onClose={() => setAlerta({...INITIAL_STATE_ALERTA})}
                                >
                                    {alerta.mensaje}
                                </Alert>
                            )}

                            {/* Botones de acción */}
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                mt: 3, 
                                mb: 2,
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    disabled={loading}
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancel}
                                    data-testid="cancel-button"
                                    sx={{ 
                                        height: 48,
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : (data.id ? <SaveIcon /> : <AddIcon />)}
                                    sx={{ 
                                        height: 48,
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                        minWidth: 'auto'
                                    }}
                                >
                                    {loading ? 'Procesando...' : (data.id ? 'Actualizar' : 'Crear Lote')}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>

                {/* Dialog de confirmación para cancelar */}
                <Dialog
                    open={openCancelDialog}
                    onClose={handleCloseCancelDialog}
                    aria-labelledby="cancel-dialog-title"
                    aria-describedby="cancel-dialog-description"
                    maxWidth="xs"
                    fullWidth
                    disablePortal={false}
                    keepMounted={false}
                    disableRestoreFocus={true}
                    disableAutoFocus={false}
                >
                    <DialogTitle id="cancel-dialog-title" sx={{ pb: 1 }}>
                        Confirmar Cancelación
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="cancel-dialog-description">
                            ¿Descartar los cambios realizados?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button 
                            onClick={handleCloseCancelDialog}
                            variant="outlined"
                            color="primary"
                        >
                            Continuar
                        </Button>
                        <Button 
                            onClick={handleConfirmCancel}
                            variant="contained"
                            color="error"
                        >
                            Descartar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}

export default FormularioLote

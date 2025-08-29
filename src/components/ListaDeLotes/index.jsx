import useObtenerLotes from "../../hooks/useObtenerLotes"
import { useNavigate } from "react-router-dom"
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    AppBar,
    Toolbar,
    Box,
    CircularProgress,
    Alert,
    Chip,
    Card,
    CardContent,
    useMediaQuery,
    useTheme
} from '@mui/material'
import {
    Edit as EditIcon,
    ArrowBack as ArrowBackIcon,
    Logout as LogoutIcon
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAuth } from "../../context/AuthContext"

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

// Función para obtener el color del estado
const getStatusColor = (estado) => {
    switch (estado?.toLowerCase()) {
        case 'disponible':
            return 'success'
        case 'vendido':
            return 'error'
        case 'reservado':
            return 'primary'  // Cambié de warning a primary (azul)
        case 'nodisponible':
        case 'no disponible':
            return 'default'
        default:
            return 'default'
    }
}

// Función para formatear el estado
const formatStatus = (estado) => {
    if (estado === 'nodisponible') return 'No disponible'
    return estado?.charAt(0).toUpperCase() + estado?.slice(1) || ''
}

// Componente de tarjeta móvil compacta en formato lista
const MobileLoteCard = ({ lote, onEdit }) => (
    <Card 
        sx={{ 
            mb: 1, 
            boxShadow: 1,
            '&:hover': {
                boxShadow: 2,
                bgcolor: 'action.hover',
                transition: 'all 0.2s ease-in-out'
            }
        }}
    >
        <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" flex={1}>
                    <Typography variant="h6" component="div" fontWeight="bold" sx={{ minWidth: 70, mr: 2 }}>
                        Lote {lote.nombreLote}
                    </Typography>
                    
                    <Chip 
                        label={formatStatus(lote.estado)}
                        color={getStatusColor(lote.estado)}
                        variant="filled"
                        size="small"
                        sx={{ mr: 2, minWidth: 80 }}
                    />
                    
                    <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                        UF {Number(lote.valor).toLocaleString('de-DE')}
                    </Typography>
                </Box>
                
                <IconButton
                    color="primary"
                    onClick={() => onEdit(lote.id)}
                    size="medium"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Box>
        </CardContent>
    </Card>
)

const ListaDeLotes = () => {
    const { lotes, loading, error } = useObtenerLotes()
    const { cerrarSesion } = useAuth()
    const navigate = useNavigate()
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

    // Ordenar lotes por nombreLote (número del lote)
    const lotesOrdenados = lotes?.sort((a, b) => {
        const numA = parseInt(a.nombreLote) || 0
        const numB = parseInt(b.nombreLote) || 0
        return numA - numB
    }) || []

    const handleLogout = () => {
        cerrarSesion()
    }

    const handleEdit = (loteId) => {
        navigate(`/edit/${loteId}`)
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                minHeight: '100vh', 
                bgcolor: 'background.default',
                width: '100%'
            }}>
                <Container maxWidth="lg" sx={{ 
                    minHeight: '100vh', 
                    bgcolor: 'background.default', 
                    py: 0,
                    px: { xs: 1, sm: 2, md: 3 } 
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
                            Lista de Lotes {!loading && lotesOrdenados.length > 0 && `(${lotesOrdenados.length} lotes)`}
                        </Typography>
                        
                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ py: 3 }}>
                    {/* Loading State */}
                    {loading && (
                        <Card>
                            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <CircularProgress size={60} sx={{ mb: 2 }} />
                                    <Typography variant="h6">Cargando lotes...</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    )}

                    {/* Error State */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Error al cargar los lotes: {error}
                        </Alert>
                    )}

                    {/* Empty State */}
                    {!loading && !error && lotesOrdenados.length === 0 && (
                        <Card>
                            <CardContent sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h5" color="text.secondary" gutterBottom>
                                    No hay lotes disponibles
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    No se encontraron lotes en el sistema
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* Data Content - Responsive */}
                    {!loading && !error && lotesOrdenados.length > 0 && (
                        <>
                            {/* Vista móvil - Tarjetas */}
                            {isMobile ? (
                                <Box sx={{ px: { xs: 1, sm: 0 } }}>
                                    {lotesOrdenados.map((lote) => (
                                        <MobileLoteCard 
                                            key={lote.id}
                                            lote={lote}
                                            onEdit={handleEdit}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                /* Vista desktop - Tabla */
                                <TableContainer 
                                    component={Paper} 
                                    elevation={3}
                                    sx={{
                                        maxHeight: 'calc(100vh - 200px)',
                                        overflow: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: '#f1f1f1',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#888',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#555',
                                        },
                                    }}
                                >
                            <Table sx={{ minWidth: 650 }} aria-label="lista de lotes" stickyHeader>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                                        <TableCell sx={{ 
                                            color: 'white', 
                                            fontWeight: 'bold',
                                            bgcolor: 'primary.main',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1
                                        }}>
                                            Lote
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: 'white', 
                                            fontWeight: 'bold',
                                            bgcolor: 'primary.main',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1
                                        }}>
                                            Estado
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: 'white', 
                                            fontWeight: 'bold',
                                            bgcolor: 'primary.main',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1
                                        }} align="right">
                                            Valor UF
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: 'white', 
                                            fontWeight: 'bold',
                                            bgcolor: 'primary.main',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1
                                        }} align="center">
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lotesOrdenados.map((lote) => (
                                        <TableRow 
                                            key={lote.id}
                                            sx={{ 
                                                '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                                '&:hover': { bgcolor: 'action.selected' }
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography variant="body1" fontWeight="medium">
                                                    Lote {lote.nombreLote}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={formatStatus(lote.estado)}
                                                    color={getStatusColor(lote.estado)}
                                                    variant="filled"
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body1" fontWeight="medium">
                                                    UF {Number(lote.valor).toLocaleString('de-DE')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(lote.id)}
                                                    sx={{
                                                        '&:hover': {
                                                            bgcolor: 'primary.light',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            )}
                        </>
                    )}
                </Box>
            </Container>
            </Box>
        </ThemeProvider>
    )
}

export default ListaDeLotes
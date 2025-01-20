import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./views/SignIn"
import RutaPrivada from "./components/RutaPrivada";
import ListaDeLotes from "./components/ListaDeLotes";
import EditarLote from "./components/EditarLote";
import { AuthProvider } from "./context/AuthContext"

const AppN = () => {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/lista-de-lotes" element={
                            <RutaPrivada>
                                <ListaDeLotes/>
                            </RutaPrivada>}
                        />
                        <Route path="/edit/:id" element={
                            <RutaPrivada >
                                <EditarLote/>
                            </RutaPrivada>
                        }/>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default AppN
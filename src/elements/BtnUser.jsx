import { UserCFrame3 } from "../components/Icons"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Button = styled.button`
    position:absolute;
    top:60px;
    background:none;
    border:0;
    left:8px;
    cursor:pointer;
`
const BtnUser = () => {
    const { user}  = useAuth()
    const navigate = useNavigate()
    return(
        <>{
            user?
            <Button onClick={() => navigate('/lista-de-lotes')}>
                <UserCFrame3 width="32" height="32" fill="white"/>
            </Button>:
            null
        }
        </>
        
    )
}
export default BtnUser
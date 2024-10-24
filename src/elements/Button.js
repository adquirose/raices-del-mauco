import styled from 'styled-components';

const Button = styled.button`
    background: ${(props) => (props.$primario ? '#5B69E2' : '#000')};
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    padding: 0px;
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    svg {
        height: 32px;
        fill: white;
    }
`;

export default Button;
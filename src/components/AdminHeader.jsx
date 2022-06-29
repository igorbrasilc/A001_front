import React from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

function UserHeader() {

    const { signOut, token } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        if (confirm('Tem certeza que deseja sair?') === true) {
            signOut();
            navigate('/');
        }
    }

    return (
        <HeaderContainer>
            <h2>Tela de admin</h2>
            <button onClick={() => handleLogout()}>Logout</button>
        </HeaderContainer>
    )
};

export default UserHeader;

const HeaderContainer = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
width: 100vw;
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;

background-color: var(--color-logo-header);
font-family: var(--font-lexend);

h2 {
    font-size: 30px;
    font-weight: 700;
    color: white;
    padding-left: 30px;
}

button {
    margin-right: 30px;
    border: none;
    padding: 15px;
    font-size: 100%;
    border-radius: 8px;

    &:hover {
        cursor: pointer;
        border-color: white;
    }
}

@media (max-width: 600px) {
    h2 {
        font-size: 20px;
        padding-left: 10px;
    }

    button {
        padding: 10px;
    }
}
`
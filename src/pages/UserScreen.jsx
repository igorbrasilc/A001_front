import React, { useState, useContext } from 'react';
import UserHeader from '../components/UserHeader.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';

export default function UserScreen() {

    const [room, setRoom] = useState('');

    return (
        <ContainerMainScreen>
            <UserHeader />
            <RoomButton roomChosen={setRoom} />
            {room == '' ? <p>Escolha uma sala</p> : <p>A sala escolhida é a sala X</p>}
        </ContainerMainScreen>
    )
}

const ContainerMainScreen = styled.main`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;

p {
    margin-top: 40vh;
}
`
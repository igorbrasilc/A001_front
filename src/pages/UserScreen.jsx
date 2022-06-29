import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';
import axios from 'axios';

export default function UserScreen() {

    // useEffect(() => {
    //     const promise = axios.get
    // })

    const [room, setRoom] = useState('');

    return (
        <ContainerMainScreen>
            <UserHeader />
            <RoomButton roomChosen={setRoom} />
            {room == '' ? <p>Escolha uma sala</p> : <p>A sala escolhida é a {room.room}</p>}
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
import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';
import axios from 'axios';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';
import urlApi from '../api/urlApi.js';

export default function UserScreen() {

    useEffect(() => {
        const promise = axios.get(`${urlApi}/get-user`, header);
        promise.then(res => {
            updateUserInfos(res.data);
            if (res.data.levelId === 1) navigate('/admin');
        });
        promise.catch(err => {
            console.log('Erro ao obter informações do usuário', err);
            signOut();
            navigate('/');
        })
    }, []);

    const { userInfos, updateUserInfos, signOut } = useAuth();
    const [room, setRoom] = useState('');
    const navigate = useNavigate();
    const header = authConfig();

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
import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';
import axios from 'axios';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';
import urlApi from '../api/urlApi.js';

import Agenda from '../components/CalendarComponent.jsx';

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
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const navigate = useNavigate();
    const header = authConfig();

    useEffect(() => {
        async function getRoomReservations() {
            try {
                const confirmedRoomReservations = await (await axios.get(`${urlApi}/reservas/${room.classId}`, header)).data;
                const pendingRoomReservations = await (await axios.get(`${urlApi}/reservas/pendentes/${room.classId}`, header)).data;
                setConfirmedReservations(confirmedRoomReservations);
                setPendingReservations(pendingRoomReservations);
            } catch (err) {
                console.log('Erro ao obter reservas da sala', err)
            }
        }
        getRoomReservations();
    }, [room])

    console.log('reservations', confirmedReservations, pendingReservations);

    return (
        <ContainerMainScreen>
            <UserHeader />
            <RoomButton roomChosen={setRoom} />
            {room == '' ? <p>Escolha uma sala</p> : <Agenda />}
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
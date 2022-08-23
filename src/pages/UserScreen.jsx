import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';
import axios from 'axios';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';
import urlApi from '../api/urlApi.js';
import BigCalendarComponent from '../components/BigCalendarComponent.jsx';

export default function UserScreen() {

    const { userInfos, updateUserInfos, signOut } = useAuth();
    const [room, setRoom] = useState('');
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const navigate = useNavigate();
    const header = authConfig();

    useEffect(() => {
        const promise = axios.get(`${urlApi}/get-user`, header);
        promise.then(res => {
            updateUserInfos(res.data);
            if (res.data.levelId === 1) navigate('/admin');
            if (room) {
                getRoomReservations();
            }
        });
        promise.catch(err => {
            console.log('Erro ao obter informações do usuário', err);
            signOut();
            navigate('/');
        })
    }, [room]);

    async function getRoomReservations() {
        try {
            const confirmedRoomReservations = await (await axios.get(`${urlApi}/reservas/${room.classId}`, header)).data;
            setConfirmedReservations(confirmedRoomReservations);
        } catch (err) {
            console.log('Erro ao obter reservas da sala', err)
        }
    }

    return (
        <ContainerMainScreen>
            <Header userType="user" pendingReservationsQtd={userInfos?._count?.pendingRoomReservations} />
            <RoomButton roomChosen={setRoom} />
            {room == '' ? <p>Escolha uma sala</p> : <BigCalendarComponent confirmedReservations={confirmedReservations} />}
        </ContainerMainScreen>
    )
}

const ContainerMainScreen = styled.main`
display: flex;
flex-direction: column;
align-items: center;

p {
    margin-top: 30vh;
}
`
import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import styled from 'styled-components';
import axios from 'axios';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';
import urlApi from '../api/urlApi.js';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ReservationCards from '../components/ReservationCards.jsx';

export default function ReservationScreen() {

    useEffect(() => {
        const promise = axios.get(`${urlApi}/get-user`, header);
        promise.then(res => {
            updateUserInfos(res.data);
            let userType = 'user';
            if (res.data.levelId === 1) userType = 'admin';
            setLoading(false);
            getRoomReservations(userType);
        });
        promise.catch(err => {
            console.log('Erro ao obter informações do usuário', err);
            signOut();
            navigate('/');
        })
    }, []);

    const { userInfos, updateUserInfos, signOut } = useAuth();
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const header = authConfig();

    async function getRoomReservations(userType) {
        try {
            const confirmedRoomReservations = await (await axios.get(`${urlApi}/reservas/todas/${userType === 'user' ? 'user' : 'admin'}`, header)).data;
            const pendingRoomReservations = await (await axios.get(`${urlApi}/reservas/pendentes/todas/${userType === 'user' ? 'user' : 'admin'}`, header)).data;
            setConfirmedReservations(confirmedRoomReservations);
            setPendingReservations(pendingRoomReservations);
        } catch (err) {
            console.log('Erro ao obter reservas da sala', err)
        }
    }

    return (
        <ContainerMainScreen>
            <Header userType={userInfos?.levelId === 1 ? 'admin' : 'user'} />
            <Typography variant="h5" component="h2">Reservas pendentes</Typography>
            {
                loading ? 
                <CircularProgress size={50} /> 
                : 
                <ReservationCards reservations={pendingReservations} userType={userInfos.levelId === 1 ? 'admin' : 'user'} reservationStatus="pending" />
            }
            <Typography variant="h5" component="h2">Reservas confirmadas</Typography>
            {
                loading ? 
                <CircularProgress size={50} /> 
                : 
                <ReservationCards reservations={confirmedReservations} userType={userInfos.levelId === 1 ? 'admin' : 'user'} reservationStatus="confirmed" />
            }
        </ContainerMainScreen>
    )
}

const ContainerMainScreen = styled.main`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

h2 {
    margin-top: 50px;
}
`

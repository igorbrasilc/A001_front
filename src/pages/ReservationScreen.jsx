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
import Filters from '../components/Filters.jsx';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default function ReservationScreen() {

    useEffect(() => {
        const promise = axios.get(`${urlApi}/get-user`, header);
        promise.then(res => {
            updateUserInfos(res.data);
            let userType = 'user';
            if (res.data.levelId === 1) userType = 'admin';
            getRoomReservations(userType);
            setLoading(false);
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
    const [room, setRoom] = useState('');
    const [period, setPeriod] = useState('');
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

    function filterReservations(reservations) {
        return reservations.filter(reservation => {
            if (period && room) {
                const month = reservation.reservationDate.split('/')[1];
                return month === period.split('/')[0] && reservation.classrooms.room === room;
            }

            if (period) {
                const month = reservation.reservationDate.split('/')[1];
                return month === period.split('/')[0];
            }

            if (room) {
                return reservation.classrooms.room === room;
            }

            return true;
        });
    }

    function getAvailableMonths(confirmedRes, pendingRes) {
        const availableMonths = new Set();
        confirmedRes.forEach(r => {
            const month = dayjs(r.reservationDate, 'DD/MM/YYYY').format('MM/YYYY').toString();
            console.log('month', month)
            availableMonths.add(month);
        });
        pendingRes.forEach(r => {
            const month = dayjs(r.reservationDate, 'DD/MM/YYYY').format('MM/YYYY').toString();
            availableMonths.add(month);
        });
        console.log(Array.from(availableMonths));
        return Array.from(availableMonths);
    }

    function getAvailableRooms(confirmedRes, pendingRes) {
        const availableRooms = new Set();
        confirmedRes.forEach(r => {
            const {room} = r.classrooms;
            availableRooms.add(room);
        });
        pendingRes.forEach(r => {
            const {room} = r.classrooms;
            availableRooms.add(room);
        });
        return Array.from(availableRooms);
    }

    return (
        <ContainerMainScreen>
            <Header userType={userInfos?.levelId === 1 ? 'admin' : 'user'} />
            {!loading && <Filters setPeriod={setPeriod} setRoom={setRoom} room={room} period={period} availableRooms={getAvailableRooms(confirmedReservations, pendingReservations)} availablePeriods={getAvailableMonths(confirmedReservations, pendingReservations)} />}
            <Typography variant="h5" component="h2">Reservas pendentes</Typography>
            {
                loading ? 
                <CircularProgress size={50} /> 
                : 
                <ReservationCards reservations={filterReservations(pendingReservations)} userType={userInfos.levelId === 1 ? 'admin' : 'user'} reservationStatus="pending" />
            }
            <Typography variant="h5" component="h2">Reservas confirmadas</Typography>
            {
                loading ? 
                <CircularProgress size={50} /> 
                : 
                <ReservationCards reservations={filterReservations(confirmedReservations)} userType={userInfos.levelId === 1 ? 'admin' : 'user'} reservationStatus="confirmed" />
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

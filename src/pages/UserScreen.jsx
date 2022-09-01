import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import RoomButton from '../components/RoomButton.jsx';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Modal, Box, Typography, Form, TextField } from '@mui/material';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import urlApi from '../api/urlApi.js';
import BigCalendarComponent from '../components/BigCalendarComponent.jsx';

const modalStyles={
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '400px',
        bgcolor: 'background.paper',
        border: '5px solid #0E5400',
        boxShadow: 24,
        p: 4,
        
    },
    title: {
        color: '#0E5400',
        fontSize: 30
    },
    footerText: {
        color: 'lightgrey',
        fontSize: 15
    },
    input: {
        marginBottom: '10px',
        marginTop: '10px',
        marginRight: '10px'
    }
};

export default function UserScreen() {

    const { userInfos, updateUserInfos, signOut } = useAuth();
    const [room, setRoom] = useState('');
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const header = authConfig();
    const { register, handleSubmit } = useForm();

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

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function onSubmit(data, e) {
        console.log('data', data);
    }

    function onError(e) {
        console.log('err', e);
    }

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
            {
                !room ?
                <p>Escolha uma sala</p> :
              (
                <>
                    <Button variant="contained" sx={{ margin: 3}} onClick={handleOpen}>Adicionar evento</Button>  
                    <BigCalendarComponent confirmedReservations={confirmedReservations} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-event"
                    >
                        <Box sx={modalStyles.box} component="form" noValidate onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <Typography sx={modalStyles.title}>Adicionar um evento</Typography>
                            <div>
                            <TextField
                                required
                                {...register('description', { required: 'Descrição é necessária' })}
                                id="outlined-required"
                                label="Descrição do evento"
                                sx={modalStyles.input}
                            />
                            <TextField
                                required
                                {...register('reservationDate', { required: 'Data de reserva é necessária' })}
                                id="date-required"
                                type="date"
                                label="Data de reserva"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={modalStyles.input}
                            />
                            <TextField
                                required
                                {...register('reservationHour', { required: 'Horário de reserva é necessário' })}
                                id="time-required"
                                type="time"
                                label="Horário"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={modalStyles.input}
                            />
                            <TextField
                                required
                                {...register('durationInHours', { required: 'Duração da reserva é necessário' })}
                                id="time-required"
                                type="time"
                                label="Duração"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={modalStyles.input}
                            />
                            </div>
                            <Button variant="outlined" type="submit">Confirmar</Button>
                            <Typography sx={modalStyles.footerText}>*Esta reserva será solicitada ao administrador</Typography>
                        </Box>
                    </Modal>    
                </>
              )
            }
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
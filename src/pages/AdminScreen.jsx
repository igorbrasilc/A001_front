import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Header from '../components/Header.jsx';
import RoomButton from '../components/RoomButton.jsx';
import authConfig from '../api/authConfig.js';
import useAuth from '../hooks/useAuth.js';
import urlApi from '../api/urlApi.js';
import BigCalendarComponent from '../components/BigCalendarComponent.jsx';
import EventModal from '../components/EventModal.jsx';

export default function UserScreen() {
  const { userInfos, updateUserInfos, signOut } = useAuth();
  const [room, setRoom] = useState('');
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const header = authConfig();

  useEffect(() => {
    const promise = axios.get(`${urlApi}/get-user`, header);
    promise.then((res) => {
      updateUserInfos(res.data);
      if (res.data.levelId === 2) navigate('/user');
      if (room) {
        getRoomReservations();
      }
    });
    promise.catch((err) => {
      console.log('Erro ao obter informações do usuário', err);
      signOut();
      navigate('/');
    });
  }, [room, navigate, signOut]);

  async function getRoomReservations() {
    try {
      const confirmedRoomReservations = await (await axios.get(`${urlApi}/reservas/${room.classId}`, header)).data;
      setConfirmedReservations(confirmedRoomReservations);
    } catch (err) {
      console.log('Erro ao obter reservas da sala', err);
    }
  }

  return (
    <ContainerMainScreen>
      <Header />
      <RoomButton roomChosen={setRoom} />
      {
                !room
                  ? <p>Escolha uma sala</p>
                  : (
                    <>
                      <Button variant="contained" sx={{ margin: 3 }} onClick={() => setOpenModal(true)}>Adicionar evento</Button>
                      <BigCalendarComponent confirmedReservations={confirmedReservations} />
                      <EventModal openModal={openModal} setOpenModal={setOpenModal} roomId={room.classId} userType="admin" />
                    </>
                  )
            }
    </ContainerMainScreen>
  );
}

const ContainerMainScreen = styled.main`
display: flex;
flex-direction: column;
align-items: center;

p {
    margin-top: 30vh;
}
`;

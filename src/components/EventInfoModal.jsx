import React, { useState, useEffect } from 'react';
import {
  Button, Modal, Box, Typography, Card, CardActions, CardContent, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import authConfig from '../api/authConfig.js';
import urlApi from '../api/urlApi.js';
import dayjs from "dayjs";
import axios from 'axios';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "dayjs/locale/pt-br";

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

const styles = {
    card: {
        maxHeight: '400px',
        overflowY: 'scroll',
        width: '50vw',
        backgroundColor: 'hsl(100, 10%, 50%)',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '25px'
    },
    typography: {
        gap: '5px'
    },
}

function EventInfoModal({ openModal, setOpenModal, reservation }) {
  const header = authConfig();

function handleDelete(reservationId) {
        const promise = axios.delete(`${urlApi}/reservas/confirmadas/${reservationId}/deletar`, header);
        promise.then(res => {
            alert('Reserva deletada!');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert('Não foi possível deletar a reserva...');
        });
}

  function displayCard(event) {
        return (
            <Card variant="outlined" sx={styles.card}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '15px', marginTop: '15px', fontSize: '18px' }}>Descrição: {event.title}</Typography>
                    <Divider />
                    <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Início: {dayjs(event.start).format('DD/MM/YY HH:mm')}h</Typography>
                    <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Término: {dayjs(event.end).format('DD/MM/YY HH:mm')}h</Typography>
                    <Divider />
                </CardContent>
            </Card>
        )
}

  function handleClose() {
    setOpenModal(false);
  }

  function onError(e) {
    console.log('err', e);
  }

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-event"
    >
        <Box sx={{ minWidth: 275, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {reservation ? displayCard(reservation) : <></>}
        </Box>
    </Modal>
  );
}

export default EventInfoModal;

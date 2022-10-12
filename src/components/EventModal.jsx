import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Modal, Box, Typography, Form, TextField, Checkbox, FormGroup, FormControlLabel 
} from '@mui/material';
import authConfig from '../api/authConfig.js';
import urlApi from '../api/urlApi.js';
import dayjs from "dayjs";
import axios from 'axios';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "dayjs/locale/pt-br";

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

const modalStyles = {
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
    fontSize: 30,
  },
  footerText: {
    color: 'lightgrey',
    fontSize: 15,
  },
  input: {
    marginBottom: '10px',
    marginTop: '10px',
    marginRight: '10px',
  },
};

function EventModal({ openModal, setOpenModal, roomId, userType }) {
  const { register, handleSubmit } = useForm();
  const [weeklyCheckboxStatus, setWeeklyCheckboxStatus] = useState(false);
  const header = authConfig();

  function handleClose() {
    setOpenModal(false);
  }

  async function onSubmit(data, e) {
    const formattedData = formatData(data);
    console.log(formattedData)

    if (!formattedData) return;

    const promise = axios.post(
        `${urlApi}/agendamento/${roomId}`, 
        formattedData,
        header
    );
    promise.then(() => {
        if (userType === 'admin') {
            alert('Reserva criada!');
            handleClose();
        } else {
            alert('Reserva criada! Verifique a aprovação na aba Reservas');
            handleClose();
        }
    })
    .catch(err => {
        alert('Houve um erro ao criar a reserva...');
        console.log(err);
    });
  }

  function formatData(data) {
    const { reservationDate, reservationHour } = data;
    const splittedHourString = reservationHour.split(':');
    const hour = splittedHourString[0];
    const minutes = splittedHourString[1];
    if (dayjs(reservationDate).add(hour, 'hour').add(minutes, 'minute').isBefore(dayjs())) {
        alert('A data de reserva precisa ser após a data de hoje');
        return null;
    }
    return { 
        ...data,
        reservationDate: dayjs(reservationDate).format('DD/MM/YYYY').toString(),
        numberOfWeeks: weeklyCheckboxStatus ? numberOfWeeks : ''
    }
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
      <Box
        sx={modalStyles.box}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
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
          <FormGroup sx={{marginBottom: '5px'}}>
            <FormControlLabel control={<Checkbox checked={weeklyCheckboxStatus} color="primary" onClick={() => setWeeklyCheckboxStatus((prev) => !prev)}/>} label="Repetir reserva semanalmente?" />
          </FormGroup>
          {weeklyCheckboxStatus && 
          <TextField 
            label="Quantas semanas?" 
            {...register('numberOfWeeks', { min: 2, max: 8, valueAsNumber: true  })} 
            type="number" defaultValue="2" inputProps={{ min: 2, max: 8 }}
            helperText="2 a 8 semanas"  
          />
          }
        </div>
        <Button variant="outlined" type="submit" sx={{marginTop: '10px'}}>Confirmar</Button>
        {userType === 'user' ? (<Typography sx={modalStyles.footerText}>
          *Esta reserva será solicitada ao administrador
        </Typography>) : <></>}
      </Box>
    </Modal>
  );
}

export default EventModal;

import * as React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import authConfig from '../api/authConfig.js';
import urlApi from '../api/urlApi.js';
import "dayjs/locale/pt-br";
import axios from 'axios';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

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

export default function ReservationCards({reservations, userType, reservationStatus}) {

    const header = authConfig();

    function calculateTime(dateRaw, hour, duration) {
        const date = dayjs(dateRaw, 'DD/MM/YYYY');
        const splittedHour = hour.split(':');
        const dateWithHour = date.add(splittedHour[0], 'h');
        const splittedDuration = duration.split(':');
        const dateWithMinutes = dateWithHour.add(splittedHour[1], 'm');
        const endDateHour = dateWithMinutes.add(splittedDuration[0], 'h');
        const endDateMinutes = endDateHour.add(splittedDuration[1], 'm');

        return endDateMinutes.format('DD/MM/YY HH:mm');
    }

    function handleRequest(reservationId, intention) {
        if (intention === 'approve') {
            const promise = axios.put(`${urlApi}/reservas/pendentes/${reservationId}/aprovar`, {}, header);
            promise.then(res => {
                alert('Reserva aprovada!');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Não foi possível aprovar a reserva...');
            });
        }

        if (intention === 'disapprove') {
            const promise = axios.put(`${urlApi}/reservas/pendentes/${reservationId}/reprovar`, {}, header);
            promise.then(res => {
                alert('Reserva desaprovada e deletada!');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Não foi possível desaprovar a reserva...')
            });
        }

        if (intention === 'delete') {
            const promise = axios.delete(`${urlApi}/reservas/confirmadas/${reservationId}/deletar`, {}, header);
            promise.then(res => {
                alert('Reserva deletada!');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Não foi possível desaprovar a reserva...')
            });
        }
    }

    function displayCards(events) {

        const filteredEvents = events.filter(event => {
            const splittedHourString = event.reservationHour.split(':');
            const hour = splittedHourString[0];
            const minutes = splittedHourString[1];

            return dayjs(event.reservationDate, 'DD/MM/YYYY').add(hour, 'hour').add(minutes, 'minute').isAfter(dayjs())
        });

        return filteredEvents.map((event) => {
            return (
                <Card variant="outlined" sx={styles.card}>
                    <CardContent>
                        <Typography sx={{fontWeight: 700, marginBottom: '15px'}} variant="h5" align="center">{event.classrooms.room}</Typography>
                        <Divider />
                        <Typography align="left" gutterBottom>{`Nome: ${event.users.name}`}</Typography>
                        <Typography align="left" gutterBottom>{`Email: ${event.users.email}`}</Typography>
                        <Divider />
                        <Typography variant="h6" sx={{ marginBottom: '15px', marginTop: '15px', fontSize: '18px' }}>Descrição: {event.description}</Typography>
                        <Divider />
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Data: {dayjs(event.reservationDate, 'DD/MM/YYYY').format('DD/MM/YY')}</Typography>
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Horário: {dayjs(event.reservationHour, 'HH:mm').format('HH:mm')}h</Typography>
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Duração: {dayjs(event.durationInHours, 'HH:mm').format('HH:mm')}h</Typography>
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Término: {calculateTime(event.reservationDate, event.reservationHour, event.durationInHours)}h</Typography>
                        <Divider />
                    </CardContent>
                    {userType === 'user' || reservationStatus === 'confirmed' ? 
                    <CardActions sx={{margin: '0 auto'}}>
                    <Button size="small" color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleRequest(event.id, 'delete')}>Deletar</Button>
                </CardActions> : 
                    <CardActions sx={{margin: '0 auto'}}>
                        <Button size="small" color="success" variant="contained" onClick={() => handleRequest(event.id, 'approve')}>Aprovar</Button>
                        <Button size="small" color="error" variant="contained" onClick={() => handleRequest(event.id, 'disapprove')}>Reprovar</Button>
                    </CardActions>
                    }
                </Card>
            )
        })
    }

  return (
    <Box sx={{ minWidth: 275, marginTop: '15px', height: 'auto' }}>
      {displayCards(reservations)}
    </Box>
  );
}

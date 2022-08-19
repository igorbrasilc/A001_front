import * as React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

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

export default function ReservationCards({reservations, userType}) {

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

    function displayCards(events) {
        return events.map((event) => {
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
                    <CardActions sx={{margin: '0 auto'}}>
                        <Button size="small" color="success" variant="contained">Aprovar</Button>
                        <Button size="small" color="error" variant="contained">Reprovar</Button>
                    </CardActions>
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

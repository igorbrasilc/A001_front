import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = {
    card: {
        maxHeight: '400px',
        overflowY: 'scroll',
        width: '50vw',
        backgroundColor: 'hsl(100, 10%, 50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    typography: {
        gap: '5px'
    },
}

export default function ReservationCards({reservations, userType}) {

    function displayCards(events) {
        return events.map((event) => {
            return (
                <Card variant="outlined" sx={styles.card}>
                    <CardContent>
                        <Typography sx={{fontWeight: 700}}>Sala 2</Typography>
                        <Typography align="left" gutterBottom>Professor Raimundo</Typography>
                        <Typography variant="body2">Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição</Typography>
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Data: 08/08/22</Typography>
                        <Typography variant="body1" align="center" sx={{fontWeight: 700}}>Horário: 09:00h</Typography>
                    </CardContent>
                    <CardActions>
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

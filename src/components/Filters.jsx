import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');


function Filters({setPeriod, setRoom, room, period, availableRooms, availablePeriods}) {

    const handlePeriod = (e) => {
        setPeriod(e.target.value);
    };

    const handleRoom = (e) => {
        setRoom(e.target.value);
    };

    function displayMonths(months) {
        return months.map((month) => {
            return <MenuItem value={month} key={month}>{month}</MenuItem>
        })
    }

    function displayRooms(rooms) {
        return rooms.map((room) => {
            return <MenuItem value={room} key={room}>{room}</MenuItem>
        })
    }


    return (
        <Box sx={styles.box}>
          <FormControl sx={styles.form}>
            <InputLabel id="select-room">Sala</InputLabel>
            <Select
              labelId="select-room"
              id="select-room"
              value={room}
              sx={{width: '150px'}}
              label="Room"
              onChange={handleRoom}
            >
                <MenuItem value={''} key={'null'}>Todos</MenuItem>
              {displayRooms(availableRooms)}
            </Select>
          </FormControl>
          <FormControl sx={styles.form}>
            <InputLabel id="select-period">Mês</InputLabel>
            <Select
              labelId="select-period"
              id="select-period"
              value={period}
              sx={{width: '150px'}}
              label="Period"
              onChange={handlePeriod}
            >
                <MenuItem value={''} key={'null'}>Todos</MenuItem>
                {displayMonths(availablePeriods)}
            </Select>
          </FormControl>
        </Box>
      );
}

const styles = {
    box: {
        width: '80vw', 
        marginTop: '30px',
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '15px'
    },
}

export default Filters
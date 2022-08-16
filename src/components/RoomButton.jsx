import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import urlApi from '../api/urlApi.js';

const URL = urlApi;

export default function RoomButton({ roomChosen }) {

    const [roomsAvailable, setRoomsAvailable] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${URL}/salas`);
        promise.then(response => {
            setRoomsAvailable(response.data);
        });
        promise.catch((err) => {
            console.log(err);
            alert('Houve um erro ao obter as salas disponíveis, por favor atualize a página, se o erro persistir refaça o login');
        })
    }, []);

    function showRoomOptions() {
        return (
            roomsAvailable.map((room, idx) => {
                return (
                    <option 
                    value={`${room.room}`} 
                    key={idx}
                    onClick={() => roomChosen(room)}>
                        {room.room}
                    </option>
                )
            })
        )
    }

    return (
        <ContainerButton>
            <label htmlFor="rooms">Salas disponíveis:</label>
            <select name="rooms" id="rooms">
                <option value="" onClick={() => roomChosen('')}></option>
                {showRoomOptions()}
            </select> 
        </ContainerButton>
    )
}

const ContainerButton = styled.form`
font-family: var(--font-lexend);
margin-top: 50px;

label {
    font-weight: 700;
    font-size: 1rem;
    margin-left: 15px;
    margin-right: 15px;
}

select {
    width: 100px;

    option {
        background-color: var(--color-logo-header);
        color: white;
        font-weight: 400;
    }
}
`
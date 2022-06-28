import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import urlApi from '../api/urlApi.js';

const URL = urlApi.prod;

export default function RoomButton({ roomChosen }) {

    const { token, signOut } = useAuth();
    const navigate = useNavigate();
    const [roomsAvailable, setRoomsAvailable] = useState([]);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

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
            <label for="rooms">Salas disponíveis:</label>
            <select name="rooms" id="rooms">
                <option value=""></option>
                {showRoomOptions()}
            </select> 
        </ContainerButton>
    )
}

const ContainerButton = styled.form`
margin-top: 90px;
font-family: var(--font-lexend);

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
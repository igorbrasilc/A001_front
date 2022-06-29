import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import authConfig from '../api/authConfig.js';
import urlApi from '../api/urlApi.js';
import AdminHeader from '../components/AdminHeader.jsx';
import useAuth from '../hooks/useAuth.js';

export default function AdminScreen() {

    useEffect(() => {
        const promise = axios.get(`${urlApi}/get-user`, header);
        promise.then(res => {
            updateUserInfos(res.data);
            if (res.data.levelId === 2) navigate('/user');
        });
        promise.catch(err => {
            console.log('Erro ao obter informações do usuário', err);
            signOut();
            navigate('/');
        })
    }, []);

    const { userInfos, updateUserInfos, signOut } = useAuth();
    const navigate = useNavigate();
    const header = authConfig();
    
    return (
        <>
            <AdminHeader />
        </>
    )
}
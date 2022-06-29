import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import jwt_decode from "jwt-decode";

import Logo from '../assets/Logo.jpg';
import useAuth from '../hooks/useAuth';
import urlApi from '../api/urlApi';

const URL = urlApi;

function SignInScreen() {

  const { signIn, token } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
//   const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (token) {
        const decoded = jwt_decode(token);
        if (decoded.levelId === 1) navigate('/admin');
        else navigate('/user')
    }
  }, []);

  async function onSubmit(obj) {
    setLoading(true);

    try {
      await axios.post(`${URL}/login`, obj)
        .then((response) => {
          const { token } = response.data;
          if (token) {
            signIn(token);
            const decoded = jwt_decode(token);
            if (decoded.levelId === 1) navigate('/admin');
            else navigate('/user')
          }
          setLoading(false);
        });
    } catch (e) {
        console.log('Problema no post para o server', e);
        setLoading(false);
        // setInputError(true);
    }
  }

  return (
    <$LoginScreen>
      <img src={Logo} alt="logo" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="E-mail"
          {...register('email')}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          title="Deve conter pelo menos 1 número, 1 letra maiúscula, 1 minúscula e no mínimo 6 caracteres"
          pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"
          {...register('password')}
          disabled={loading}
          required
        />
        {/* {inputError === false ? <></> : <span>Verifique os dados!</span>} */}
        <button
          type="submit"
          disabled={loading}
          className={loading === false ? '' : 'loading'}
        >
          {loading === false ? 'Entrar' : <ThreeDots color="#FFF" height={80} width={80} />}
        </button>
      </form>
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
      </Link>
    </$LoginScreen>
  );
}

export default SignInScreen;

const $LoginScreen = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--font-lexend);
    font-weight: 400;
    background-color: #FFF;
    height: 100vh;
    img {
        margin-top: 8%;
        width: 500px;
        margin-bottom: 33px;
    }
    form {
        display:flex;
        flex-direction: column;
        width: 80vw;
        max-width: 450px;
    }
    input {
        margin-bottom: 6px;
        height: 45px;
        font-size: 100%;
        color: grey;
        border: 1px solid var(--color-border-input);
        border-radius: 5px;
        background-color: var(--color-bg-login-footer);
        &::placeholder {
            color: var(--color-text-input);
        }
        &:focus {
            outline: none;
        }
        &:disabled {
            background-color: var(--color-input-disabled);
        }
    }
    button {
        margin-bottom: 25px;
        height: 45px;
        border: none;
        border-radius: 4.64px;
        background-color: var(--color-button-link);
        font-size: 100%;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 2px 2px var(--color-logo-header);
            height: 50px;
        }
        &:active {
            background-color: var(--color-logo-header);
        }
        &.loading {
            opacity: 0.7;
            pointer-events: none;
        }
    }
    p {
        font-size: 14px;
        color: var(--color-button-link);
        line-height: 17px;
        text-decoration-line: underline;
        text-decoration-color: var(--color-button-link);
        &:hover {
            cursor: pointer;
        }
        &:active {
            color: var(--color-logo-header);
        }
    }

    @media (max-width: 600px) {
        img {
            width: 350px;
        }
    }
`;

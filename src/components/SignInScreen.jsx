import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import Logo from '../assets/Logo.jpg';
// import TokenContext from '../contexts/TokenContext';

function SignInScreen() {
  // const {user, setUser} = useContext(TokenContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  //   if (user.token !== '') navigate('/today');

//   const [inputError, setInputError] = useState(false);

    const [loading, setLoading] = useState(false);

  //   const URL = 'https://...deploy';
  const URL = 'http://localhost:4000';

  async function onSubmit(obj) {
    setLoading(true);

    try {
      await axios.post(`${URL}/login`, obj)
        .then((response) => {
          const { token } = response.data;
          console.log(token);
          //   setUser({
          //     ...user, name, email, token, transactions,
          //   }); PARA ATUALIZAR O CONTEXT

            setLoading(false);

        //   navigate('/history'); NAVEGA PARA A MAIN
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
`;

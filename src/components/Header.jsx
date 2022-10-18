import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Tooltip, Badge
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    signOut();
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1, width: '100vw' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button color="inherit" onClick={() => navigate('/reservas')}>Gerenciar Reservas</Button>
          <Button color="inherit" onClick={() => navigate('/')}>Início</Button>
          <Button color="inherit" onClick={() => handleLogout()}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
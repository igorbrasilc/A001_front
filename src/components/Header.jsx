import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Header( userType ) {
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
          <Button color="inherit">Reservas</Button>
          <Button color="inherit" onClick={() => navigate(userType === 'admin' ? '/admin' : '/user')}>Início</Button>
          <Button color="inherit" onClick={() => handleLogout()}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
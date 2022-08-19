import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Tooltip, Badge
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
            <Badge badgeContent={4} color="secondary" >
                <Button color="inherit" onClick={() => navigate('/reservas')}>Reservas</Button>
            </Badge>
          <Button color="inherit" onClick={() => navigate('/')}>Início</Button>
          <Button color="inherit" onClick={() => handleLogout()}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
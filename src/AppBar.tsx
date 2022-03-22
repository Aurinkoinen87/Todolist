import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logOutTC } from './store/auth-reducer'
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerType } from './store/state'
import s from './AppBar.module.css'



export function HeaderAppBar() {
  console.log('bar')
  const dispatch = useDispatch()

  const onClickHandler = () => dispatch(logOutTC())
  const userId = useSelector<rootReducerType, number | null>(state => state.auth.userId)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            <div className={s.id_block}>userId: {userId}</div>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          </Typography>
          <Button onClick={onClickHandler} color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
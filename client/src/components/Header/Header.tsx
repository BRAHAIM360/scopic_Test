import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth/authSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const { isAdmin } = useAppSelector((state: RootState) => state.auth);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <div className="logo" onClick={() => { navigate('/') }}>
                            <span>AUCTION</span>
                            <img className='logo' src="/images/auction logo.png" alt="" />
                        </div>
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {isAdmin && <MenuItem onClick={() => { navigate('/admin') }}><AdminPanelSettingsIcon sx={{ mr: 1 }} />Admin </MenuItem>}

                            <MenuItem onClick={handleClose}><SettingsIcon sx={{ mr: 1 }} />Settings </MenuItem>
                            <MenuItem onClick={() => { dispatch(logout()) }}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>
                        </Menu>

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
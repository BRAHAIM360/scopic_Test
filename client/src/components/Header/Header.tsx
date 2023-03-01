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
import { Drawer } from '../Drawer/Drawer';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Badge } from '@mui/material';
import { NotificationMessage } from '../NotificationMessage/NotificationMessage';
import { useGetNotificationQuery } from '../../store/userApi';
import { DarkThemeTogle } from '../DarkThemeTogle/DarkThemeTogle';

export const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorNotification, setAnchorNotification] = React.useState<null | HTMLElement>(null);

    const { data: notification } = useGetNotificationQuery("");

    const { isAdmin } = useAppSelector((state: RootState) => state.auth);


    const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuNotification = (event: React.MouseEvent<HTMLElement>) => {
        if (notification?.length > 0)
            setAnchorNotification(event.currentTarget);
    };

    const handleCloseMainMenu = () => {
        setAnchorEl(null);
    };
    const handleCloseNotification = () => {
        setAnchorNotification(null);
    };
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Drawer
                        ButtonTriger={<IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>}
                    ></Drawer>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <div className="logo" onClick={() => { navigate('/') }}>
                            <span>AUCTION</span>
                            <img className='logo' src="/images/auction logo.png" alt="" />
                        </div>
                    </Typography>
                    <div>
                        <DarkThemeTogle />
                        <IconButton
                            size="large"
                            aria-label="notifications"
                            aria-controls="menu-notifications"
                            aria-haspopup="true"
                            onClick={handleMenuNotification}
                            color="inherit"
                        >
                            <Badge badgeContent={notification && notification.length.toString()} color="secondary">
                                <CircleNotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="menu-notifications"
                            anchorEl={anchorNotification}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorNotification)}
                            onClose={handleCloseNotification}
                        >
                            {notification?.map((item: any) => {
                                return (
                                    <NotificationMessage key={item.createdAt} message={item.message} date={item.createdAt} />
                                )
                            })
                            }

                        </Menu>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMainMenu}
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
                            onClose={handleCloseMainMenu}
                        >
                            {isAdmin && <MenuItem onClick={() => { navigate('/admin') }}><AdminPanelSettingsIcon sx={{ mr: 1 }} />Admin </MenuItem>}

                            <MenuItem onClick={() => { dispatch(logout()) }}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>
                        </Menu>

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import logo from '../../images/logo2.png';
import { Link, NavLink } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import { OrderContext } from '../../context/OrderContext';

const Header = () => {

    const { user, logOutController } = useAuth();

    const { userOrders, orders } = useContext(OrderContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuIconClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logOutController()
    }


    return (
        <header className="header">
            <Container fixed>
                <Grid container sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Grid item xs={6} md={3}>
                        <div className="header_left">
                            <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={9} sx={{
                        position: 'relative'
                    }} >
                        <div className={menuOpen ? `header_right active` : 'header_right'}>
                            <CloseIcon className="menu_close" onClick={() => setMenuOpen(false)} />
                            <nav>
                                <ul className="main_menu" onClick={() => setMenuOpen(false)}>
                                    <li className="menu_item">
                                        <NavLink exact to="/" activeClassName="active">Home</NavLink>
                                    </li>
                                    <li className="menu_item">
                                        <NavLink exact to="/packages" activeClassName="active">Packages</NavLink>
                                    </li>
                                    <li className="menu_item">
                                        <NavLink exact to="/about" activeClassName="active">About Us</NavLink>
                                    </li>
                                    <li className="menu_item">
                                        <NavLink exact to="/contact" activeClassName="active">Contact Us</NavLink>
                                    </li>

                                    {user.email || user.displayName ? (
                                        <IconButton onClick={handleMenuIconClick} size="small">
                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                {user?.displayName?.substr(0, 1).toUpperCase()}
                                            </Avatar>
                                        </IconButton>
                                    ) : ''}


                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuIconClose}
                                        onClick={handleMenuIconClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >

                                        <MenuItem>
                                            <Avatar /> Hello {user?.displayName?.split(' ')[0]}
                                        </MenuItem>
                                        <MenuItem>
                                            <Avatar >{userOrders.length}</Avatar >
                                            <Link to="/my-orders" className="menu_link">My Orders</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem>
                                            <Avatar  >{orders.length}</Avatar >
                                            <Link to="/all-orders" className="menu_link">All Orders</Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <AddCircleIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Link to="/packages/add" className="menu_link">Add new package</Link>
                                        </MenuItem>


                                    </Menu>
                                </ul>
                            </nav>

                            {!user.email || !user.displayName ? (
                                <div className="header_actions" onClick={() => setMenuOpen(false)}>
                                    <Link to="/login" className="btn btn_primary">Login</Link>
                                </div>
                            ) : ''}



                        </div>

                        <MenuOpenIcon className="menu_open" onClick={() => setMenuOpen(true)} />
                        <div className={menuOpen ? `header_overlay active` : 'header_overlay'} onClick={() => setMenuOpen(false)}></div>
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default Header;
import React, { useState } from 'react';
import './Header.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import logo from '../../images/logo2.png';
import { Link, NavLink } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {

    const [menuOpen , setMenuOpen] = useState(false)
    return (
        <header className="header">
            <Container fixed>
                <Grid container sx={{
                    alignItems: 'center',
                    justifyContent:'space-between'
                }}>
                    <Grid item xs={6} md={3}>
                        <div className="header_left">
                            <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={9} sx={{
                        position:'relative'
                    }} >
                        <div className={menuOpen ? `header_right active` : 'header_right'}>
                            <CloseIcon className="menu_close" onClick={()=>setMenuOpen(false)}/>
                            <nav>
                                <ul className="main_menu" onClick={()=>setMenuOpen(false)}>
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
                                </ul>
                            </nav>

                            <div className="header_actions" onClick={()=>setMenuOpen(false)}>
                                <Link to="/login" className="btn btn_primary">Login</Link>
                            </div>
                           
                        </div>
                        
                        <MenuOpenIcon className="menu_open" onClick={()=>setMenuOpen(true)} />
                        <div className={menuOpen ? `header_overlay active` : 'header_overlay'}  onClick={()=>setMenuOpen(false)}></div>
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default Header;
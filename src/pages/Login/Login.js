import React, { useState } from 'react';
import Container from '@mui/material/Container';
import googleIcon from '../../images/google-icon.png';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <div className="page auth_page">
            <Container fixed>
                <div className="auth_page_wrapper">
                    <form action="" className="auth_form" onSubmit={handleSubmit}>
                        <h3 className="auth_title">Login</h3>
                        <div className="input_group">
                            <input
                                type="email"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="auth_submit">
                            <button className="btn btn_primary">Login</button>
                        </div>

                        <div className="auth_toggler">
                            Don't have an account ? <Link to="/register">Create an Account</Link>
                        </div>

                        <div className="auth_alter">
                            <p>OR</p>
                            <button className="google_btn">
                                <img src={googleIcon} alt="Google" />
                                Continue with Google
                            </button>
                        </div>

                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;
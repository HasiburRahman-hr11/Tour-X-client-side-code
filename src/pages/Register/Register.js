import React, { useState } from 'react';
import Container from '@mui/material/Container';
import googleIcon from '../../images/google-icon.png';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
                        <h3 className="auth_title">Register</h3>
                        <div className="input_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="Username"
                                name="userName"
                                required
                                value={formData.userName}
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="email"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Confirm Password"
                                required
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <div className="auth_submit">
                            <button className="btn btn_primary">Register</button>
                        </div>


                        <div className="auth_toggler">
                            Already have an account ? <Link to="/login">Login</Link>
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

export default Register;
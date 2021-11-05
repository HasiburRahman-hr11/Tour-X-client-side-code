import React, { useState } from 'react';
import Container from '@mui/material/Container';
import googleIcon from '../../images/google-icon.png';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const Login = () => {

    const { googleSignIn, firebaseSignIn, setUser, setError } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const path = location.state?.from.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');


    // Handle Sign is Using Email and Password
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        firebaseSignIn( formData.email, formData.password)
            .then((result) => {
                const user = result.user;
                setUser(user)
                const userInfo = {
                    email: user.email,
                    userName: user.displayName
                }
                createUserToDb(userInfo);
                history.push(path);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
                setError(error)
                setServerError(error.message)
                setLoading(false)
            });

    }

    // Handle Sign inn using Google
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {

                const userInfo = {
                    email: result.user.email || '',
                    userName: result.user?.displayName || ''
                }
                createUserToDb(userInfo);
                history.push(path);
            })
            .catch(error => {
                setError(error);
            })
    }

    // Create new user in the database
    const createUserToDb = async (userInfo) => {
        const { data } = await axios.post('http://localhost:8000/api/auth/register', userInfo);
        const userData = {
            _id: data._id,
            email: data.email,
            displayName: data.userName,
            isAdmin:data.isAdmin
        }
        if (data._id) {
            setUser(userData);
            localStorage.setItem('tour-x-user' , JSON.stringify(userData));
        }
    }

    return (
        <div className="page auth_page">
            <Container fixed>
                <div className="auth_page_wrapper">
                    <form action="" className="auth_form" onSubmit={handleSignIn}>
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

                        {serverError && (
                            <div style={{
                                margin: '20px 0',
                                textAlign: 'center'
                            }}>
                                <p className="auth_error" style={{ fontSize: '15px' }}>{serverError}</p>
                            </div>
                        )}

                        <div className="auth_submit">
                            <button type="submit" className="btn btn_primary">
                                {loading ? (
                                    <CircularProgress sx={{
                                        color: '#fff',
                                        width: '25px !important',
                                        height: '25px !important'
                                    }}
                                    />
                                ) : 'Login'}
                            </button>
                        </div>

                        <div className="auth_toggler">
                            Don't have an account ? <Link to="/register">Create an Account</Link>
                        </div>

                        <div className="auth_alter">
                            <p>OR</p>
                            <button type="button" className="google_btn" onClick={handleGoogleSignIn}>
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
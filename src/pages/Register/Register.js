import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import googleIcon from '../../images/google-icon.png';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const Register = () => {
    const { user, googleSignIn, setUser, setError, error } = useAuth();
    const location = useLocation();
    const path = location.state?.from?.pathname || '/';
    const history = useHistory();
    const auth = getAuth();

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [signUpErrors, setSignUpErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);



    const errors = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isValidated: false
    }

    const handleRegister = (e) => {
        e.preventDefault();
        formValidation();
        setSignUpErrors({ ...errors });




        if (errors.isValidated) {
            handleFirebaseSignUp(formData);
        }

    }



    // Firebase Sign Up Using Email and Password
    const handleFirebaseSignUp = (data) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                updateUsersProfile(data);
                createUserToDb({
                    email: formData.email,
                    userName: formData.userName
                });
                setLoading(false);
                history.push(path);
            })
            .catch((error) => {
                setLoading(false)
                console.log(error.message);
                setError(error);
                setServerError(error.message)
            });
    }

    // Create new user in the database
    const createUserToDb = async (userInfo) => {
        const { data } = await axios.post('http://localhost:8000/api/auth/register', userInfo);
        const userData = {
            _id: data._id,
            email: data.email,
            displayName: data.userName
        }
        if (data._id) {
            setUser(userData)
            localStorage.setItem('tour-x-user', JSON.stringify(userData));
        }
    }

    // Update Firebase User State after registration
    const updateUsersProfile = (data) => {
        updateProfile(auth.currentUser, {
            displayName: data.userName,
            email: data.email
        }).then(() => {
            console.log('Profile Updated')
        }).catch((error) => {
            console.log(error);
            setError(error);
        });
    }

    const formValidation = () => {

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (formData.userName === '') {
            errors.userName = 'This field is required'
        }
        if (!regex.test(formData.email)) {
            errors.email = 'Invalid email address'
        }
        if (formData.email === '') {
            errors.email = 'This field is required'
        }
        if (formData.password === '') {
            errors.password = 'This field is required'
        }
        if (formData.confirmPassword === '') {
            errors.confirmPassword = 'This field is required'
        }

        if (formData.password.length < 6) {
            errors.password = 'At least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Password does not match'
        }

        if (!errors.userName && !errors.email && !errors.password && !errors.confirmPassword) {
            errors.isValidated = true;
        }
    }


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                const path = location.state?.from.pathname || '/';
                history.push(path);
            })
            .catch(error => {
                setError(error);
            })
    }

    return (
        <div className="page auth_page">
            <Container fixed>
                <div className="auth_page_wrapper">
                    <form action="" className="auth_form" onSubmit={handleRegister}>
                        <h3 className="auth_title">Register</h3>
                        <div className="input_group">
                            <input
                                type="text"
                                className={signUpErrors.userName ? 'form_control isInvalid' : 'form_control'}
                                placeholder="Username"
                                name="userName"
                                required
                                value={formData.userName}
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            />
                            {signUpErrors.userName && <p className="auth_error">{signUpErrors.userName}</p>}
                        </div>
                        <div className="input_group">
                            <input
                                type="email"
                                className={signUpErrors.email ? 'form_control isInvalid' : 'form_control'}
                                placeholder="Email Address"
                                name="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {signUpErrors.email && <p className="auth_error">{signUpErrors.email}</p>}
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className={signUpErrors.password ? 'form_control isInvalid' : 'form_control'}
                                placeholder="Password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {signUpErrors.password && <p className="auth_error">{signUpErrors.password}</p>}
                        </div>

                        <div className="input_group">
                            <input
                                type="password"
                                className={signUpErrors.confirmPassword ? 'form_control isInvalid' : 'form_control'}
                                placeholder="Confirm Password"
                                required
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {signUpErrors.confirmPassword && <p className="auth_error">{signUpErrors.confirmPassword}</p>}
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
                            <button className="btn btn_primary" type="submit">
                                {loading ? (
                                    <CircularProgress sx={{
                                        color: '#fff',
                                        width: '25px !important',
                                        height: '25px !important'
                                    }}
                                    />
                                ) : 'Register'}
                            </button>
                        </div>


                        <div className="auth_toggler">
                            Already have an account ? <Link to="/login">Login</Link>
                        </div>

                        <div className="auth_alter">
                            <p>OR</p>
                            <button className="google_btn" onClick={handleGoogleSignIn} type="button">
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
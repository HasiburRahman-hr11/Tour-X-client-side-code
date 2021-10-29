import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email || user.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Packages from './pages/Packages/Packages';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SinglePackage from './pages/SinglePackage/SinglePackage';
import MyOrders from './pages/MyOrders/MyOrders';
import AllOrders from './pages/AllOrders/AllOrders';
import PrivateRoute from './utils/PrivateRoute';
import useAuth from './hooks/useAuth';
import AddNewPackage from './pages/AddNewPackage/AddNewPackage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/packages">
          <Packages />
        </Route>
        <PrivateRoute exact path="/packages/add">
          <AddNewPackage />
        </PrivateRoute>
        <PrivateRoute exact path="/packages/:id">
          <SinglePackage />
        </PrivateRoute>
        <PrivateRoute exact path="/my-orders">
          <MyOrders />
        </PrivateRoute>
        <PrivateRoute exact path="/all-orders">
          <AllOrders />
        </PrivateRoute>

        <Route path="/register">
          {!user.email || !user.displayName
            ? (<Register />)
            : (<Redirect to="/" />)}
        </Route>
        <Route path="/login">
          {!user.email || !user.displayName
            ? (<Login />)
            : (<Redirect to="/" />)}
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
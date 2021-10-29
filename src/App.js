import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Packages from './pages/Packages/Packages';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SinglePackage from './pages/SinglePackage/SinglePackage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/packages">
          <Packages />
        </Route>
        <Route exact path="/packages/:id">
          <SinglePackage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
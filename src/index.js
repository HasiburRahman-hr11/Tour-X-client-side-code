import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/AuthContext';
import PackageContextProvider from './context/PackageContext';
import OrderContextProvider from './context/OrderContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PackageContextProvider>
        <OrderContextProvider>
          <App />
        </OrderContextProvider>
      </PackageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

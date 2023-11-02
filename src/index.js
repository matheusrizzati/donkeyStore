import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Cadastro from './components/Pages/Cadastro'
import Login from './components/Pages/Login'
import Stores from './components/Pages/Stores'
import StorePainel from './components/Pages/StorePainel'
import ClientStore from './components/Pages/ClientStore'
import Checkout from './components/Pages/storeLayouts/Checkout'

const router = createBrowserRouter([
  {path:'/cadastro', element: <Cadastro/>},
  {path:'/login', element: <Login/>},
  {path:'/lojas', element: <Stores/>},
  {path:'/painel', element: <StorePainel/>},
  {path:'/:url', element: <ClientStore />},
  {path:'/checkout', element: <Checkout />}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

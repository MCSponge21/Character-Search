import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './routes/Game';
import './index.css';
import {  createBrowserRouter,
  RouterProvider, } from 'react-router-dom';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cartoon-network",
    element: <Game />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
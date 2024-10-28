// import React from "react";
// import {createRoot} from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";

// const root = createRoot(document.getElementById("root"));
// root.render(<App />);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OrderForm from './board-views/OrderForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/orderform',
    element: <OrderForm />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

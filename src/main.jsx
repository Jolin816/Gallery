import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewPage from '/src/pages/ViewPage.jsx';
import Menu from '/src/pages/Menu.jsx';
import Login from '/src/components/login.jsx';
import SignUpPage from '/src/pages/SignUpPage.jsx';

let user = "alice@gmail.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signUp",
    element: <SignUpPage/>
  },
  {
    path: "/menu",
    element: <Menu user={user}/>
  },
  {
    path: "/viewpage",
    element: <ViewPage user={user}/>
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

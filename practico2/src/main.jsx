import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPelicula from './peliculas/FormPelicula.jsx';
import ListaPeliculas from './peliculas/ListaPeliculas.jsx';
import FormReparto from './Personas/FormReparto.jsx';
import ListaReparto from './Personas/ListaReparto.jsx';
import FormRepartoPeliculas from './Personas/FormRepartoPeliculas.jsx';
import UploadImg from './peliculas/uploadImg.jsx';
import Dashboard from './usuarios/dashboard.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/peliculas",
    element: <ListaPeliculas />
  },
  {
    path: "/admin/peliculas/create",
    element: <FormPelicula />
  },
  {
    path: "/admin/peliculas/:id",
    element: <FormPelicula />
  },
  {
    path: "/admin/personas",
    element: <ListaReparto />, 
  },
  {
    path: "/admin/personas/create",
    element: <FormReparto />, 
  },
  {
    path: "/admin/personas/:id",
    element: <FormReparto />, 
  },
  {
    path: "/admin/peliculas/:id/reparto",
    element: <FormRepartoPeliculas />,
  },
  {
    path: "/admin/peliculas/:id/foto",
    element: <UploadImg />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ListaPeliculas from './pages/peliculas/ListaPeliculas';
import FormPelicula from './pages/peliculas/FormPelicula';
import ListaPersona from './pages/Personas/ListaPersona';
import FormPersona from './pages/personas/FormPersona';
import UploadImg from './pages/peliculas/UploadImg.jsx';
import UploadImgPersona from './pages/Personas/UploadImgPersona.jsx';
import FormAddReparto from './pages/peliculas/FormAddReparto.jsx';
import Dashboard from './pages/usuarios/Dashboard.jsx';
import PeliculaDetalles from './pages/usuarios/PeliculaDetalles.jsx';
import PersonaDetalles from './pages/usuarios/PersonaDetalles.jsx';


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
    element: <ListaPersona />, 
  },
  {
    path: "/admin/personas/create",
    element: <FormPersona />, 
  },
  {
    path: "/admin/personas/:id",
    element: <FormPersona />, 
  },
  {
    path: "/admin/peliculas/:id/foto",
    element: <UploadImg />,
  },
  {
    path: "/admin/personas/:id/foto",
    element: <UploadImgPersona />,
  },
  {
    path: "/admin/peliculas/:id/reparto",
    element: <FormAddReparto />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/peliculas/:id",
    element: <PeliculaDetalles />,
  },
  {
    path: "/personas/:id",
    element: <PersonaDetalles />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
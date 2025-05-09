import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PdfTools from './pages/PdfTools';
import ImageTools from './pages/ImageTools';
import ToolDetail from './pages/ToolDetail';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pdf-tools',
    element: <PdfTools />,
  },
  {
    path: '/image-tools',
    element: <ImageTools />,
  },
  {
    path: '/tools/:toolId',
    element: <ToolDetail />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Página no encontrada</p>
      <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;

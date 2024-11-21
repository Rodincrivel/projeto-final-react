// src/pages/AdminHomePage.jsx

import React from 'react';
import Header from '../components/Header'; // Importar o Header que criamos

function AdminHomePage() {
  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/';
  };

  return (
    <div>
      <Header /> {/* O Header foi adicionado aqui */}

      <h1>Bem-vindo à Área do Administrador</h1>
    </div>
  );
}

export default AdminHomePage;

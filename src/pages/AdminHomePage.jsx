// src/pages/AdminHomePage.jsx

import React from 'react';
import Header from '../components/Header';

function AdminHomePage() {
  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/';
  };

  return (
    <div>
      <Header /> {/* O Header foi adicionado aqui */}

      <div className='container-main'>
        <div>
          <img src="/img.png"  className='img-home' alt="Logo more or less" />
        </div>
        <div>
          <h1>Bem-vindo à Área do Administrador</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;

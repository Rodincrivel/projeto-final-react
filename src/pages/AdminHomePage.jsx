// src/pages/AdminHomePage.jsx

import React from 'react';

function AdminHomePage() {
  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Bem-vindo à Área do Administrador</h1>
      <nav>
        <ul>
          <li><a href="/admin/home">Home</a></li>
          <li>
            Produtos
            <ul>
              <li><a href="/admin/products">Listar Produtos</a></li>
              <li><a href="/admin/products/create">Cadastrar Produto</a></li>
            </ul>
          </li>
          <li>
            Categorias
            <ul>
              <li><a href="/admin/categories">Listar Categorias</a></li>
              <li><a href="/admin/categories/create">Cadastrar Categoria</a></li>
            </ul>
          </li>
          <li>
            Administradores
            <ul>
              <li><a href="/admin/administrators">Listar Administradores</a></li>
              <li><a href="/admin/administrators/create">Cadastrar Administrador</a></li>
            </ul>
          </li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminHomePage;

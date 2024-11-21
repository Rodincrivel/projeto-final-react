// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar as páginas que você irá criar
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/AdminHomePage';
import PrivateRoute from './components/PrivateRoute'; // importar o PrivateRoute
import ProductCreatePage from './pages/ProductCreatePage';
import ProductListPage from './pages/ProductListPage';
import CategoryCreateEditPage from './pages/CategoryCreateEditPage';
import CategoryListPage from './pages/CategoryListPage';
import AdminCreateEditPage from './pages/AdminCreateEditPage';
import AdminListPage from './pages/AdminListPage';
import ProductEditPage from './pages/ProductEditPage';
import './styles/GeneralStyles.css'; // Importação dos estilos gerais


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Rotas protegidas pelo PrivateRoute */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <AdminHomePage />
            </PrivateRoute>
          }
        />

        {/* Rotas para Listagem e Criação de Produtos */}
        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <PrivateRoute>
              <ProductCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductEditPage />
            </PrivateRoute>
          }
        />

        {/* Rotas para Listagem, Criação e Edição de Categorias */}
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <CategoryListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories/create"
          element={
            <PrivateRoute>
              <CategoryCreateEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories/edit/:id"
          element={
            <PrivateRoute>
              <CategoryCreateEditPage />
            </PrivateRoute>
          }
        />

        {/* Rotas para Listagem, Criação e Edição de Administradores */}
        <Route
          path="/admin/administrators"
          element={
            <PrivateRoute>
              <AdminListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/administrators/create"
          element={
            <PrivateRoute>
              <AdminCreateEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/administrators/edit/:id"
          element={
            <PrivateRoute>
              <AdminCreateEditPage />
            </PrivateRoute>
          }
        />

        {/* Defina outras rotas aqui, protegendo-as com o PrivateRoute quando necessário */}
      </Routes>
    </Router>
  );
}

export default App;

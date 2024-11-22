import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminListPage.css'; // Importando o CSS específico
import Header from '../components/Header'; // Importar o Header que criamos

function AdminListPage() {
  const navigate = useNavigate();

  // Estados
  const [administradores, setAdministradores] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const administradoresPorPagina = 6;
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Buscar administradores quando a página ou pesquisa mudar
  useEffect(() => {
    fetchAdministradores();
  }, [paginaAtual, pesquisa]);

  const fetchAdministradores = async () => {
    try {
      const params = {
        _page: paginaAtual,
        _limit: administradoresPorPagina,
        q: pesquisa,
        _sort: 'id',
        _order: 'desc'
      };

      const response = await axios.get('http://localhost:5000/administrators', { params });
      setAdministradores(response.data);

      // Calcula o total de páginas
      const totalAdministradores = response.headers['x-total-count'];
      setTotalPaginas(Math.ceil(totalAdministradores / administradoresPorPagina));
    } catch (error) {
      console.error('Erro ao buscar administradores:', error);
    }
  };

  // Funções de Paginação
  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  // Função para Excluir Administrador
  const excluirAdministrador = async (id) => {
    const confirmar = window.confirm('Deseja realmente excluir este administrador?');
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:5000/administrators/${id}`);
        fetchAdministradores();
      } catch (error) {
        console.error('Erro ao excluir administrador:', error);
      }
    }
  };

  // Renderização da Tabela de Administradores
  return (
    <div>
      <Header />
      <h1>Listagem de Administradores</h1>

      {/* Campo de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {/* Tabela de Administradores */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {administradores.map((administrador) => (
            <tr key={administrador.id}>
              <td>{administrador.id}</td>
              <td>{administrador.ADM_NOME}</td>
              <td>{administrador.ADM_EMAIL}</td>
              <td>{administrador.ADM_ATIVO ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => navigate(`/admin/administrators/edit/${administrador.id}`)}>
                  Editar
                </button>
                <button onClick={() => excluirAdministrador(administrador.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div>
        <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default AdminListPage;

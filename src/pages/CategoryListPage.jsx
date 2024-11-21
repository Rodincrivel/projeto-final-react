import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryListPage.css'; // Importando o CSS específico


function CategoryListPage() {
  const navigate = useNavigate();

  // Estados
  const [categorias, setCategorias] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const categoriasPorPagina = 6;
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Buscar categorias quando a página ou pesquisa mudar
  useEffect(() => {
    fetchCategorias();
  }, [paginaAtual, pesquisa]);

  const fetchCategorias = async () => {
    try {
      const params = {
        _page: paginaAtual,
        _limit: categoriasPorPagina,
        q: pesquisa,
        _sort: 'id',
        _order: 'desc'
      };

      const response = await axios.get('http://localhost:5000/categories', { params });
      setCategorias(response.data);

      // Calcula o total de páginas
      const totalCategorias = response.headers['x-total-count'];
      setTotalPaginas(Math.ceil(totalCategorias / categoriasPorPagina));
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
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

  // Função para Excluir Categoria
  const excluirCategoria = async (id) => {
    const confirmar = window.confirm('Deseja realmente excluir esta categoria?');
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:5000/categories/${id}`);
        fetchCategorias();
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    }
  };

  // Renderização da Tabela de Categorias
  return (
    <div>
      <h1>Listagem de Categorias</h1>

      {/* Campo de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {/* Tabela de Categorias */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.CATEGORIA_NOME}</td>
              <td>
                {categoria.CATEGORIA_DESC.length > 20
                  ? categoria.CATEGORIA_DESC.substring(0, 20) + '...'
                  : categoria.CATEGORIA_DESC}
                {categoria.CATEGORIA_DESC.length > 20 && (
                  <button onClick={() => alert(categoria.CATEGORIA_DESC)}>Ler Mais</button>
                )}
              </td>
              <td>{categoria.CATEGORIA_ATIVO ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => navigate(`/admin/categories/edit/${categoria.id}`)}>
                  Editar
                </button>
                <button onClick={() => excluirCategoria(categoria.id)}>Excluir</button>
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

export default CategoryListPage;

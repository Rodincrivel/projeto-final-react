import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CategoryCreateEditPage.css'; // Importando o CSS específico


function CategoryCreateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para obter o ID da categoria a ser editada, se houver

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [erro, setErro] = useState('');

  // Buscar informações da categoria se houver um ID na URL
  useEffect(() => {
    if (id) {
      buscarCategoria();
    }
  }, [id]);

  const buscarCategoria = () => {
    axios.get(`http://localhost:5000/categories/${id}`)
      .then(response => {
        const categoria = response.data;
        setNome(categoria.CATEGORIA_NOME);
        setDescricao(categoria.CATEGORIA_DESC);
        setAtivo(categoria.CATEGORIA_ATIVO);
      })
      .catch(error => {
        console.error('Erro ao buscar categoria:', error);
        setErro('Categoria não encontrada.');
      });
  };

  // Função de Submissão do Formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações simples
    if (!nome) {
      setErro('O nome da categoria é obrigatório.');
      return;
    }

    try {
      const categoriaData = {
        CATEGORIA_NOME: nome,
        CATEGORIA_DESC: descricao,
        CATEGORIA_ATIVO: ativo
      };

      if (id) {
        // Atualizar categoria existente
        await axios.put(`http://localhost:5000/categories/${id}`, categoriaData);
      } else {
        // Criar nova categoria
        await axios.post('http://localhost:5000/categories', categoriaData);
      }

      // Redirecionar para a lista de categorias após o sucesso
      navigate('/admin/categories');
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setErro('Ocorreu um erro ao salvar a categoria.');
    }
  };

  // Renderização do Formulário
  return (
    <div>
      <h1>{id ? 'Editar Categoria' : 'Cadastrar Categoria'}</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        {/* Campo Descrição */}
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* Campo Ativo */}
        <div>
          <label>Ativo:</label>
          <input
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
          />
        </div>

        {/* Botões de Ação */}
        <div>
          <button type="submit">{id ? 'Atualizar Categoria' : 'Cadastrar Categoria'}</button>
          <button type="button" onClick={() => navigate('/admin/categories')}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryCreateEditPage;

import React, { useState } from 'react';
import axios from 'axios';

function ModalCategoria({ fecharModal, atualizarCategorias }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome) {
      setErro('O nome da categoria é obrigatório.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/categories', {
        CATEGORIA_NOME: nome,
        CATEGORIA_DESC: descricao,
        CATEGORIA_ATIVO: ativo
      });

      atualizarCategorias(); // Atualiza a lista de categorias no formulário principal
      fecharModal(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
      setErro('Ocorreu um erro ao cadastrar a categoria.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cadastrar Nova Categoria</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <label>Ativo:</label>
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
          </div>
          <button type="submit">Cadastrar Categoria</button>
          <button type="button" onClick={fecharModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalCategoria;



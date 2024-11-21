import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AdminCreateEditPage.css'; // Importando o CSS específico



function AdminCreateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para obter o ID do administrador a ser editado, se houver

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [erro, setErro] = useState('');

  // Buscar informações do administrador se houver um ID na URL
  useEffect(() => {
    if (id) {
      buscarAdministrador();
    }
  }, [id]);

  const buscarAdministrador = () => {
    axios.get(`http://localhost:5000/administrators/${id}`)
      .then(response => {
        const administrador = response.data;
        setNome(administrador.ADM_NOME);
        setEmail(administrador.ADM_EMAIL);
        setAtivo(administrador.ADM_ATIVO);
      })
      .catch(error => {
        console.error('Erro ao buscar administrador:', error);
        setErro('Administrador não encontrado.');
      });
  };

  // Função de Submissão do Formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações simples
    if (!nome || !email || !senha) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const administradorData = {
        ADM_NOME: nome,
        ADM_EMAIL: email,
        ADM_SENHA: senha, // Deixe a senha como texto, mas lembre-se que em produção a senha deve ser criptografada.
        ADM_ATIVO: ativo
      };

      if (id) {
        // Atualizar administrador existente
        await axios.put(`http://localhost:5000/administrators/${id}`, administradorData);
      } else {
        // Criar novo administrador
        await axios.post('http://localhost:5000/administrators', administradorData);
      }

      // Redirecionar para a lista de administradores após o sucesso
      navigate('/admin/administrators');
    } catch (error) {
      console.error('Erro ao salvar administrador:', error);
      setErro('Ocorreu um erro ao salvar o administrador.');
    }
  };

  // Renderização do Formulário
  return (
    <div>
      <h1>{id ? 'Editar Administrador' : 'Cadastrar Administrador'}</h1>
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

        {/* Campo E-mail */}
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo Senha */}
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
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
          <button type="submit">{id ? 'Atualizar Administrador' : 'Cadastrar Administrador'}</button>
          <button type="button" onClick={() => navigate('/admin/administrators')}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminCreateEditPage;

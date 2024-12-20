import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css'; // Importando o CSS específico

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/administrators`, {
        params: {
          ADM_EMAIL: email,
          ADM_SENHA: senha,
          ADM_ATIVO: true
        }
      });

      if (response.data.length > 0) {
        // Sucesso no login
        localStorage.setItem('admin', JSON.stringify(response.data[0]));
        window.location.href = '/admin/home';
      } else {
        setErro('E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <div className="login-container">

      <div className='div-content'>
        <h1>ENTRAR</h1>
        {erro && <p>{erro}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div className='div-firula'>
        <h2>Loja de Doces</h2>
      </div>
    </div>
  );
}

export default LoginPage;

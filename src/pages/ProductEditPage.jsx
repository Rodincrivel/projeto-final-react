import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ModalCategoria from '../components/ModalCategoria';
import '../styles/ProductCreateEditPage.css'; // Importando o CSS específico


function ProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para obter o ID do produto a ser editado

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [desconto, setDesconto] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [imagens, setImagens] = useState([{ url: '', ordem: '' }]);
  const [erro, setErro] = useState('');
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);

  // Buscar informações do produto e categorias ao montar o componente
  useEffect(() => {
    atualizarCategorias();
    buscarProduto();
  }, []);

  // Função para buscar as categorias ativas
  const atualizarCategorias = () => {
    axios.get('http://localhost:5000/categories?CATEGORIA_ATIVO=true')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Erro ao buscar categorias:', error));
  };

  // Função para buscar as informações do produto para edição
  const buscarProduto = () => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        const produto = response.data;
        setNome(produto.PRODUTO_NOME);
        setDescricao(produto.PRODUTO_DESC);
        setPreco(produto.PRODUTO_PRECO);
        setDesconto(produto.PRODUTO_DESCONTO);
        setCategoriaSelecionada(produto.CATEGORIA_ID);
        setAtivo(produto.PRODUTO_ATIVO);

        // Buscar as imagens do produto
        axios.get(`http://localhost:5000/product_images?PRODUTO_ID=${id}`)
          .then(response => setImagens(response.data))
          .catch(error => console.error('Erro ao buscar imagens:', error));
      })
      .catch(error => {
        console.error('Erro ao buscar produto:', error);
        setErro('Produto não encontrado.');
      });
  };

  // Manipulação de Imagens
  const adicionarImagem = () => {
    setImagens([...imagens, { url: '', ordem: '' }]);
  };

  const atualizarImagem = (index, campo, valor) => {
    const novasImagens = [...imagens];
    novasImagens[index][campo] = valor;
    setImagens(novasImagens);
  };

  // Função de Submissão do Formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações simples
    if (!nome || !descricao || !preco || !categoriaSelecionada) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Atualizar o produto
      const produtoAtualizado = {
        PRODUTO_NOME: nome,
        PRODUTO_DESC: descricao,
        PRODUTO_PRECO: parseFloat(preco),
        PRODUTO_DESCONTO: parseFloat(desconto),
        CATEGORIA_ID: parseInt(categoriaSelecionada),
        PRODUTO_ATIVO: ativo
      };

      await axios.put(`http://localhost:5000/products/${id}`, produtoAtualizado);

      // Atualizar as imagens associadas ao produto
      // Primeiro, remover todas as imagens existentes para atualizar
      await axios.delete(`http://localhost:5000/product_images?PRODUTO_ID=${id}`);
      
      // Re-adicionar as imagens com as novas informações
      for (const imagem of imagens) {
        if (imagem.url && imagem.ordem) {
          await axios.post('http://localhost:5000/product_images', {
            IMAGEM_URL: imagem.url,
            IMAGEM_ORDEM: parseInt(imagem.ordem),
            PRODUTO_ID: id
          });
        }
      }

      // Redirecionar para a lista de produtos após o sucesso
      navigate('/admin/products');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      setErro('Ocorreu um erro ao atualizar o produto.');
    }
  };

  // Renderização do Formulário
  return (
    <div>
      <h1>Editar Produto</h1>
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
            required
          />
        </div>

        {/* Campo Preço */}
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        {/* Campo Desconto */}
        <div>
          <label>Desconto:</label>
          <input
            type="number"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
          />
        </div>

        {/* Campo Categoria */}
        <div>
          <label>Categoria:</label>
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.CATEGORIA_NOME}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setMostrarModalCategoria(true)}>
            Adicionar Nova Categoria
          </button>
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

        {/* Campos de Imagens */}
        <div>
          <h3>Imagens</h3>
          {imagens.map((imagem, index) => (
            <div key={index}>
              <label>URL da Imagem:</label>
              <input
                type="text"
                value={imagem.url}
                onChange={(e) => atualizarImagem(index, 'url', e.target.value)}
                required
              />
              <label>Ordem da Imagem:</label>
              <input
                type="number"
                value={imagem.ordem}
                onChange={(e) => atualizarImagem(index, 'ordem', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={adicionarImagem}>
            Adicionar Mais Imagens
          </button>
        </div>

        {/* Botões de Ação */}
        <div>
          <button type="submit">Atualizar Produto</button>
          <button type="button" onClick={() => navigate('/admin/products')}>
            Voltar
          </button>
        </div>
      </form>

      {/* Modal para Adicionar Nova Categoria */}
      {mostrarModalCategoria && (
        <ModalCategoria
          fecharModal={() => setMostrarModalCategoria(false)}
          atualizarCategorias={atualizarCategorias}
        />
      )}
    </div>
  );
}

export default ProductEditPage;

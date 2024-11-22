import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImagensProduto from '../components/ImagensProduto';
import '../styles/ProductListPage.css';
import Header from '../components/Header';


function ProductListPage() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
    const [pesquisa, setPesquisa] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 6;
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento

    // Função para Buscar categorias e produtos
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchCategorias(); // Primeiro buscamos as categorias
                await fetchProdutos(); // Depois buscamos os produtos
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [paginaAtual, pesquisa]);

    // Buscar categorias
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    // Buscar produtos
    const fetchProdutos = async () => {
        try {
            const params = {
                _page: paginaAtual,
                _limit: produtosPorPagina,
                q: pesquisa,
                _sort: 'id',
                _order: 'desc',
            };

            const response = await axios.get('http://localhost:5000/products', { params });
            setProdutos(response.data);

            // Calcula o total de páginas
            const totalProdutos = response.headers['x-total-count'];
            setTotalPaginas(Math.ceil(totalProdutos / produtosPorPagina));
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Função de Paginação
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

    // Função para Excluir Produto
    const excluirProduto = async (id) => {
        const confirmar = window.confirm('Deseja realmente excluir este produto?');
        if (confirmar) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                fetchProdutos();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        }
    };

    // Função para obter o nome da categoria usando o ID
    const obterNomeCategoria = (categoriaId) => {
        if (!categorias || categorias.length === 0) return 'Carregando...';
        const categoria = categorias.find((cat) => cat.id === categoriaId);
        return categoria ? categoria.CATEGORIA_NOME : 'Categoria não encontrada';
    };

    // Renderização da Tabela de Produtos
    return (


        <div>
            <Header />
            <h1>Listagem de Produtos</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {/* Campo de Pesquisa */}
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />

                    {/* Tabela de Produtos */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Desconto</th>
                                <th>Categoria</th>
                                <th>Quantidade</th>
                                <th>Ativo</th>
                                <th>Imagens</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.PRODUTO_NOME}</td>
                                    <td>
                                        {produto.PRODUTO_DESC.length > 20
                                            ? produto.PRODUTO_DESC.substring(0, 20) + '...'
                                            : produto.PRODUTO_DESC}
                                        {produto.PRODUTO_DESC.length > 20 && (
                                            <button onClick={() => alert(produto.PRODUTO_DESC)}>Ler Mais</button>
                                        )}
                                    </td>
                                    <td>{produto.PRODUTO_PRECO}</td>
                                    <td>{produto.PRODUTO_DESCONTO}</td>
                                    <td>{obterNomeCategoria(produto.CATEGORIA_ID)}</td> {/* Nome da Categoria */}
                                    <td>{produto.PRODUTO_QTD}</td> {/* Quantidade do Produto */}
                                    <td>{produto.PRODUTO_ATIVO ? 'Sim' : 'Não'}</td>
                                    <td>
                                        {/* Exibir imagens do produto */}
                                        <ImagensProduto produtoId={produto.id} />
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/admin/products/edit/${produto.id}`)}>
                                            Editar
                                        </button>
                                        <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
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
                </>
            )}
        </div>
    );
}

export default ProductListPage;

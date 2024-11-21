import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImagensProduto({ produtoId }) {
  const [imagens, setImagens] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/product_images?PRODUTO_ID=${produtoId}`)
      .then(response => setImagens(response.data))
      .catch(error => console.error('Erro ao buscar imagens:', error));
  }, [produtoId]);

  const imagemAtual = imagens[indiceAtual];

  const avancarImagem = () => {
    setIndiceAtual((indiceAtual + 1) % imagens.length);
  };

  const retornarImagem = () => {
    setIndiceAtual((indiceAtual - 1 + imagens.length) % imagens.length);
  };

  if (imagens.length === 0) {
    return <p>Sem imagens</p>;
  }

  return (
    <div>
      <img src={imagemAtual.IMAGEM_URL} alt={`Imagem do Produto ${produtoId}`} width="100" />
      <div>
        <button onClick={retornarImagem}>Anterior</button>
        <button onClick={avancarImagem}>Próxima</button>
      </div>
    </div>
  );
}

export default ImagensProduto;

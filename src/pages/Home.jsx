import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarProdutos } from '../services/produtoService';
import ProdutoCard from '../componentes/ProdutosCard';
import '../App.css';

function Home() {
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    listarProdutos(1, 10)
      .then(resposta => {
        // Verifica se resposta.dados existe (caso de sucesso do backend)
        const lista = resposta.dados || (Array.isArray(resposta) ? resposta : []);
        const produtosDestaque = lista.filter(p => p.destaque && p.ativo);
        setDestaques(produtosDestaque);
      })
      .catch(err => setErro("Não foi possível carregar os produtos."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <section className="hero-banner">
          <h1>Bem-vindo à Estação do Forno</h1>
          <p>O salgado que tempera o seu dia está aqui.</p>
        </section>
      </div>

      <section className="destaques">
        <h2>Veja Nossos Produtos:</h2>

        {carregando && <p style={{ color: '#9c7b6e' }}>Carregando...</p>}
        {erro && <p style={{ color: '#b94040' }}>{erro}</p>}

        {!carregando && !erro && destaques.length === 0 && (
          <p style={{ color: '#9c7b6e' }}>Nenhum produto em destaque no momento.</p>
        )}

        <div className="destaques-grid">
          {destaques.map(produto => (
            <ProdutoCard
              key={produto.id}
              nomeProduto={produto.nome}
              precoProduto={produto.preco}
              descricao={produto.descricao}
              quantidadeDisponivel={produto.ativo ? 'Disponível' : 'Indisponível'}
              foto={produto.imagem || null}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
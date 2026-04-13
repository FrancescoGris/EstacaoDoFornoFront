import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarProdutos } from '../services/produtoService';
import ProdutoCard from '../componentes/ProdutosCard';
import ModalProduto from '../componentes/ModalProduto/ModalProduto';
import '../App.css';

function Home() {
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    listarProdutos(1, 10)
      .then(resposta => {
        const lista = resposta.dados || (Array.isArray(resposta) ? resposta : []);
        const produtosDestaque = lista.filter(p => p.destaque && p.ativo);
        setDestaques(produtosDestaque);
      })
      .catch(() => setErro("Não foi possível carregar os produtos."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <section className="hero-banner">
          <h1>Bem-vindo à Estação do Forno</h1>
          <p>A doçura que faltava no seu dia está aqui.</p>
          <Link to="/produtos" className="cta-button">Ver Cardápio Completo</Link>
        </section>
      </div>

      <section className="destaques">
        <h2>✨ Produtos em Destaque ✨</h2>

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
              onVerMais={() => setProdutoSelecionado({
                nomeProduto: produto.nome,
                precoProduto: produto.preco,
                descricao: produto.descricao,
                foto: produto.imagem || null,
              })}
            />
          ))}
        </div>
      </section>

      {produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onFechar={() => setProdutoSelecionado(null)}
        />
      )}
    </div>
  );
}

export default Home;
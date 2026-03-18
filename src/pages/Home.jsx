import React from 'react';
import { Link } from 'react-router-dom';
import ProdutoCard from '../componentes/ProdutosCard';
import imgBolo from '../ativos/bolodestaque.png';
import imgCookie from '../ativos/cookiedestaque.png';

// pro CSS funcionar:
import '../App.css'; 

function Home() {
  const produtosDestaque = [
    { 
      id: 1, 
      nome: "Bolo teste3", 
      preco: 45.00, 
      desc: "O campeão de gosto bom",
      qtd: 5,
      foto: imgBolo 
    },
    { 
      id: 3, 
      nome: "Cookie teste3", 
      preco: 8.00, 
      desc: "testando edição limitada.",
      qtd: 12,
      foto: imgCookie 
    }
  ];

  return (
    <div className="home-container">
      {/* Mini banner de Bem-vindo */}
      <div className="hero-wrapper">
        <section className="hero-banner">
          <h1>Bem-vindo à Doce Mix</h1>
          <p>A doçura que faltava no seu dia está aqui.</p>
          <Link to="/produtos" className="cta-button">Ver Cardápio Completo</Link>
        </section>
      </div>

      {/* Seção de Destaques */}
      <section className="destaques">
        <h2>✨ Produtos em Destaque ✨</h2>
        <div className="destaques-grid">
          {produtosDestaque.map((doce) => (
            <ProdutoCard 
              key={doce.id} 
              nomeProduto={doce.nome} 
              precoProduto={doce.preco} 
              descricao={doce.desc}
              quantidadeDisponivel={doce.qtd}
              foto={doce.foto}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
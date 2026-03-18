import React from 'react';
import ProdutoCard from '../componentes/ProdutosCard'; 

import imgBolo from '../ativos/bolo.png'; 
import imgBrownie from '../ativos/brownie.png';
import imgCookie from '../ativos/cookie.png';

function Produtos() {
  const listaDeDoces = [
    { 
      id: 1, 
      nome: "Bolo teste", 
      preco: 45.00, 
      desc: "Bolo qualquer.",
      qtd: 10,
      imagem: imgBolo
    },
    { 
      id: 2, 
      nome: "Brownie ruim", 
      preco: 12.50, 
      desc: "Brownie podre.",
      qtd: 15,
      imagem: imgBrownie
    },
    { 
      id: 3, 
      nome: "Cookie teste2", 
      preco: 8.00, 
      desc: "Cookie blablabla.",
      qtd: 20,
      imagem: imgCookie
    }
  ];

  return (
    <div style={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Nossa Vitrine</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' , marginTop: '20px' }}>
        {listaDeDoces.map((doce) => (
          <ProdutoCard 
            key={doce.id} 
            nomeProduto={doce.nome} 
            precoProduto={doce.preco} 
            descricao={doce.desc}
            quantidadeDisponivel={doce.qtd}
            foto={doce.imagem}
          />
        ))}
      </div>
    </div>
  );
}

export default Produtos;
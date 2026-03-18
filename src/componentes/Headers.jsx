import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../ativos/logotransparente.png';
import './Headers.css';

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImg} alt="Doce Mix Logo" />
          <span>Doce Mix</span>
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/carrinho" className="carrinho">🛒</Link>
      </nav>
    </header>
  );
}

export default Header;
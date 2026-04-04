import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Headers";
import Footer from "./componentes/Footer";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Cadastro from './pages/Cadastro';
import Sobre from './pages/Sobre';
import { Routes, Route } from 'react-router-dom';

function App(){
  return(
  <>
    <Header /> {/* Ocupa o topo */}
    
    <div className="layout-principal">
      <Sidebar /> {/* Coluna esquerda */}
      
      <main className="conteudo-da-pagina"> {/* Coluna direita */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </div>

    <Footer /> {/* Footer no final da página */}
  </>
  )
}

export default App;
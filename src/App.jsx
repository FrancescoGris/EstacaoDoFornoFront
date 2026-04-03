import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Headers";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Cadastro from './pages/Cadastro';
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
      </Routes>
    </main>
  </div>
</>
  )
}

export default App;
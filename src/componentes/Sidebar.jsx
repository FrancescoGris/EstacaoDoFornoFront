import { useEffect, useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/categorias")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.dados)) {
          setCategorias(data.dados);
        }
      })
      .catch((err) => console.error("Erro:", err));
  }, []);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">Categorias</h2>
      <ul className="sidebar-lista">
        {categorias.map((cat) => (
          <li key={cat.id} className="sidebar-item">
            {cat.descricao}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
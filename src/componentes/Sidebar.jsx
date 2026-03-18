import "./Sidebar.css";

function Sidebar(){
    return(
        <aside className="sidebar">
            <h2 className="sidebar-titulo">Categorias</h2>
            <ul className="sidebar-lista">
                <li className="sidebar-item">Bolos</li>
                <li className="sidebar-item">Brownies</li>
                <li className="sidebar-item">Cookies</li>
                <li className="sidebar-item">Pedidos personalizados</li>
            </ul>
        </aside>
    )
}

export default Sidebar;
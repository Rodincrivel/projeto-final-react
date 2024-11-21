import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Estilos que serão reutilizados do seu CSS original

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/');
    };

    return (
        <header>
            <nav>
                <div className="nav-top-section">
                    <span className="line"></span>
                    <a href="/">
                        <img src="/logo.svg" alt="Logo Charlie Loja de Doces" />
                    </a>
                    <span className="line"></span>
                </div>

                <div className="nav-center-section">
                    <div className="invisible-placeholder">
                    </div>

                    <div className="store-name-arc">
                        <svg width="293.1" height="59.41" viewBox="0 0 293.1 59.41">
                            <path id="arcPath" d="M0,59.41 Q146.55,30 293.1,59.41" fill="transparent" />
                            <text fontFamily="Bebas Neue" fontSize="48px" fill="#591F12">
                                <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
                                    LOJA DE DOCES
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    <button onClick={handleLogout} className="logout-button">Logout</button>
                    <div className="logout-placeholder"></div>
                </div>

                <div className="nav-bottom-section">
                    <div className="nav-bottom-content">
                        <a href="/admin/home">
                            Home
                        </a>

                        <div className="dropdown">
                            <span>Produtos
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(89, 31, 18, 1)' }}>
                                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                </svg>
                            </span>
                            <div className="dropdown-content">
                                <a href="/admin/products">Listar Produtos</a>
                                <a href="/admin/products/create">Cadastrar Produto</a>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span>Categorias
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(89, 31, 18, 1)' }}>
                                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                </svg>
                            </span>
                            <div className="dropdown-content">
                                <a href="/admin/categories">Listar Categorias</a>
                                <a href="/admin/categories/create">Cadastrar Categoria</a>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span>Administradores
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(89, 31, 18, 1)' }}>
                                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                </svg>
                            </span>
                            <div className="dropdown-content">
                                <a href="/admin/administrators">Listar Administradores</a>
                                <a href="/admin/administrators/create">Cadastrar Administrador</a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;

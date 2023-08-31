import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import stylesMenu from "css/Menu.module.css"
import chevronDownIcon from "assets/images/icons/chevronDownIcon.svg"
import separatorFooter from "assets/images/SeparatorFooter.svg"
import {useSelector} from "react-redux";

const Menu = () => {

    const {typeOfUser} = useSelector(state => state.user)
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    return (
        <header className={stylesMenu.Menu}>
            <button
                onClick={toggleMenu}
                className={stylesMenu.MenuButton}>
                <svg className={stylesMenu.MenuSvg} xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd"/>
                </svg>
            </button>
            <nav className={stylesMenu.MenuNav + ` ${menu ? stylesMenu.MenuNavIsActive : ''}`}>
                <ul className={stylesMenu.MenuUl}>
                    <li className={stylesMenu.MenuLi}>
                        <NavLink to="/">Inicio</NavLink>
                    </li>
                    <li className={stylesMenu.MenuLi}>
                        <NavLink to="/AboutUs">Sobre ACUDEN</NavLink>
                    </li>
                    <li className={stylesMenu.MenuLi}>
                        <NavLink to="/Contact">Contacto</NavLink>
                    </li>
                    {typeof typeOfUser == "string" && typeOfUser?.includes('EMPLOYEE') && <li className={stylesMenu.MenuLi}>
                        <NavLink to={'/Resources'}>Cursos</NavLink>
                    </li>}
                    <li className={stylesMenu.MenuLi}>
                        <a href="#">Herramientas</a>
                        <img className={stylesMenu.chevronDownIcon} src={chevronDownIcon} alt="flecha abajo"/>
                        <ul className={stylesMenu.MenuLiUl}>
                            <li className={stylesMenu.MenuLiUlLi}><NavLink to="/ProviderDirectory">Directorio de
                                proveedores</NavLink></li>
                            <li className={stylesMenu.MenuLiUlLi}><NavLink to="/Calendar">Calendario</NavLink></li>
                            <li className={stylesMenu.MenuLiUlLi}><NavLink to="/Library">Biblioteca</NavLink></li>
                            <li className={stylesMenu.MenuLiUlLi}><NavLink to="/News">Noticias</NavLink></li>
                        </ul>
                    </li>
                    <div className={stylesMenu.MenuButtonMovil}>
                        <div className="row">
                            <img className={stylesMenu.MenuSeparator} src={separatorFooter}/>
                        </div>
                        <div className={stylesMenu.MenuLi}>
                            <NavLink to="#">Inicia sesión</NavLink>
                        </div>
                        <div className={stylesMenu.MenuLi}>
                            <NavLink to="#">Crear Cuenta</NavLink>
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Menu

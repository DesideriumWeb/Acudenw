import React, {useEffect, useRef, useState} from 'react';
import styles from "css/Style.module.css";
import stylesTop from "css/Top.module.css"
import logoLoggedIn from "assets/images/logo-logged-in.svg"
import deptFamSvg from 'assets/images/deptFamSvg.svg'
import iconBellSolid from "assets/images/icons/icon-bell-solid.svg"
import Menu from 'components/HomeComponents/Menu'
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import DropdownNavigation from "../DropdownNavigation";
import NavBarNotifications from "../NavBarNotifications";
import useNotifications from "../../hooks/Notifications/useNotifications";

export function Top() {
    const navigate = useNavigate()
    const {isLoggedIn, typeOfUser} = useSelector(state => state.user)
    const ref = useRef(null)
    const [showNotifications, setShowNotifications] = useState(false)
    const [retry, setRetry] = useState(0)
    const notifications = useNotifications(typeOfUser, retry)
    useEffect(() => {
        if (window && ref.current) {
            window.addEventListener('click', (e) => {
                if (ref.current?.contains(e.target) || e.target.id === 'iconBell') {
                } else {
                    setShowNotifications(false)
                }
            })
            return window.removeEventListener('click', () => {
            })
        }
    }, [])

    return (
        <div>
            <header>
                <div className={styles.container}>
                    <div className={stylesTop.topbar}>
                        <img className={stylesTop.pgLogo} src={logoLoggedIn} alt="ACUDEN Quality System Logo"/>
                        <img className={stylesTop.pgLogo} src={deptFamSvg} alt="Family Department Logo"/>

                        <Menu/>
                        <NavBarNotifications showNotifications={showNotifications} notifications={notifications}
                                             ref={ref}/>
                        {!isLoggedIn ? (<>
                            <button className={stylesTop.singIn} onClick={() => navigate("/Login")}><a>Inicia sesión</a>
                            </button>
                            {/*Crear vista intermedia y desde ahi salen los links a los registros respectivos -delete comentario al hacerlo-*/}
                            <button className={stylesTop.register} onClick={() => navigate("/SelectRegisterType")}><a>Crear
                                Cuenta</a></button>
                        </>) : (
                            <>
                                <div id={'toggleNotifications'}
                                     onClick={() => {
                                         setRetry((prevState) => prevState + 1)
                                         setShowNotifications((prevState) => !prevState)
                                     }}
                                     className={'hover:tw-cursor-pointer'}>
                                    <img id={'iconBell'} src={iconBellSolid} alt="notifications"/>
                                </div>

                                <DropdownNavigation/>
                            </>
                        )}

                        {/*en caso de estar logueado se muestra lo siguiente:
                            <div className={styles.userMenu}>
                                <a className={styles.notifications} href="https://google.com">
                                    <img src={iconBellSolid} alt="notifications" />
                                </a>
                                <a className={styles.faq} href="https://google.com">
                                    <img src={iconFaq} alt="questions" />
                                </a>
                                <a className={styles.profile} href="https://google.com">
                                    <img className={styles.profileImage} src={profileImg} alt="profile" />
                                    <ul className={styles.profileSubnav}>
                                        <li>Mi Perfil</li>
                                        <li>Ajustes</li>
                                        <li>Politica de privacidad</li>
                                        <li>Términos de uso</li>
                                        <li>Cerrar sesión</li>
                                    </ul>
                                </a>

                                <div className={styles.mobileBtn}>
                                    <img className={styles.menu} src={iconMenu} alt="mobile menu" />
                                    <img className={styles.close} src={iconMenuClose} alt="mobile menu close" />
                                </div>

                            </div>
                            */}
                    </div>
                    {/*Menu mobile?
                        <div className={styles.mobileMenu}>
                            <div className={styles.mobileProfile}>
                                <img className={styles.profileImage} src={profileImg} alt="profile" />
                                <p className={styles.profileName}>Bright Beginnings</p>
                                <p className={styles.subtitle}>Proveedor de Servicios</p>
                            </div>
                            <div className={styles.mobileNav}>
                                <ul>
                                    <li>
                                        <a href="https://google.com">Inicio</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Calendario</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Directorio de Proveedores</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Biblioteca</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Noticias</a>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className={styles.mobileProfileMenu}>
                                <ul>
                                    <li>
                                        <a href="https://google.com">Mi Perfil</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Ajustes</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Politica de privacidad</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Términos de uso</a>
                                    </li>
                                    <li>
                                        <a href="https://google.com">Cerrar sesión</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        */}
                </div>
            </header>
        </div>
    );
}

import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hook/useAuth";

import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props;
    const user = useAuth();
    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="Twittor" />

            <Link to="/">
                <FontAwesomeIcon icon={faHome} />Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} />Usuarios
            </Link>
            <Link to={`/${user?._id}`}>
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesion
            </Link>

            <Button>Twittear</Button>
        </div>
    )
}

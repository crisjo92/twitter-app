import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';

import BasicModal from "../../components/Modal/BasicModal";

import SingUpForm from '../../components/SingUpForm';
import SignInForm from "../../components/SingInForm";
import LogoWhiteTwittor from "../../assets/png/logo-white.png";
import LogoTwittor from "../../assets/png/logo.png";
import "./SingInSingUp.scss";

export default function SingInSingUp(props) {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(true);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    }

    return (
        <>
            <Container className="singin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent
                        openModal={openModal}
                        setShowModal={setShowModal}
                        setRefreshCheckLogin={setRefreshCheckLogin}
                    />
                </Row>
            </Container>
            <BasicModal
                show={showModal}
                setShow={setShowModal}
            >
                {contentModal}
            </BasicModal>
        </>
    );
}


function LeftComponent() {
    return (
        < Col className="singin-signup__left" xs={6} >
            <img src={LogoTwittor} alt="Twittor" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue lo que te interesa
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    Enterate de que esta hablando la gente
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    Unete a la conversacion
                </h2>
            </div>
        </Col >
    );
}

function RightComponent(props) {

    const { openModal, setShowModal, setRefreshCheckLogin } = props;
    return (
        < Col className="singin-signup__right" xs={6}>
            <div>
                <img src={LogoWhiteTwittor} alt="Twittor" />
                <h2>Mira lo que esta pasando en el mundo en este momento</h2>
                <h3>Unete a Twittor hoy mismo</h3>
                <Button
                    variant="primary"
                    onClick={() => openModal(<SingUpForm setShowModal={setShowModal} />)}
                >
                    Registrate
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />)}
                >
                    Iniciar Sesion
                </Button>
            </div>
        </Col >
    );
}
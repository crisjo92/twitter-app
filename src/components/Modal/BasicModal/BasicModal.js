import React from 'react';
import { Modal } from "react-bootstrap";
import LogoWithTwittor from "../../../assets/png/logo-white.png";

import "./BasicModal.scss";

export default function BasicModel(props) {
    const { show, setShow, children } = props;

    return (
        <Modal className="basic-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={LogoWithTwittor} alt="Twittor" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal >
    )
}

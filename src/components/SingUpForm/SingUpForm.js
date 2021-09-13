import React, { useState } from 'react';

import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from "lodash";
import { toast } from "react-toastify";

import "./SingUpForm.scss";
import { isEmailValid } from "../../utils/validations";
import { singUpApi } from "../../api/auth";

export default function SingUpForm(props) {

    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [singUpLoading, setsingUpLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //setShowModal(false);

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++
            return null
        });

        if (validCount !== size(formData)) {
            toast.warning("Completa todos los campos del Formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email Invalido");
            } else if (formData.password !== formData.repeatPassword) {
                toast.warning("Contraseña deben ser iguales");
            } else if (size(formData.password) < 6) {
                toast.warning("Contraseña debe tener minimo 6 caracteres");
            } else {
                setsingUpLoading(true);
                singUpApi(formData).then(response => {
                    if (response.code) {
                        toast.warning(response.message);
                    } else {
                        toast.success("El Registro ha sido Correcto");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                }).catch(() => {
                    toast.error("Error del Servidor, Intentelo mas tarde");
                }).finally(() => {
                    setsingUpLoading(false);
                });
            }
        }
        //console.log(validCount);
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="sing-up-form">
            <h2>Crea tu Cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre" name="nombre"
                                defaultValue={formData.nombre} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="apellidos"
                                defaultValue={formData.apellidos}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo Electronico" name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Contraseña" name="password"
                                defaultValue={formData.password}
                            />
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Repetir Contraseña" name="repeatPassword"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {!singUpLoading ? "Registrarse" : <Spinner animation="border" />}

                </Button>
            </Form>
        </div>
    )
}


function initialFormValue() {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: ""

    };
}
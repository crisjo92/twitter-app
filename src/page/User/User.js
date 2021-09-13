import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from '../../components/User/BannerAvatar';
import { getUsurApi } from "../../api/user";
import useAuth from '../../hook/useAuth';
import InfoUser from '../../components/User/InfoUser';


import "./User.scss";


function User(props) {


    const { match } = props;
    const [user, setUser] = useState(null);
    const { params } = match;
    const loggedUser = useAuth();

    useEffect(() => {
        getUsurApi(params.id)
            .then(response => {
                //console.log("aqui " + response);

                if (!response) {
                    toast.error("El Usuario que has visitado no existe");
                }
                setUser(response);
            })
            .catch(() => {
                toast.error("El Usuario que has visitado no existe");
            });
    }, [params]);

    return (
        <BasicLayout className="user">
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Usuario No Existe"}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className="user__tweets">Lista Tweets</div>
        </BasicLayout>
    )
}

export default withRouter(User);
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';
import classes from './LoginPage.module.css';

const LoginPage = () => {

    const history = useHistory();
    const homePath = useSelector(state => state.routes.frontend.home);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const request = useBackendRequest();
    const dispatch = useDispatch();

    const emailChangeHandler = data => {
        setEmail(data.target.value);
    }

    const passwordChangeHandler = data => {
        setPassword(data.target.value);
    }


    const loginFormHandler = event => {
        event.preventDefault();

        const data = {
            email,
            password
        }

        const response = request.backendRequest({
            url: '/login',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        response.then(data => {
            if (data.error === false) {
                localStorage.setItem('token', data.token);
                dispatch(authActions.login({ userData: data.user, token: data.token }));
                history.replace(homePath);
            } else {
                console.log(data)
            }
        });
    }

    return (
        <div className={`d-flex ${classes.background}`} style={{ height: '100vh' }}>
            <div className="container align-self-center col-8 col-md-5 col-lg-4 bg-white rounded-3">
                <div className="">
                    <div className="col text-center mb-4">
                        <h1 className="mt-3">Incia sesion</h1>
                        <p className="">Inicia sesion para continuar</p>
                        <a href='/register'>O registrate</a>
                    </div>

                    <div className="col mx-auto col-11 mb-4">
                        <form className="p-4 p-md-5 border rounded-3" onSubmit={loginFormHandler}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={emailChangeHandler} value={email} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={passwordChangeHandler} value={password} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
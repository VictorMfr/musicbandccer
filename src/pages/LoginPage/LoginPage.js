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
        <div className="vw-100 vh-100 bg-light">
            <div className={`position-absolute top-50 start-50 translate-middle ${classes.formSizing}`}>
                <div className='bg-white p-4 rounded-3'>
                    <div className='mb-3'>
                        <img className='d-block mx-auto mb-3' src='/imgs/logo_iglesia.svg' width="72" />
                        <h5 className='text-center'>Iniciar sesión</h5>
                    </div>
                    <form className='mb-3' onSubmit={loginFormHandler}>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label fs-6">Correo electrónico</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="correo@ejemplo.com" onChange={emailChangeHandler} value={email}  />
                            <br />
                            <label for="exampleFormControlInput2" class="form-label fs-6">Contraseña</label>
                            <input type="password" class="form-control" id="exampleFormControlInput2" onChange={passwordChangeHandler} value={password}/>
                            <br />
                            <button className='btn btn-primary w-100' type='submit'>Iniciar sesión</button>
                        </div>
                    </form>
                </div>
                <br/>
                <div className='bg-white px-4 py-1 rounded-3 d-flex align-items-center'>
                    <p className='m-0'>¿Nuevo Integrante?</p>
                    <button className='btn btn-link px-1'>Registrate</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
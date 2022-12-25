import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';
import classes from './RegisterPage.module.css';

const RegisterPage = () => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessKey, setAccessKey] = useState('');

    const request = useBackendRequest();
    const dispatch = useDispatch();

    const usernameChangeHandler = event => {
        setUsername(event.target.value);
    }

    const emailChangeHandler = event => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    }

    const accessKeyChangeHandler = event => {
        setAccessKey(event.target.value);
    }

    const submitFormHandler = async event => {
        event.preventDefault();

        const data = {
            username,
            email,
            password,
            accessKey
        }

        try {
            const response = await request.backendRequest({
                url: '/user',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            if (response.error) {
                throw new Error(response.message);
            }

            setUsername('');
            setEmail('');
            setPassword('');
            setAccessKey('')

            localStorage.setItem('token', response.token);
            dispatch(authActions.login({ userData: response.user, token: response.token }));
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="vw-100 vh-100 bg-light">
            <div className={`position-absolute top-50 start-50 translate-middle ${classes.formSizing}`}>
                <div className='bg-white p-4 rounded-3'>
                    <div className='mb-3'>
                        <img className='d-block mx-auto mb-3' src='/imgs/logo_iglesia.svg' alt="" width="72" />
                        <h5 className='text-center'>Registro</h5>
                    </div>
                    <form className='mb-3' onSubmit={submitFormHandler}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Nombre de usuario</label>
                            <input type="text" className="form-control mb-2" id="exampleFormControlInput1" onChange={usernameChangeHandler} value={username}  />
                            
                            <label htmlFor="exampleFormControlInput2" className="form-label fs-6">Correo electrónico</label>
                            <input type="email" className="form-control mb-2" id="exampleFormControlInput2" placeholder="correo@ejemplo.com" onChange={emailChangeHandler} value={email}  />
                            
                            <label htmlFor="exampleFormControlInput3" className="form-label fs-6">Contraseña</label>
                            <input type="password" className="form-control mb-2" id="exampleFormControlInput3" onChange={passwordChangeHandler} value={password}/>
                            
                            <label htmlFor="exampleFormControlInput4" className="form-label fs-6">Llave de acceso</label>
                            <input type="password" className="form-control mb-4" id="exampleFormControlInput4" onChange={accessKeyChangeHandler} value={accessKey}/>
                            
                            <button className='btn btn-primary w-100' type='submit'>Registrarse</button>
                        </div>
                    </form>
                </div>
                <br/>
                <div className='bg-white px-4 py-1 rounded-3 d-flex align-items-center'>
                    <p className='m-0'>¿Ya te has registrado?</p>
                    <button className='btn btn-link px-1'>Incia sesión</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
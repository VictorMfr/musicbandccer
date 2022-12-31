import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingCycle from '../../components/General/Header/LoadingCycle/LoadingCycle';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';
import classes from './LoginPage.module.css';

const LoginPage = () => {
    const history = useHistory();
    const paths = useSelector(state => state.routes.frontend);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonMode, setButtonMode] = useState(false);
    const [errors, setErrors] = useState(false);

    const request = useBackendRequest();
    const dispatch = useDispatch();

    const emailChangeHandler = data => {
        if (errors) setErrors(false)
        setEmail(data.target.value);
    }

    const passwordChangeHandler = data => {
        if (errors) setErrors(false)
        setPassword(data.target.value);
    }

    useEffect(() => {
        if (email.length > 0 && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email) && password.length >= 6 ) {
            setButtonMode(true);
        } else {
            setButtonMode(false);
        }
    }, [email, password])


    const loginFormHandler = async event => {
        event.preventDefault();

        setLoading(true);

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
                history.replace(paths.home);
                setLoading(false);
            } else {
                setLoading(false);
                setErrors(true)
            }
        });
    }

    return (
        <>
            <div className="vw-100 vh-100 bg-light position-absolute">
                <div className={`position-absolute top-50 start-50 translate-middle`}>
                    <div className={`bg-white p-4 rounded-3  ${classes.formSizing}`}>
                        <div className='mb-3'>
                            <img className={`d-block mx-auto mb-2`} src='/imgs/logo_iglesia.jpeg' alt="" width="50" />
                            <h5 className='text-center'>Iniciar sesión</h5>
                        </div>
                        <form className='mb-3' onSubmit={loginFormHandler}>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Correo electrónico</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="correo@ejemplo.com" onChange={emailChangeHandler} value={email} />
                                <br />
                                <label htmlFor="exampleFormControlInput2" className="form-label fs-6">Contraseña</label>
                                <input type="password" className="form-control" id="exampleFormControlInput2" onChange={passwordChangeHandler} value={password} />
                                {errors && <small className='d-block text-center my-2 text-danger'>Correo o contraseña incorrectas</small>}
                                {!errors && <br/>}
                                <button className='btn btn-primary w-100' type='submit' disabled={!buttonMode}>Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                    <br />
                    <div className='bg-white px-4 py-1 rounded-3 d-flex align-items-center justify-content-center'>
                        <p className='m-0'>¿Nuevo Integrante?</p>
                        <button className='btn btn-link px-1' onClick={() => history.push(paths.register)}>Registrate</button>
                    </div>
                </div>
            </div>
            <LoadingCycle show={loading} />
        </>
    );
}

export default LoginPage;
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingCycle from '../../components/General/Header/LoadingCycle/LoadingCycle';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';
import classes from './RegisterPage.module.css';

const initialRegisterData = {
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    accessKey: '',

    usernameValid: null,
    emailValid: null,
    passwordValid: null,
    passwordCheckValid: null,

    accessKeyValid: null
}

const registerReducer = (state, action) => {
    switch (action.type) {
        case "USERNAME_UPDATE":
            return { ...state, username: action.value }
        case "USERNAME_VALID_UPDATE":
            return { ...state, usernameValid: action.value }
        case "EMAIL_UPDATE":
            return { ...state, email: action.value }
        case "EMAIL_VALID_UPDATE":
            return { ...state, emailValid: action.value }
        case "PASSWORD_UPDATE":
            return { ...state, password: action.value }
        case "PASSWORD_VALID_UPDATE":
            return { ...state, passwordValid: action.value }
        case "PASSWORD_CHECK_UPDATE":
            return { ...state, passwordCheck: action.value }
        case "PASSWORD_CHECK_VALID_UPDATE":
            return { ...state, passwordCheckValid: action.value }
        case "ACCESSKEY_UPDATE":
            return { ...state, accessKey: action.value }
        case "ACCESSKEY_VALID_UPDATE":
            return { ...state, accessKeyValid: action.value }
        case "CLEAR":
            return initialRegisterData;
        default:
            return state;
    }
}


const RegisterPage = () => {
    const [registerCredentials, updateCredentials] = useReducer(registerReducer, initialRegisterData);
    const [buttonMode, setButtonMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const paths = useSelector(state => state.routes.frontend);
    const request = useBackendRequest();
    const dispatch = useDispatch();
    const history = useHistory();

    const usernameChangeHandler = event => {
        setErrors({});
        updateCredentials({ type: "USERNAME_VALID_UPDATE", value: null });
        updateCredentials({ type: "USERNAME_UPDATE", value: event.target.value })
    }
    const emailChangeHandler = event => {
        setErrors({});
        updateCredentials({ type: "EMAIL_VALID_UPDATE", value: null });
        updateCredentials({ type: "EMAIL_UPDATE", value: event.target.value })
    }

    const passwordChangeHandler = event => {
        setErrors({});
        updateCredentials({ type: "PASSWORD_VALID_UPDATE", value: null })
        updateCredentials({ type: "PASSWORD_UPDATE", value: event.target.value })
    }

    const passwordCheckChangeHandler = event => {
        setErrors({});
        updateCredentials({ type: "PASSWORD_CHECK_VALID_UPDATE", value: null })
        updateCredentials({ type: "PASSWORD_CHECK_UPDATE", value: event.target.value })
    }

    const accessKeyChangeHandler = event => {
        setErrors({});
        updateCredentials({ type: "ACCESSKEY_VALID_UPDATE", value: null })
        updateCredentials({ type: "ACCESSKEY_UPDATE", value: event.target.value });
    }

    useEffect(() => {
        if ((registerCredentials.username !== '' && registerCredentials.email !== '' && registerCredentials.password !== '' && registerCredentials.passwordCheck !== '' && registerCredentials.accessKey) && (registerCredentials.usernameValid !== false) && (registerCredentials.emailValid !== false) && (registerCredentials.passwordValid !== false) && (registerCredentials.passwordCheckValid !== false)) {
            setButtonMode(true);
        } else {
            setButtonMode(false)
        }

    }, [registerCredentials.email, registerCredentials.password, registerCredentials.passwordCheck, registerCredentials.username, registerCredentials.accessKey, registerCredentials.emailValid, registerCredentials.passwordCheckValid, registerCredentials.passwordValid, registerCredentials.usernameValid])

    const submitFormHandler = async event => {
        event.preventDefault();

        let usernameValidation, emailValidation, passwordValidation, passwordCheckValidation, accessKeyValidation = false;

        if (registerCredentials.username.length < 6) {
            updateCredentials({ type: "USERNAME_VALID_UPDATE", value: false });
        } else {
            updateCredentials({ type: "USERNAME_VALID_UPDATE", value: true });
            usernameValidation = true;
        }

        if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(registerCredentials.email)) {
            updateCredentials({ type: "EMAIL_VALID_UPDATE", value: false });
        } else {
            updateCredentials({ type: "EMAIL_VALID_UPDATE", value: true });
            emailValidation = true;
        }

        if (registerCredentials.password.length < 6) {
            updateCredentials({ type: "PASSWORD_VALID_UPDATE", value: false });
        } else {
            updateCredentials({ type: "PASSWORD_VALID_UPDATE", value: true });
            passwordValidation = true
        }

        if ((registerCredentials.passwordCheck !== registerCredentials.password)) {
            updateCredentials({ type: "PASSWORD_CHECK_VALID_UPDATE", value: false });
        } else if (registerCredentials.passwordCheck === '') {
            updateCredentials({ type: "PASSWORD_CHECK_VALID_UPDATE", value: false });
        } else if (registerCredentials.passwordCheck === registerCredentials.password) {
            updateCredentials({ type: "PASSWORD_CHECK_VALID_UPDATE", value: true });
            passwordCheckValidation = true;
        }

        const response = await request.backendRequest({
            url: '/accesskey',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: { accessKey: registerCredentials.accessKey }
        })

        if (response.accessKeyCheck === false) {
            updateCredentials({ type: "ACCESSKEY_VALID_UPDATE", value: false });
        } else {
            updateCredentials({ type: "ACCESSKEY_VALID_UPDATE", value: true });
            accessKeyValidation = true;
        }

        if (!(registerCredentials.usernameValid
            && registerCredentials.passwordValid
            && registerCredentials.emailValid
            && registerCredentials.passwordCheckValid
            && registerCredentials.accessKeyValid) || !(usernameValidation && emailValidation && passwordValidation && passwordCheckValidation && accessKeyValidation)) {

            if (!(usernameValidation && emailValidation && passwordValidation && passwordCheckValidation && accessKeyValidation)) {
                return
            }
        }

        setLoading(true)

            try {
                const response = await request.backendRequest({
                    url: '/user',
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: registerCredentials
                });


                if (!response.error) {
                    localStorage.setItem('token', response.token);
                    dispatch(authActions.login({ userData: response.user, token: response.token }));
                    updateCredentials({ type: "CLEAR" })
                    setLoading(false);
                }

                switch (response.error.code) {
                    case 11000:
                        setErrors(response.error.keyValue);
                        break;
                    default:
                        return
                }
                setLoading(false);
            } catch (error) {
                return
            }

    }

    return (
        <>
            <div className="vw-100 vh-100 bg-light position-absolute">
                <div className={`position-absolute top-50 start-50 translate-middle`}>
                    <div className={`bg-white p-4 rounded-3 ${classes.formSizing}`}>
                        <div className='mb-3'>
                            <img className='d-block mx-auto mb-2' src='/imgs/logo_iglesia.jpeg' alt="" width="50" />
                            <h5 className='text-center'>Registro</h5>
                        </div>
                        <form className='mb-3 needs-validation' onSubmit={submitFormHandler} noValidate >
                            <div className="mb-3">

                                <div className="position-relative mb-2">
                                    <label htmlFor="usernameInput" className="form-label">Nombre de usuario</label>
                                    <input type="text" className={`form-control ${(registerCredentials.usernameValid && !errors.username) ? 'is-valid' : ((registerCredentials.usernameValid === true && errors.username) || (registerCredentials.usernameValid === false && !errors.username) || (registerCredentials.usernameValid === false && errors.username)) ? 'is-invalid' : ''}`} id="usernameInput" required onChange={usernameChangeHandler} value={registerCredentials.username} />

                                    <div className="invalid-tooltip">
                                        {(errors.username)? 'El nombre de usuario ya existe' :'El nombre debe ser mayor a 6 caracteres'}
                                    </div>
                                </div>

                                <div className="position-relative mb-2">
                                    <label htmlFor="emailInput" className="form-label">Correo electrónico</label>
                                    <input type="email" className={`form-control ${(registerCredentials.emailValid && !errors.email) ? 'is-valid' : ((registerCredentials.emailValid === true && errors.email) || (registerCredentials.emailValid === false && !errors.email) || (registerCredentials.emailValid === false && errors.email)) ? 'is-invalid' : ''}`} id="emailInput" required onChange={emailChangeHandler} value={registerCredentials.email} placeholder="correo@ejemplo.com" />

                                    <div className="invalid-tooltip">
                                        {(errors.email)? 'El correo  ya existe' :'Escriba un correo válido'}
                                    </div>
                                </div>

                                <div className="position-relative mb-2">
                                    <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                                    <input type="password" className={`form-control ${(registerCredentials.passwordValid) ? 'is-valid' : (registerCredentials.passwordValid === false) ? 'is-invalid' : ''}`} id="passwordInput" required onChange={passwordChangeHandler} value={registerCredentials.password} />

                                    <div className="invalid-tooltip">
                                        Contraseña debe ser mayor a 6 caracteres
                                    </div>
                                </div>

                                <div className="position-relative mb-2">
                                    <label htmlFor="passwordCheckInput" className="form-label">Repetir contraseña</label>
                                    <input type="password" className={`form-control ${(registerCredentials.passwordCheckValid) ? 'is-valid' : (registerCredentials.passwordCheckValid === false) ? 'is-invalid' : ''}`} id="passwordCheckInput" required onChange={passwordCheckChangeHandler} value={registerCredentials.passwordCheck} />

                                    <div className="invalid-tooltip">
                                        Las contraseñas no coinciden
                                    </div>
                                </div>

                                <div className="position-relative mb-2">
                                    <label htmlFor="accessKeyInput" className="form-label">Llave de Acceso</label>
                                    <input type="text" className={`form-control ${(registerCredentials.accessKeyValid) ? 'is-valid' : (registerCredentials.accessKeyValid === false) ? 'is-invalid' : ''}`} id="accessKeyInput" required onChange={accessKeyChangeHandler} value={registerCredentials.accessKey} />

                                    <div className="invalid-tooltip">
                                        LLave de acceso incorrecta
                                    </div>
                                </div>

                                <button className='btn btn-primary w-100' type='submit' disabled={!buttonMode}>Registrarse</button>
                            </div>
                        </form>
                    </div>
                    <div className='bg-white px-4 py-1 rounded-3 d-flex align-items-center mt-2'>
                        <p className='m-0'>¿Ya te has registrado?</p>
                        <button className='btn btn-link px-1' onClick={() => history.push(paths.login)}>Incia sesión</button>
                    </div>
                </div>
            </div>
            <LoadingCycle show={loading} />
        </>
    );
}

export default RegisterPage;
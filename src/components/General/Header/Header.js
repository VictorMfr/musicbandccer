import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../../storage-redux/auth';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const urlLocation = history.location.pathname;


    return (
        // WelcomePage header
        <>
            {urlLocation === "/" && !localStorage.getItem('token') &&
                <nav className="navbar navbar-expand-lg bg-light border-bottom p-3">
                    <div className="container-fluid">
                        <div className='d-flex justify-content-center justify-content-lg-start col-12 col-lg-4 justify-content-sm-center'>
                            <button className="btn navbar-brand p-0" onClick={() => history.push('/')}>Repertorio CCER</button>
                            <button className='btn p-0 m-0' onClick={() => history.push('/info')}>Información</button>
                        </div>
                        <div className='d-flex col justify-content-center justify-content-lg-end'>
                            <button className='btn p-2' onClick={() => history.push('/login')}>Iniciar sesión</button>
                            <button className='btn p-2' onClick={() => history.push('/register')}>Registrarse</button>
                        </div>
                    </div>
                </nav>}
            {urlLocation === "/" && localStorage.getItem('token') &&
                <nav className="navbar navbar-expand-lg bg-light border-bottom p-2">
                    <div className="container-fluid">
                        <button className="btn p-0" onClick={() => history.push('/repertory')}>Ir a repertorio</button>
                        <button className='btn btn-outline-primary' onClick={() => dispatch(authActions.logout())}>Cerrar sesión</button>
                    </div>
                </nav>}
            {urlLocation === "/repertory" && localStorage.getItem('token') &&
                <nav className="navbar navbar-expand-lg bg-light border-bottom p-2">
                    <div className="container-fluid justify-content-between">
                        <button className='btn' onClick={() => history.push('/')}>Inicio</button>
                        <button className='btn btn-outline-primary ' onClick={() => dispatch(authActions.logout())}>Cerrar sesión</button>
                    </div>
                </nav>}
        </>
    );
}

export default Header;
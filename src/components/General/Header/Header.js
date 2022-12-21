import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../../storage-redux/auth';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const urlLocation = history.location.pathname

    console.log()


    return (
        // WelcomePage header
        <>
            {urlLocation === "/" && !localStorage.getItem('token') &&
                <nav class="navbar navbar-expand-lg bg-light border-bottom p-3">
                    <div class="container-fluid">
                        <div className='d-flex'>
                            <button className="btn navbar-brand p-0" onClick={() => history.push('/')}>Repertorio CCER</button>
                            <button className='btn p-0 m-0' onClick={() => history.push('/info')}>Información</button>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item me-3">
                                    <button className='btn p-2' onClick={() => history.push('/login')}>Iniciar sesión</button>
                                </li>
                                <li className="nav-item">
                                    <button className='btn p-2' onClick={() => history.push('/register')}>Registrarse</button>
                                </li>
                            </ul>
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
                    <div className="container-fluid">                
                        <button className="btn p-0" onClick={() => history.push('/')}>Inicio</button>
                        <button className='btn btn-outline-primary' onClick={() => dispatch(authActions.logout())}>Cerrar sesión</button>
                    </div>
                </nav>}
        </>
    );
}

export default Header;
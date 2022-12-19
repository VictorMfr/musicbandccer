import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../../storage-redux/auth';

const Header = () => {
    const history = useHistory();
    const home = useSelector(state => state.routes.frontend.home);
    const repertory = useSelector(state => state.routes.frontend.repertory);
    const dispatch = useDispatch();

    const urlLocation = history.location.pathname

    console.log()


    return (
        // WelcomePage header
        <>
            {urlLocation == "/" && !localStorage.getItem('token') &&
                <nav class="navbar navbar-expand-lg bg-light border-bottom p-3">
                    <div class="container-fluid">
                        <div className='d-flex'>
                            <button class="btn navbar-brand p-0" onClick={() => history.push('/')}>Repertorio CCER</button>
                            <button className='btn p-0 m-0' onClick={() => history.push('/info')}>Información</button>
                        </div>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item me-3">
                                    <button className='btn p-2' onClick={() => history.push('/login')}>Iniciar sesión</button>
                                </li>
                                <li class="nav-item">
                                    <button className='btn p-2' onClick={() => history.push('/register')}>Registrarse</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>}
                {urlLocation == "/" && localStorage.getItem('token') &&
                <nav class="navbar navbar-expand-lg bg-light border-bottom p-2">
                    <div class="container-fluid">                      
                        <button class="btn p-0" onClick={() => history.push('/repertory')}>Ir a repertorio</button>
                        <button className='btn btn-outline-primary' onClick={() => dispatch(authActions.logout())}>Cerrar sesión</button>
                    </div>
                </nav>}
                {urlLocation == "/repertory" && localStorage.getItem('token') &&
                <nav class="navbar navbar-expand-lg bg-light border-bottom p-2">
                    <div class="container-fluid">                
                        <button class="btn p-0" onClick={() => history.push('/')}>Inicio</button>
                        <button className='btn btn-outline-primary' onClick={() => dispatch(authActions.logout())}>Cerrar sesión</button>
                    </div>
                </nav>}
        </>
    );
}

export default Header;
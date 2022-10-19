import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../../storage-redux/auth';

const Header = () => {
    const history = useHistory();
    const home = useSelector(state => state.routes.frontend.home);
    const repertory = useSelector(state => state.routes.frontend.repertory);
    const dispatch = useDispatch();


    return (
        <header className='d-flex py-2 mb-2 border-bottom bg-white'>
            <ul className='nav'>
                <li><a href="/" className='nav-link text-black hoverElement' onClick={() => history.replace(home)}>Inicio</a></li>
                <li><a href="/" className='nav-link text-black hoverElement'>Ir a Chat</a></li>
                <li><a href="/" className='nav-link text-black hoverElement' onClick={() => history.replace(repertory)}>Ir a Repertorio</a></li>
            </ul>
            <div className='ms-auto mx-2'>
                <button className='btn btn-outline-primary' onClick={() => dispatch(authActions.logout())}>Cerrar sesion</button>
            </div>
        </header>
    );
}

export default Header;
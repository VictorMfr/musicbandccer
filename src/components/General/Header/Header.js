import React from 'react';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { repertoryActions } from '../../../storage-redux/repertory';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const home = useSelector(state => state.routes.frontend.home);
    const repertory = useSelector(state => state.routes.frontend.repertory);
    const dispatch = useDispatch();

    const ShowModal = () => {
        dispatch(repertoryActions.changeModal({}));
    }

    return (
        <header className='d-flex py-2 mb-2 border-bottom bg-white'>
            <ul className='nav'>
                <li><a className='nav-link text-black hoverElement' onClick={() => history.replace(home)}>Inicio</a></li>
                <li><a className='nav-link text-black hoverElement' onClick={() => history.replace(repertory)}>Ir a Repertorio</a></li>
                <li><a className='nav-link text-black hoverElement'>Ir a Chat</a></li>
            </ul>
            <div className='ms-auto mx-2'>
                <button className='btn btn-outline-primary'>Cerrar sesion</button>
            </div>
        </header>
    );
}

export default Header;
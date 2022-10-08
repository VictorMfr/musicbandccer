import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './WelcomePage.module.css';


const WelcomePage = () => {
    const history = useHistory();
    const paths = useSelector(state => state.routes.frontend);

    return (
        <div className={classes.background}>
            <div className='bg-white'>
                <div className="container">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ms-4 me-4 border-bottom">
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ">
                        <li><a href='/' className="nav-link px-2 link-dark">Home</a></li>
                            <li><a href="/faqs" className="nav-link px-2 link-dark">FAQs</a></li>
                            <li><a href="/about" className="nav-link px-2 link-dark">About</a></li>
                        </ul>
                        <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-outline-primary me-2" onClick={() => history.replace(paths.login)}>Login</button>
                            <button type="button" className="btn btn-primary" onClick={() => history.replace(paths.register)}>Sign-up</button>
                        </div>
                    </header>
                    <div className="px-4 py-5 my-5 text-center">
                        <img className="d-block mx-auto mb-4" src="./imgs/logo_iglesia.svg" alt="" width="150" height="150" />
                        <h1 className="display-5 fw-bold">Repertorio CCER</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4"> Con los mejores equipos de alabanza y adoracion. Una página web para sacar al máximo las canciones</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={() => history.replace(paths.login)}>Primary button</button>
                                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default WelcomePage;
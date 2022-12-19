import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/General/Header/Header';
import classes from './UserMainPage.module.css';

const UserMainPage = props => {
    const repertory = useSelector(state => state.routes.frontend.repertory);
    const auth = useSelector(state => state.auth.userData)
    const history = useHistory();

    return (
        <>
            <section className='bg-light' style={{height: '100vh'}}>
                <Header />
                <div className='container mt-5'>
                    <h2 className='display-5'>¡Bienvenido {auth.username}!</h2>
                    <div className={`p-4 p-md-5 mb-4 rounded text-bg-dark ${classes.backgroundImage}`}>
                        <div className="col-md-6 px-0">
                            <em className="lead my-3">¨Jehová es mi fortaleza y mi escudo; En él confió mi corazón, y fui ayudado, Por lo que se gozó mi corazón, Y con mi cántico le alabaré.¨. (Salmo 28:7 RVR1960)</em>
                            <p className="lead mb-0"><a href="https://www.biblegateway.com/" className="text-white fw-bold">Abre la Biblia online</a></p>
                        </div>
                    </div>
                    
                    {/* Posts */}
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className={`row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative`} onClick={() => history.replace(repertory)}>
                                <div className="col p-4 d-flex flex-column position-static">
                                    <strong className="d-inline-block mb-2 text-primary">Ir al repertorio</strong>
                                    <h3 className="mb-0">Repertorio</h3>
                                    <div className="mb-1 text-muted">¡Recomienda una canción!</div>
                                    <p className="card-text mb-auto">Consulta, Añade, elimina y actualiza canciones para que todo el grupo lo vea.</p>
                                </div>
                                <div className={`col-auto d-none d-lg-block ${classes.repertoryThumbnail}`}>
                                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}

                <div className="container">
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <div className="col-md-4 d-flex align-items-center">
                            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                <svg className="bi" width="30" height="24"></svg>
                            </a>
                            <span className="mb-3 mb-md-0 text-muted">2022 CCER, Grupo de Alabanza y Adoración</span>
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                            <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                            <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                        </ul>
                    </footer>
                </div>
            </section>

        </>
    );
}

export default UserMainPage;
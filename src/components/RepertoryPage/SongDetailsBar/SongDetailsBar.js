import React from 'react';
import classes from './SongDetailsBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { repertoryActions } from '../../../storage-redux/repertory';
import { CloseButton } from 'react-bootstrap';

const SongDetailsBar = () => {
    const song = useSelector(state => state.repertory.song);
    const dispatch = useDispatch();

    return (
        <>
            {song && <div className={`container my-3 md-border mx-md-3 rounded-3 bg-white ${classes.songDetailsBarSizing}`}>
                {song && <>

                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className='mt-2 display-6 d-inline-block'>Song details</h1>
                        <CloseButton onClick={() => dispatch(repertoryActions.updateSongDetails({ song: null }))}/>
                    </div>
                    <hr />

                    <iframe className='w-100' height="255" src={song.url.replace('watch?v=', 'embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    

                    <div className={`sm-py-5 ${classes.scrollbar}`}>
                        <h2 className="border-bottom mt-3">{song.title}</h2>
                        <div className="row pt-3 d-flex align-items-center ">
                            <div className="col-6 d-flex align-items-center mb-4">
                                <p className='mb-0 me-2'><i className="fa-solid fa-user  mx-1 mb-0 h6"></i></p>
                                <div>
                                    <h6 className="fw-bold mb-0 fs-6">Autor</h6>
                                    <small>{song.author}</small>
                                </div>
                            </div>
                            <div className="col-6 d-flex align-items-center mb-4">
                                <p className='mb-0 me-2'><i className="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                <div>
                                    <h6 className="fw-bold mb-0 fs-6">Tipo</h6>
                                    <small>{song.type}</small>
                                </div>
                            </div>
                            <div className="col-6 d-flex align-items-center mb-4">
                                <p className='mb-0 me-2'><i className="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                <div>
                                    <h6 className="fw-bold mb-0 fs-6">Tono</h6>
                                    <small>{song.tone}</small>
                                </div>
                            </div>
                            
                            
                            <div className='col-12 d-flex align-items-center mb-3'>
                                <button className='btn btn-success me-2' onClick={() => dispatch(repertoryActions.showModalForUpdate({song}))}>Update song</button>
                                <button className='btn btn-danger' onClick={() => dispatch(repertoryActions.showModalForDelete({song}))}>Quitar canci??n</button>
                            </div>
                        </div>

                    </div>

                </>}

            </div>}
        </>

    );
}

// tone, author, url, timesPlayed, isMounted, type

export default SongDetailsBar;
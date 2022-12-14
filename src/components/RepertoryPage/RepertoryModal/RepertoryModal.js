import React, { useEffect, useState } from 'react';
import { repertoryActions } from '../../../storage-redux/repertory';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from '../../../hooks/backendRequest';
import { Modal, Button, CloseButton } from 'react-bootstrap';



const RepertoryModal = props => {
    const dispatch = useDispatch();
    const request = useBackendRequest();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('alabanza');
    const [tone, setTone] = useState('C');
    const [isMounted, setIsMounted] = useState(false);
    const [timesPlayed, setTimesPlayed] = useState(0);
    const [url, setUrl] = useState('');

    const token = localStorage.getItem('token')
    const updateModal = useSelector(state => state.repertory.updateModal);
    const repertory = useSelector(state => state.repertory);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        

        if (updateModal != null) {
            setTitle(updateModal.title);
            setAuthor(updateModal.author);
            setType(updateModal.type);
            setTone(updateModal.tone);
            setIsMounted(updateModal.isMounted);
            setTimesPlayed(updateModal.timesPlayed);
            setUrl(updateModal.url);
        }
    }, [updateModal])

    const titleChangeHandler = event => {
        setTitle(event.target.value);
    }

    const authorChangeHandler = event => {
        setAuthor(event.target.value);
    }
    const typeChangeHandler = event => {
        setType(event.target.value);
    }
    const toneChangeHandler = event => {
        setTone(event.target.value);
    }
    const isMountedChangeHandler = event => {
        if (isMounted) {
            setIsMounted(false);
        } else {
            setIsMounted(true);
        }

    }
    const timesPlayedChangeHandler = event => {
        setTimesPlayed(event.target.value);
    }
    const urlChangeHandler = event => {
        setUrl(event.target.value);
    }

    const closeModalHandler = event => {
        setIsMounted(false)
        dispatch(repertoryActions.hideModal());
    }

    const submitFormHandler = event => {
        event.preventDefault();
        setLoading(true);

        const data = {
            title,
            author,
            type,
            tone,
            isMounted,
            timesPlayed,
            url,
            databaseId: (updateModal && updateModal.databaseId) ? updateModal.databaseId : '',
        }

        if (!updateModal) {
            const response = request.backendRequest({
                url: '/song',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: { ...data, token }
            });

            response.then(response => {
                if (response.song) {
                    dispatch(repertoryActions.addSong({ song: response.song }));
                    dispatch(repertoryActions.hideModal());
                    setTimeout(() => {
                        setLoading(false)
                        setTitle('');
                        setAuthor('');
                        setType('');
                        setTone('');
                        setIsMounted(false);
                        setTimesPlayed(0);
                        setUrl('');
                    }, 1000);
                }
                setLoading(false)
            });

            response.catch(error => {
                console.log('There was an error, printing details', error)
            });
        } else {
            request.backendRequest({
                url: '/song',
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: { data, token }
            }).then(response => {
                dispatch(repertoryActions.updateSong({ song: response.song }));
                dispatch(repertoryActions.hideModal());
                setTimeout(() => {
                    setLoading(false)
                    setTitle('');
                    setAuthor('');
                    setType('');
                    setTone('');
                    setIsMounted(false);
                    setTimesPlayed(0);
                    setUrl('');
                }, 1000);
            });
        }



    }



    return (
        <Modal show={repertory.isModal} onHide={() => dispatch(repertoryActions.hideModal())}>
            <Modal.Header>
                <Modal.Title>{updateModal ? 'Actualizar cancion' : 'A??adir canci??n'}</Modal.Title>
                <CloseButton onClick={closeModalHandler} />
            </Modal.Header>
            <Modal.Body>
                {!loading && <form className='form'>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingInputValue" placeholder="Marcos Witt" onChange={titleChangeHandler} value={title} />
                                <label htmlFor="floatingInputValue">Nombre de la canci??n</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingInputValue" placeholder="Marcos Witt" onChange={authorChangeHandler} value={author} />
                                <label htmlFor="floatingInputValue">Autor</label>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingInputValue" placeholder="Marcos Witt" onChange={urlChangeHandler} value={url} />
                                <label htmlFor="floatingInputValue">Url</label>
                            </div>
                        </div>

                    </div>
                    <div className='row mb-4'>
                        <div className="col">
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" placeholder='Tipo' onChange={typeChangeHandler} value={type}>
                                    <option value="alabanza">Alabanza</option>
                                    <option value="adoracion">Adoraci??n</option>
                                </select>
                                <label htmlFor="floatingSelect">Tipo</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" placeholder='hey' onChange={toneChangeHandler} value={tone}>
                                    <option value='C'>C</option>
                                    <option value='C#'>C#</option>
                                    <option value='D'>D</option>
                                    <option value='D#'>D#</option>
                                    <option value='E'>E</option>
                                    <option value='F'>F</option>
                                    <option value='F#'>F#</option>
                                    <option value='G'>G</option>
                                    <option value='G#'>G#</option>
                                    <option value='A'>A</option>
                                    <option value='A#'>A#</option>
                                    <option value='B'>B</option>
                                </select>
                                <label htmlFor="floatingSelect">Tono</label>
                            </div>
                        </div>
                    </div>

                    
                    
                </form>}

                {loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                {!loading && <>
                    <Button variant="secondary" onClick={closeModalHandler}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={submitFormHandler}>
                        {updateModal ? 'Actualizar cancion' : 'A??adir canci??n'}
                    </Button>
                </>}

            </Modal.Footer>
        </Modal>




    );
}

export default RepertoryModal;
import React, { useState } from "react";
import { Modal, CloseButton, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { repertoryActions } from "../../../storage-redux/repertory";
import useBackendRequest from "../../../hooks/backendRequest";


const Proceed = () => {
    const repertory = useSelector(state => state.repertory);
    const song = useSelector(state => state.repertory.song);

    const dispatch = useDispatch();
    const request = useBackendRequest();

    const [loading, setLoading] = useState(false);

    const closeModalHandler = event => {
        dispatch(repertoryActions.hideModalForDelete());
    }

    const token = localStorage.getItem('token');
    console.log(token)

    const removeSongHandler = () => {
        setLoading(true)

        console.log(song)
        console.log(repertory.isModalForDelete);

        request.backendRequest({
            url: '/song',
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: { token , _id: song.databaseId }
        }).then(response => {
            console.log(response);
            dispatch(repertoryActions.removeSong({ song: response.song }));
            dispatch(repertoryActions.updateSongDetails({ song: null }));
            dispatch(repertoryActions.hideModalForDelete());
            
            setLoading(false);
        })


    }


    return (
        <Modal show={repertory.isModalForDelete}  >
            <Modal.Header>
                <Modal.Title>Borrar Canción</Modal.Title>
                {!loading && <CloseButton onClick={closeModalHandler} />}
            </Modal.Header>
            <Modal.Body>
                {!loading && <h1 className="h6 m-0 text-center">¿Está seguro?</h1>}
                {loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                {!loading &&
                    <>
                        <Button variant="secondary" onClick={closeModalHandler}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={removeSongHandler}>
                            Eliminar canción
                        </Button>
                    </>}

            </Modal.Footer>
        </Modal>
    )
}

export default Proceed; 
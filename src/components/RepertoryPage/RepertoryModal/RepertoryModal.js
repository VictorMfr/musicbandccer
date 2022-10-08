import React, { useEffect, useState } from 'react';
import classes from './RepertoryModal.module.css';
import { repertoryActions } from '../../../storage-redux/repertory';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from '../../../hooks/backendRequest';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';

const RepertoryModal = () => {

    const dispatch = useDispatch();
    const request = useBackendRequest();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('author');
    const [type, setType] = useState('alabanza');
    const [tone, setTone] = useState('C');
    const [isMounted, setIsMounted] = useState('No');
    const [timesPlayed, setTimesPlayed] = useState(0);
    const [url, setUrl] = useState('');

    const token = useSelector(state => state.auth.token);
    const updateModal = useSelector(state => state.repertory.updateModal);

    useEffect(() => {
        if (updateModal) {
            setTitle(updateModal.title);
            setAuthor(updateModal.author);
            setType(updateModal.type);
            setTone(updateModal.tone);
            setIsMounted(updateModal.isMounted);
            setTimesPlayed(updateModal.timesPlayed);
            setUrl(updateModal.url);
        }
    },[])

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
        setIsMounted(event.target.value);
    }
    const timesPlayedChangeHandler = event => {
        setTimesPlayed(event.target.value);
    }
    const urlChangeHandler = event => {
        setUrl(event.target.value);
    }

    const closeModalHandler = event => {
        dispatch(repertoryActions.changeModal({}));
    }

    const submitFormHandler = event => {
        event.preventDefault();

        const data = {
            title,
            author,
            type,
            tone,
            isMounted,
            timesPlayed,
            url,
            databaseId: (updateModal && updateModal.databaseId)? updateModal.databaseId: '',
        }
    
        if (!updateModal) {
            const response = request.backendRequest({
                url: '/song',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: {...data, token}
            });
    
            response.then(response => {
                dispatch(repertoryActions.addSong({song: response.song}));
                dispatch(repertoryActions.changeModal({}));
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
                body: {data, token}
            }).then(response => {
                dispatch(repertoryActions.updateSong({song: response.song}));
                dispatch(repertoryActions.changeModal({}));
            });
        }
        
    }


    return (
        <>
            <div className={classes.backgroundModal} onClick={closeModalHandler} />
            <div className={classes.modal}>
                <form onSubmit={submitFormHandler}>
                    <input  placeholder='title' onChange={titleChangeHandler} value={title}/>
                    <input placeholder='author' onChange={authorChangeHandler} value={author}/>
                    <select onChange={typeChangeHandler} value={type}>
                        <option value='alabanza'>Alabanza</option>
                        <option value='adoracion'>Adoracion</option>
                    </select>
                    <select onChange={toneChangeHandler} value={tone}>
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
                    <label>isMounted?</label>
                    <select onChange={isMountedChangeHandler} value={isMounted}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                    <input type='number' placeholder='timesPlayed' onChange={timesPlayedChangeHandler} value={timesPlayed}/>
                    <input placeholder='url' onChange={urlChangeHandler} value={url}/>
                    <button type='submit'>{updateModal? 'update Song': 'Add song'}</button>
                    <button type='button' onClick={closeModalHandler}>go Back</button>
                </form>
            </div>
        </>
    );
}

export default RepertoryModal;
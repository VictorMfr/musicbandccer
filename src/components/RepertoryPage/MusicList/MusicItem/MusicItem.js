import React from 'react';
import classes from './MusicItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faTrash, faPen, faDisplay } from '@fortawesome/free-solid-svg-icons';
import { repertoryActions } from '../../../../storage-redux/repertory';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from '../../../../hooks/backendRequest';

const MusicItem = props => {
    const request = useBackendRequest();
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const removeSongHandler = () => {
        request.backendRequest({
            url: '/song',
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: { token, _id: props.databaseId }
        }).then(response => {
            dispatch(repertoryActions.removeSong({song: response.song}));
            dispatch(repertoryActions.updateSongDetails({song: null}))
        })
    }

    const updateSongHandler = () => {

        const songForUpdate = {
            title: props.title,
            author: props.author,
            type: props.type,
            tone: props.tone,
            isMounted: props.isMounted,
            timesPlayed: props.timesPlayed,
            url: props.url,
            databaseId: props.databaseId
        }

        dispatch(repertoryActions.changeModal({updateModal: songForUpdate}))
    }

    const selectSong = () => {
        props.setSongSelected({
            title: props.title,
            author: props.author,
            type: props.type,
            tone: props.tone,
            isMounted: props.isMounted,
            timesPlayed: props.timesPlayed,
            url: props.url,
            databaseId: props.databaseId
        });

        dispatch(repertoryActions.updateSongDetails({song: {
            title: props.title,
            author: props.author,
            type: props.type,
            tone: props.tone,
            isMounted: props.isMounted,
            timesPlayed: props.timesPlayed,
            url: props.url,
            databaseId: props.databaseId
        }}));
    }

    return (
        <li className={(props.songSelected.url === props.url)? classes.musicItemSelected : classes.musicItem} onClick={selectSong}>
            <div className={classes.noteIconBackground}>
                <FontAwesomeIcon icon={faMusic} className={classes.noteIcon}/>
            </div>
            <p className={classes.title}>{props.title} | {props.author}</p>
            <div className={classes.controls}>
                <FontAwesomeIcon icon={faPen} className={classes.pen} onClick={updateSongHandler}/>
                <FontAwesomeIcon icon={faTrash} className={classes.trash} onClick={removeSongHandler}/>
            </div>
        </li>
    );
}

export default MusicItem;
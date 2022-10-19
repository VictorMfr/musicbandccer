import React from 'react';
import classes from './MusicItem.module.css';
import { repertoryActions } from '../../../../storage-redux/repertory';
import { useDispatch, useSelector } from 'react-redux';

const MusicItem = props => {
    const song = useSelector(state => state.repertory.song);

    const dispatch = useDispatch();

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

        dispatch(repertoryActions.updateSongDetails({
            song: {
                title: props.title,
                author: props.author,
                type: props.type,
                tone: props.tone,
                isMounted: props.isMounted,
                timesPlayed: props.timesPlayed,
                url: props.url,
                databaseId: props.databaseId
            }
        }));
    }

    return (
        
            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem} ${(song && song.databaseId === props.databaseId) ? 'bg-primary text-white' : ''}`} style={{ height: '3rem' }} onClick={selectSong}>
                <h6 className='m-0 mx-2'>1</h6>
                <div className='d-flex justify-content-between w-100'>
                    <p className='m-0 h6 mx-3'>{props.title}</p>
                    <p className='m-0 h6'>{props.author}</p>
                    <p className='m-0 h6 mx-3'>{props.type}</p>
                </div>
            </div>
        

    );
}

export default MusicItem;
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
        
            <div className={`p-2 d-flex align-items-center overflow-ellipsis  text-nowrap border-bottom rounded-1 ${classes.hoverListItem} ${(song && song.databaseId === props.databaseId) ? 'bg-primary text-white' : ''}`} style={{ height: '3rem' }} onClick={selectSong}>
                <h6 className='m-0'>{props.index + 1}</h6>
                <div className='row m-auto w-100'>
                    <div className='col-4 '>
                        <p className='m-0 text-truncate'>{props.title}</p>
                    </div>
                    <div className='col-4'>
                        <p className='m-0 text-truncate'>{props.author}</p>
                    </div>
                    <div className='col-4'>
                        <p className='m-0 text-truncate'>{props.type === "adoración"? 'Adoración': 'Alabanza'}</p>
                    </div>
                </div>
            </div>
        

    );
}

export default MusicItem;
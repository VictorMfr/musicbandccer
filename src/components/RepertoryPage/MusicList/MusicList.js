import React, { useState } from 'react';
import classes from './MusicList.module.css';
import MusicItem from './MusicItem/MusicItem';
import { useSelector, useDispatch } from 'react-redux';
import { repertoryActions } from '../../../storage-redux/repertory';
import MusicListFilter from './MusicListFilter/MusicListFilter';

const MusicList = props => {
    const songs = useSelector(state => state.repertory.songs);
    const repertory = useSelector(state => state.repertory);
    const dispatch = useDispatch();
    const [songSelected, setSongSelected] = useState({});
    const [typeSelect, setTypeSelect] = useState('any');
    const [toneSelect, setToneSelect] = useState('any');

    const songSelectionHandler = data => {
        console.log(data)
        setSongSelected(data);
    }

    const disSelectionHandler = data => {
        songSelectionHandler({})
        dispatch(repertoryActions.updateSongDetails({ song: null }))
    }

    const typeChangeHandler = data => {
        setTypeSelect(data);
    }

    const toneChangeHandler = data => {
        setToneSelect(data)
    }

    

    return (
        <>
            {!repertory.isLoadingSongs && <div className={`overflow-auto ${classes.scrollbar}`}>
                {/* <MusicListFilter typeSelect={typeChangeHandler} toneSelect={toneChangeHandler} /> */}
                <div>
                    {songs && songs.filter(song => {
                        if (typeSelect !== 'any') {
                            return typeSelect === song.type;
                        }
                        else return song;
                    }).filter(song => {
                        if (toneSelect !== 'any') {
                            return toneSelect === song.tone;
                        }
                        else return song;
                    }).map(song => <MusicItem
                        title={song.title}
                        author={song.author}
                        type={song.type}
                        tone={song.tone}
                        isMounted={song.isMounted}
                        timesPlayed={song.timesPlayed}
                        url={song.url}
                        databaseId={song._id}
                        key={song._id}
                        setSongSelected={songSelectionHandler}
                        songSelected={songSelected}
                    />)}
                </div>
            </div>}

            {repertory.isLoadingSongs &&
                <div className='d-flex justify-content-center'>
                    <div className="spinner-border text-primary my-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
        </>
    );
}

export default MusicList;
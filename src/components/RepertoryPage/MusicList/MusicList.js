import React, { useState } from 'react';
import classes from './MusicList.module.css';
import MusicItem from './MusicItem/MusicItem';
import { useSelector } from 'react-redux';


const MusicList = props => {
    const songs = useSelector(state => state.repertory.songs);
    const repertory = useSelector(state => state.repertory);
    const [songSelected, setSongSelected] = useState({});

    const songSelectionHandler = data => {
        setSongSelected(data);
    }


    return (
        <>
            {!repertory.isLoadingSongs && <div className={`overflow-auto ${classes.scrollbar}`}>
                <div>
                    <div className='bg-secondary rounded-top w-100 p-0 text-white'>
                        <div className='text-align-center w-100'>

                            <div className='row m-auto w-100 p-2'>
                                

                                <div className='col-4'>
                                    <p className='m-0 ms-2'>Titulo</p>
                                </div>
                                <div className='col-4'>
                                    <p className='m-0'>Autor</p>
                                </div>
                                <div className='col-4'>
                                    <p className='m-0'>Tipo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {songs && songs.filter(song => {
                        if (repertory.filterSongType === '') {
                            return song;
                        } else if (repertory.filterSongType === song.type) {
                            return song;
                        }
                        return song;
                    }).filter(song => {
                        if (repertory.filterSongTone === '') {
                            return song;
                        } else if (repertory.filterSongTone === song.tone) {
                            return song;
                        }
                        return song;
                    }).filter(song => {
                        if (repertory.filterSearchedSong === '') {
                            return song;
                        } else if (song.title.toLowerCase().includes(repertory.filterSearchedSong.toLowerCase())) {
                            return song;
                        }
                        return song;
                    }).map((song, index) => <MusicItem
                        index={index}
                        markedText={repertory.filterSearchedSong}
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
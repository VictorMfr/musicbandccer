import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { repertoryActions } from '../../../../storage-redux/repertory';


const MusicListFilter = props => {

    const dispatch = useDispatch();
    
    const typeChangeHandler = (event) => {
        dispatch(repertoryActions.updateFilteredSongType({filterSongType: event.target.value}));
    }

    const toneChangeHandler = (event) => {
        dispatch(repertoryActions.updateFilteredSongTone({filterSongTone: event.target.value}));
        console.log(event.target.value)
    }

    const searchedSongChangeHandler = (event) => {
        dispatch(repertoryActions.updateFilteredSearchedSong({filterSearchedSong: event.target.value}));
    }


    return (
        <div className='bg-white my-3 p-3 pt-2 rounded-3 container-fluid '>
            <div className='row'>
                <div className='col'>
                    <h2 className='display-6'>Filtrar por: </h2>
                </div>
            </div>

            <div className='row'>
                <div className='col-4 p-0'>
                    <select className="form-select form-select-sm mx-1" onChange={typeChangeHandler}>
                        <option value="">Tipo de canción</option>
                        <option value="alabanza">Alabanza</option>
                        <option value="adoracion">Adoración</option>
                    </select>
                </div>

                <div className='col-4'>
                <select className="form-select form-select-sm mx-1" onChange={toneChangeHandler}>
                    <option value="">Tono de la canción</option>
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="D">D</option>
                    <option value="D#">D#</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                    <option value="A">A</option>
                    <option value="A#">A#</option>
                    <option value="B">B</option>
                </select>
                </div>
                <div className='col-4 d-flex align-items-center'>
                    
                    <input className='form-control form-control-sm' placeholder='Nombre de la canción' onChange={searchedSongChangeHandler} />
                </div>
                
            </div>
        </div>
    )
}

export default MusicListFilter;
import React from 'react';
import classes from './MusicListFilter.module.css';

const MusicListFilter = props => {
    return (
        <div className={classes.filter}>
            <div className={classes.textBlock}>
                Filter By: 
            </div>
            <select defaultValue='any' onChange={data => props.typeSelect(data.target.value)}>
                <option value='any'>any</option>
                <option value='alabanza'>Alabanza</option>
                <option value='adoracion'>Adoracion</option>
            </select>
            <select defaultValue='any' onChange={data => props.toneSelect(data.target.value)}>
                <option value='any'>any</option>
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
        </div>
    )
}

export default MusicListFilter;
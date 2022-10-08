import React from 'react';
import classes from './SongDetailsBar.module.css';
import { useSelector } from 'react-redux';

const SongDetailsBar = () => {
    const song = useSelector(state => state.repertory.song);
    console.log(song);

    // return (
    //     <div className={classes.songDetailsBar}>
    //         {song && <>
    //             <h1>{song.title}</h1>
    //             <h4>{song.author}</h4>
    //             <hr/>
    //             <iframe className={classes.video} width="560" height="315" src={`https://www.youtube.com/embed/${song.url.replace('https://www.youtube.com/watch?v=','')}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
    //             <hr/>
    //             <br/>
    //             <h2>Song Details</h2>
    //             <p>tone: {song.tone}</p>
    //             <p>timesPlayed: {song.timesPlayed}</p>
    //             <p>isMounted: {song.isMounted}</p>
    //             <p>type: {song.type}</p>
    //         </>}
    //         {!song && <h1>No details</h1>}
    //     </div>
    // );

    return (
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <svg class="bi pe-none me-2" width="40" height="32"></svg>
                    <span class="fs-4">Previsualización</span>
                </a>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">

                    <iframe width="516" height="315" src="https://www.youtube.com/embed/NCrb-w8qVWw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </ul>
                <hr />
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
    );
}

// tone, author, url, timesPlayed, isMounted, type

export default SongDetailsBar;
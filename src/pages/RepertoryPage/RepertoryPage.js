import React, { useEffect } from 'react';
import MusicList from '../../components/RepertoryPage/MusicList/MusicList';
import SongDetailsBar from '../../components/RepertoryPage/SongDetailsBar/SongDetailsBar';
import Header from '../../components/General/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import RepertoryModal from '../../components/RepertoryPage/RepertoryModal/RepertoryModal';
import { repertoryActions } from '../../storage-redux/repertory';
import useBackendRequest from '../../hooks/backendRequest';
import classes from './RepertoryPage.module.css';

const RepertoryPage = () => {

    const repertory = useSelector(state => state.repertory);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const request = useBackendRequest();

    useEffect(() => {
        request.backendRequest({
            url: '/songs',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: { token }
        }).then(response => {
            dispatch(repertoryActions.updateSongs({ songs: response.songs }));
        }).catch(error => {
            console.log(error);
        });
    }, [dispatch, token])

    return (
        <>
            <section className="d-flex flex-column" style={{ height: '100vh' }}>
                <Header />
                <div className='d-md-flex h-100 bg-light' style={{ minHeight: '89vh' }}>
                    <div className={`container my-3 md-border mx-md-3 rounded-3 bg-white ${classes.songDetailsBarSizing}`}>
                        <h1 className='mt-2 display-6'>Song details</h1>
                        <hr />
                        <iframe className='w-100' height="255" src="https://www.youtube.com/embed/jRMwTolhQ64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                        <br />

                        <div class={`sm-py-5 ${classes.scrollbar}`}>
                            <h2 class="border-bottom mt-3">Glorioso</h2>
                            <div class="row pt-3 d-flex align-items-center ">
                                <div class="col-6 d-flex align-items-center mb-4">
                                    <p className='mb-0 me-2'><i class="fa-solid fa-user  mx-1 mb-0 h6"></i></p>
                                    <div>
                                        <h6 class="fw-bold mb-0 fs-6">Author</h6>
                                        <small>Bj Putnam</small>
                                    </div>
                                </div>
                                <div class="col-6 d-flex align-items-center mb-4">
                                    <p className='mb-0 me-2'><i class="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                    <div>
                                        <h6 class="fw-bold mb-0 fs-6">Type</h6>
                                        <small>Alabanza</small>
                                    </div>
                                </div>
                                <div class="col-6 d-flex align-items-center mb-4">
                                    <p className='mb-0 me-2'><i class="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                    <div>
                                        <h6 class="fw-bold mb-0 fs-6">Tone</h6>
                                        <small>B major</small>
                                    </div>
                                </div>
                                <div class="col-6 d-flex align-items-center mb-4">
                                    <p className='mb-0 me-2'><i class="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                    <div>
                                        <h6 class="fw-bold mb-0 fs-6">Is Mounted?</h6>
                                        <small>Yes</small>
                                    </div>
                                </div>
                                <div class="col-6 d-flex align-items-center mb-4">
                                    <p className='mb-0 me-2'><i class="fa-solid fa-music mx-1 mb-0 h6"></i></p>
                                    <div>
                                        <h6 class="fw-bold mb-0 fs-6">Times played</h6>
                                        <small>7 times</small>
                                    </div>
                                </div>
                                <div className='col-12 d-flex align-items-center mb-3'>
                                    <button className='btn btn-success me-2'>Update song</button>
                                    <button className='btn btn-danger'>Remove song</button>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className='d-flex flex-column container w-100 mb-4 border-box '>
                        <div className='bg-white my-3 p-3 pt-2 rounded-3'>
                            <h2 className='display-6'>Filter by: </h2>
                            <div className='bg-white d-flex'>
                                <select class="form-select form-select-sm mx-1">
                                    <option selected>Type</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <select class="form-select form-select-sm mx-1">
                                    <option selected>Tone</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <input className='form-control ms-5' placeholder='nombre' />
                            </div>
                        </div>

                        <div className={`overflow-auto ${classes.scrollbar}`}>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>
                            <div className={`p-2 d-flex align-items-center border-bottom overflow-hidden rounded-1 ${classes.hoverListItem}`} style={{ height: '3rem' }}>
                                <h6 className='m-0 mx-2'>1</h6>
                                <div className='d-flex justify-content-between w-100'>
                                    <p className='m-0 h6 mx-3'>Glorioso</p>
                                    <p className='m-0 h6'>Bj Putnam</p>
                                    <p className='m-0 h6 mx-3'>Alabanza</p>
                                </div>
                            </div>

                        </div>
                        <div className='mt-3 bg-white d-flex'>
                            <button className='btn btn-outline-primary w-100'>Add song</button>
                        </div>
                    </div>
                </div>
                {/* <footer className='bg-black border-top d-flex py-3 align-items-center'>
                    <ul className='navbar'>
                        <li className='nav-link mx-3'><a href='#' className='nav-link'><i class="fa-brands fa-twitter h4"></i></a></li>
                        <li className='nav-link mx-3'><a href='#' className='nav-link'><i class="fa-brands fa-facebook h4"></i></a></li>
                        <li className='nav-link mx-3'><a href='#' className='nav-link'><i class="fa-brands fa-instagram h4"></i></a></li>
                    </ul>
                </footer> */}
            </section>
        </>
    );
}

export default RepertoryPage;
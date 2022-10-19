import React, { useEffect, useState } from 'react';
import MusicList from '../../components/RepertoryPage/MusicList/MusicList';
import SongDetailsBar from '../../components/RepertoryPage/SongDetailsBar/SongDetailsBar';
import Header from '../../components/General/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import RepertoryModal from '../../components/RepertoryPage/RepertoryModal/RepertoryModal';
import { repertoryActions } from '../../storage-redux/repertory';
import useBackendRequest from '../../hooks/backendRequest';
import classes from './RepertoryPage.module.css';
import MusicListFilter from '../../components/RepertoryPage/MusicList/MusicListFilter/MusicListFilter';


const RepertoryPage = () => {

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
            dispatch(repertoryActions.setLoadedSongs())
        }).catch(error => {
            console.log(error);
        });
    }, [dispatch, request, token]);





    return (
        <>
            <section className="d-flex flex-column" style={{ height: '100vh' }}>
                <Header />
                <div className='d-md-flex h-100 bg-light' style={{ minHeight: '89vh' }}>
                    <SongDetailsBar />
                    <div className='d-flex flex-column container w-100 mb-4 border-box '>
                        <MusicListFilter />
                        <MusicList />
                        <div className='mt-3 bg-white d-flex rounded-3'>
                            <button className='btn btn-outline-primary w-100' onClick={() => dispatch(repertoryActions.showModal())}>Añadir canción</button>
                        </div>
                    </div>
                </div>
            </section>
            <RepertoryModal/>
        </>
    );
}

export default RepertoryPage;
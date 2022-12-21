import React from 'react';
import Header from '../../components/General/Header/Header';


const WelcomePage = () => {

    return (
        <>
            <Header/>
            <div className='container position-absolute top-50 start-50 translate-middle'>
                <img src='/imgs/logo_iglesia.svg' alt='' width="160" className='mx-auto d-block mb-4'></img>
                <h2 className='text-center display-6 mb-4'>Repertorio CCER</h2>
                <p className='text-center w-75 mx-auto'>Sitio para administrar las canciones Alabanza & Adoracion</p>
            </div>
        </>
    );
}

export default WelcomePage;
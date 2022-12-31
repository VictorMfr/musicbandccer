import React from 'react';
import classes from './LoadingCycle.module.css';

const LoadingCycle = props => {
    return (
        <>
            {props.show === true && <div className={`position-absolute h-100 w-100 ${classes.loadingStyle}`}>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <div className="spinner-border text-primary " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default LoadingCycle;
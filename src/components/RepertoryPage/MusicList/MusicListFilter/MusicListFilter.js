import React from 'react';


const MusicListFilter = props => {
    return (
        <div className='bg-white my-3 p-3 pt-2 rounded-3'>
            <h2 className='display-6'>Filter by: </h2>
            <div className='bg-white d-flex'>
                <select className="form-select form-select-sm mx-1" defaultValue={'Type'}>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <select className="form-select form-select-sm mx-1" defaultValue={'Tone'}>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <input className='form-control ms-5' placeholder='nombre' />
            </div>
        </div>
    )
}

export default MusicListFilter;
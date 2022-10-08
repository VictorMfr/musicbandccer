import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {

    const homePath = useSelector(state => state.routes.frontend.home);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const request = useBackendRequest();
    const dispatch = useDispatch();
    const history = useHistory();

    const usernameChangeHandler = event => {
        setUsername(event.target.value);
    }

    const emailChangeHandler = event => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    }

    const submitFormHandler = async event => {
        event.preventDefault();

        const data = {
            username,
            email,
            password
        }

        try {
            const response = await request.backendRequest({
                url: '/user',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            setUsername('');
            setEmail('');
            setPassword('');

            localStorage.setItem('token', response.token);
            dispatch(authActions.login({ userData: response.user, token: response.token }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={submitFormHandler}>
            <label>username: </label>
            <input type='text' onChange={usernameChangeHandler} value={username} /><br />
            <label>email: </label>
            <input type='email' onChange={emailChangeHandler} value={email} /><br />
            <label>password: </label>
            <input type='password' onChange={passwordChangeHandler} value={password} /><br />
            <button type='submit'>enter</button>
            <button type='button' onClick={() => history.replace(homePath)}>go Back</button>
        </form>
    );
}

export default RegisterPage;
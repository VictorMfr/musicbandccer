import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useBackendRequest from '../../hooks/backendRequest';
import { authActions } from '../../storage-redux/auth';

const LoginPage = () => {

    const history = useHistory();
    const homePath = useSelector(state => state.routes.frontend.home);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const request = useBackendRequest();
    const dispatch = useDispatch();

    const emailChangeHandler = data => {
        setEmail(data.target.value);
    }

    const passwordChangeHandler = data => {
        setPassword(data.target.value);
    }


    const loginFormHandler = event => {
        event.preventDefault();

        const data = {
            email,
            password
        }

        const response = request.backendRequest({
            url: '/login',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        response.then(data => {
            localStorage.setItem('token', data.token);
            dispatch(authActions.login({ userData: data.user, token: data.token }));
        });
    }

    return (
        <div class=''>
            <div class="container col-xl-10 col-xxl-8 px-4 py-5 bg-white">
                <div class="row align-items-center g-lg-5 py-5">
                    <div class="col-lg-7 text-center text-lg-start">
                        <h1 class="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
                        <p class="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                    </div>
                    
                    <div class="col-md-10 mx-auto col-lg-5">
                        <form class="p-4 p-md-5 border rounded-3 bg-light" onSubmit={loginFormHandler}>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={emailChangeHandler} value={email}/>
                                    <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={passwordChangeHandler} value={password}/>
                                    <label for="floatingPassword">Password</label>
                            </div>
                            <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>                        
                            </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './WelcomePage.module.css';
import { Button, Container, Navbar, Stack, Nav, Image } from 'react-bootstrap';

const WelcomePage = () => {
    const history = useHistory();
    const paths = useSelector(state => state.routes.frontend);

    return (
        <div className={classes.background}>
            <div className='bg-white'>
                <Container>
                    <Navbar className="border-bottom">
                        <Nav className="me-auto">
                            <Nav.Link >Home</Nav.Link>
                            <Nav.Link >About</Nav.Link>
                        </Nav>
                        <Stack direction="horizontal" gap={2}>
                            <Button variant='outline-primary' onClick={() => history.replace(paths.login)}>Login</Button>
                            <Button>Sign In</Button>
                        </Stack>
                    </Navbar>
                    <Stack className="px-4 py-5 my-5 align-items-center text-center" gap={2}>
                        <Image src='./imgs/logo_iglesia.svg' width="150" height="150" />
                        <h1 className="display-5 fw-bold">Repertorio</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4"> Con los mejores equipos de alabanza y adoracion. Una página web para sacar al máximo las canciones</p>
                            <Stack lg={5} gap={2} direction="horizontal" className='justify-content-center mb-2'>
                                <Button size="sm" variant="primary">Primary</Button>
                                <Button size="sm" variant="outline-secondary">Secondary</Button>
                            </Stack>
                            

                        </div>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}

export default WelcomePage;
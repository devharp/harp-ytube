import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

function Login(props) {

    const labels = ['Login', 'Sign Up'];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState('');
    const [email, setEmail] = useState('');


    
    return (
        <>
            <div className="mt-5 d-flex flex-column align-items-center">
                <h1 className='mb-4'>{labels[props.page]} Here</h1>
                <TextField className='mb-4' onChange={(e) => { setUsername(e.target.value) }} label='username' size='small' />
                <TextField className='mb-4' onChange={(e) => { setPassword(e.target.value) }} label='password' size='small' />
                {props.page === 1 && <>
                    <TextField className='mb-4' onChange={(e) => { setConPassword(e.target.value) }} label='confirm password' size='small' />
                    <TextField className='mb-4' onChange={(e) => { setEmail(e.target.value) }} label='email' size='small' />
                </>}
                {props.page === 0 && <>
                    <Button disabled={!(username.length > 0) || !(password.length > 0)} onClick={() => {props.handleLogin({username, password})}} className='mb-4 me-3 flex-grow-1' variant='contained' size='small' >Login</Button>
                    <Button onClick={props.handleSignUpPage} className='mb-4' variant='outlined' size='small' >Don&apos;t Have an account</Button>
                </>
                }

                {props.page === 1 && <>
                    <Button onClick={() => {props.handleSignUp({username, password, conpassword, email})}} className='mb-4 me-3' variant='contained' size='small' >Sign Up</Button>
                    <Button onClick={props.handleLoginPage} className='mb-4' variant='outlined' size='small' >Have an account</Button>
                </>
                }
            </div>
        </>
    );
}

export default Login;
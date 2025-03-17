import { Navigate } from 'react-router-dom';
import { useLoginMutation } from '../features/api/apiSlice';
import { useState } from 'react';

export default function LoginPage () {
    const [login, loginQuery] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleFormSubmit (e) {
        e.preventDefault();

        login({email, password});
    }

    if (loginQuery.isSuccess) {
        return <Navigate to="/admin" />
    }
        
    return (
        <main>
            <h1>Connexion</h1>
            <form method="POST" action="" onSubmit={handleFormSubmit}>
                { loginQuery.isError && <p className='error'>Identifiants incorrects.</p> }

                <label htmlFor='email'>Votre e-mail : </label>
                <input id="email" name="email" type="email" disabled={loginQuery.isLoading} onChange={(e) => setEmail(e.target.value)} value={email} />

                <label htmlFor='password'>Votre mot de passe : </label>
                <input id="password" name="password" type='password' disabled={loginQuery.isLoading} onChange={(e) => setPassword(e.target.value)} value={password} />

                <button disabled={loginQuery.isLoading}>Login</button>
            </form>
        </main>
    )
}
import React from 'react';
import { useState } from 'react';
import { fetchAccessToken } from '../utils/auth'

const LoginForm = () => {
    const [error, setError] = useState('')
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const user_to_login = {
            email: input.email,
            password: input.password
        }
        if (!user_to_login.email && !user_to_login.password) {
            return setError('ENTER EMAIL AND PASSWORD')
        }
        try {
            const token = await fetchAccessToken(user_to_login)
            localStorage.setItem('token', token);
            window.location.reload();
        }
        catch(err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error ? <p>{error}</p> : <></>}
            <form onSubmit={handleLogin}>
                <input
                    value={input.email}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="email">
                </input>
                <input
                    value={input.password}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="password">
                </input>
                <button>LOG IN</button>
            </form>
        </div>
    )
}

export default LoginForm
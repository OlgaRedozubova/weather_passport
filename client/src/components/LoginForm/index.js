import React from 'react';

const valueOf = (id) => document.getElementById(id).value;

export const LoginForm = ( {login} ) => (
    <div>
        <h2>Login</h2>
        <label>Username</label>
        <input id="username" type="text" />
        <label>Password</label>
        <input id="password" type="password" />
        <button
            value="Submit"
            onClick={() => {
                const username = valueOf('username');
                const password = valueOf('password');
                login(username, password);
            }}
        />
    </div>
)
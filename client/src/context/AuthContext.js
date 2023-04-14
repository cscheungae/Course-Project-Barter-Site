import React, { createContext, useState } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuthenticated, setAuthenticate] = useState(false);

    const login = async (identity, cb, onError) => {
        let res = await AuthService.login(identity);
        if (res === true) {
            setAuthenticate(true);
            cb();
        } else {
            onError({message: res.response.data.message});
            setAuthenticate(false);
            console.log('Cannot login');
        }
    }

    const register = async (identity, cb) => {
        let success = await AuthService.register(identity);
        if (success === true) {
            cb();
        } else {
            console.log('Cannot register');
        }
    }

    const logout = (cb) => {
        setAuthenticate(false);
        cb();
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider;
import React, { createContext, useState } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuthenticated, setAuthenticate] = useState(false);

    const login = async (identity, cb) => {
        let success = await AuthService.login(identity);
        if (success === true) {
            setAuthenticate(true);
            cb();
        } else {
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
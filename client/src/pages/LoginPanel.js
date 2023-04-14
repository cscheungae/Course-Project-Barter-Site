import React, { useContext, useState } from 'react';
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { toast } from 'react-toastify';

import { AuthContext } from "../context/AuthContext";
import { UserContext } from '../context/UserContext';



const LoginPanel = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const errorNotify = (str) => toast.error(str);

    let history = useHistory();
    let location = useLocation();
    let { login } = useContext(AuthContext);
    let { setName: setNameCache, setPhone: setPhoneCache } = useContext(UserContext);

    let { from } = location.state || { from: { pathname: "/" } };
    const signin = () => {
        const identity = { username, password, phone };
        login(identity, () => {
            setNameCache(username);
            setPhoneCache(phone);
            history.replace(from);
        }, (e) => {
            errorNotify(e.message)
        });
    };

    const rediectToRegPage = () => {
        history.replace('/reg');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // return (
    //     <div>
    //         <p>You must log in to view the page at {from.pathname}</p>
    //         <button onClick={signin}>Log in</button>
    //         <p>New to Barter Village? <a onClick={rediectToRegPage}>Register an account</a>.</p>
    //     </div >
    // );

    return (
        <div className="container">
            <h3 className="my-5">Login Page</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone number</label>
                    <input type="text" className="form-control" id="phone" onChange={e => setPhone(e.target.value)} />
                </div>
                <p>New to Barter Village? <a id="register" onClick={rediectToRegPage}>Register an account</a>.</p>
                <button onClick={signin} className="btn btn-primary mx-auto" style={{ disaply: "block" }}>Login</button>
            </form>
        </div>
    );
};

export default LoginPanel;
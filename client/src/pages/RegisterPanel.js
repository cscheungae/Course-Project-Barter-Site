import React, { useContext, useState } from 'react';
import {
    useHistory,
    useLocation
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


const RegisterPanel = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    let history = useHistory();
    let location = useLocation();
    let { register } = useContext(AuthContext);

    let { from } = location.state || { from: { pathname: "/" } };
    const handleRegister = () => {
        const identity = { username, password, phone };
        register(identity, () => {
            history.replace(from);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <div className="container">
            <h3 className="my-5">Register Page</h3>
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
                <button onClick={handleRegister} className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterPanel;
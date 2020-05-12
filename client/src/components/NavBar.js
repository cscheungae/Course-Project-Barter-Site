import React, { useContext } from 'react';
import {
    Link
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    let { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Barter Village</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item mr-3">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="nav-item mr-3">
                        <Link to="/match">Match</Link>
                    </li>
                    <li className="nav-item mr-3">
                        <Link to="/sell">Sell</Link>
                    </li>

                    {
                        isAuthenticated === false ?
                            <li className="nav-item">
                                <Link to="/login">Login</Link>
                            </li>
                            : null
                    }
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
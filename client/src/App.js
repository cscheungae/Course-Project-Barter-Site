import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';

// pages
import Home from './pages/Home';
import RegisterPanel from './pages/RegisterPanel';
import LoginPanel from './pages/LoginPanel';
import MatchPanel from './pages/MatchPanel';
import SellPanel from './pages/SellPanel';

// components
import NavBar from "./components/NavBar";

// context
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import UserContextProvider from './context/UserContext';
import ItemContextProvider from "./context/ItemContext";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App bg">
      <ToastContainer />
      <Router>
        <UserContextProvider>
          <AuthContextProvider>
            <ItemContextProvider>
              <NavBar />

              <Switch>
                {/* // public route */}
                <Route path="/login"><LoginPanel /></Route>
                <Route path="/reg"><RegisterPanel /></Route>
                {/* // private routes */}
                <PrivateRoute path="/" exact>
                  <Home />
                </PrivateRoute>
                <PrivateRoute path="/match">
                  <MatchPanel />
                </PrivateRoute>
                <PrivateRoute path="/sell">
                  <SellPanel />
                </PrivateRoute>
              </Switch>
            </ItemContextProvider>
          </AuthContextProvider>
        </UserContextProvider>
      </Router>
    </div >
  );
}

function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


export default App;

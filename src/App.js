import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from 'reactstrap';

// Components
import Header from "./components/Header";
import AuthedHeader from "./components/AuthedHeader";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import StockDetails from "./pages/Stock-Details";






function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    
    return (
        <Router>
            <div className="App">
                
                {(loggedIn) ? <AuthedHeader logIn={setLoggedIn} /> : <Header />}

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/login">
                        <Login logIn={setLoggedIn}/>
                    </Route>
                    
                    <Route path="/register">
                        <Register />
                    </Route>
                    
                    <Route path="/stock-details"
                           component={StockDetails}>
                    </Route>
                    
    
                    <Route path="/about">
                        <About />
                    </Route>
                    
                </Switch>
                
                <Footer />
                
            </div>
        </Router>
    );
}

export default App;

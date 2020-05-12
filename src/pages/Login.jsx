import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import {isElement} from "react-dom/test-utils";
import Register from "./Register";

export default function Login(props) {
    const [userDetails, setUserDetails] = useState({});
    let authed  = useUser(userDetails);
    
    return (
        <div className="login">
            <p>{
                authed ? "You are logged in! Return to home to browse stocks." : "Log in or Register to view stock data between specific dates."
            }</p>
            <LoginForm onSubmit={setUserDetails} />
            {
                authed ? props.logIn(true) : console.log("UNSUCCESSFUL")
            }
            <RegisterButton />
        </div>
    );
}

function useUser(userDetails) {
    const [authed, setAuthed] = useState(false);
    
    useEffect( () => {
        if (userDetails.email !== null
            & userDetails.password !== null) {
            getLogin(userDetails)
                .then((response) => {
                    if (response.token !== undefined
                        && response.token !== null) {
                        setAuthed(true)
                        console.log("useEffect.getLogin.response.token: ", response.token);
                    }
                    if (response.error) {
                        setAuthed(false);
                        console.log("got error:", response.message);
                    }
                })
        }
        }, [userDetails],
    );
    
    return authed ;
    
}

function getLogin(userDetails) {

    const url = `http://131.181.190.87:3000/user/login`;
    
    return (
        fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: userDetails.email, password: userDetails.password})
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.token !== undefined
                    && res.token !== null) {
                    localStorage.setItem("token", res.token);
                    console.log("got token: ", res.token);
                    return {
                        token: res.token
                    }
                } else {
                    return {
                        error: res.error,
                        message: res.message
                    }
                }
            })
    );
}

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div className="login-form">
            <Form>
                <FormGroup
                    className="email-group">
                    <Label
                        for="loginEmailInput"
                    >Email: </Label>
                    <Input
                        type="text"
                        name="loginEmailInput"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <Label
                        className="password-group"
                        for="loginPasswordInput"
                    >Password: </Label>
                    <Input
                        type="password"
                        name="loginPasswordInput"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        onClick={ (event) => {
                            event.preventDefault();
                            console.log(email);
                            console.log(password);
                            props.onSubmit({email: email, password: password});
                        }}
                    >Log In</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

function RegisterButton() {
    return (
        <div className="register-button">
            <Link to="/register"
            >Register</Link>
        </div>
    )
}

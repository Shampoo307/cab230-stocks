import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';


export default function Login(props) {
    
    return (
        <div className="login">
            <p>Log in or Register to view stock data between specific dates.</p>
    
            <LoginForm />
            <Register />
        </div>
    );
}

function LoginForm() {
    return (
        <div className="login-form">
            
            <Form>
                <FormGroup
                    className="username-group">
                    <Label
                        for="username"
                    >Username: </Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    
                    <Label
                        className="password-group"
                        for="password"
                    >Password: </Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                    >Log In</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

function Register() {
    return (
        <div className="register-button">
            <Link to="/register"
            >Register</Link>
        </div>
    )
}
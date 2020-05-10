import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import {isElement} from "react-dom/test-utils";


export default function Login(props) {
    const [userDetails, setUserDetails] = useState({});
    let authed  = useUser(userDetails);
    
    
    return (
        <div className="login">
            <p>Log in or Register to view stock data between specific dates.</p>
            <LoginForm onSubmit={setUserDetails} />
            {/*<Register />*/}
            {
                authed ? props.logIn(true) : console.log("UNSUCCESSFUL")
            }
            
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
    const [emailLabel, setEmailLabel] = useState('Email Address:');
    const [passwordLabel, setPasswordLabel] = useState('Password: ');
    const [response, setResponse] = useState({});
    const unsuccessfulMessage = 'Invalid Email or Password';
    
    
    return (
        <div className="login-form">
            <Form>
                <FormGroup
                    className="email-group">
                    <Label
                        for="emailAddress"
                    >{emailLabel}</Label>
                    <Input
                        type="text"
                        name="emailAddress"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    
                    <Label
                        className="password-group"
                        for="password"
                    >{passwordLabel}</Label>
                    <Input
                        type="password"
                        name="password"
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



// function LoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailLabel, setEmailLabel] = useState('Email Address:');
//     const [passwordLabel, setPasswordLabel] = useState('Password: ');
//     const [response, setResponse] = useState({});
//     const unsuccessfulMessage = 'Invalid Email or Password';
//
//     function useLogin() {
//
//     }
//
//     return (
//         <div className="login-form">
//
//             <Form>
//                 <FormGroup
//                     className="email-group">
//                     <Label
//                         for="emailAddress"
//                     >{emailLabel}</Label>
//                     <Input
//                         type="text"
//                         name="emailAddress"
//                         placeholder="Email Address"
//                         value={email}
//                         onChange={(event) => {
//                             setEmail(event.target.value);
//                         }}
//                     />
//
//                     <Label
//                         className="password-group"
//                         for="password"
//                     >{passwordLabel}</Label>
//                     <Input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         onChange={(event) => {
//                             setPassword(event.target.value);
//                         }}
//                     />
//                     <Button
//                         type="submit"
//                         onClick={ (event) => {
//                             event.preventDefault();
//                             doLogin(email, password)
//                                 .then((res) => {
//                                     setResponse(res);
//                                     // console.log(res);
//                                 });
//                             if (response.token !== undefined) {
//                                 console.log("//Response.Token: ", response.token);
//                             }
//                             if (response.error) {
//                                 console.log("Error Message: ", response.message);
//                                 setEmailLabel(unsuccessfulMessage);
//                                 setPasswordLabel(unsuccessfulMessage);
//                             }
//                         }}
//
//                             setResponse(useLogin(email, password));
//                             if (response) {
//                                 console.log("//LOGIN SUCCESSFUL, TOKEN: ", response.token);
//                             }
//                             if (!response) {
                                // console.log("{/*LOGIN UNSUCCESSFUL, MESSAGE: "*/}//, response.message);
//                             }
//                             tryLogin(email, password)
//                                 .then((res) => {
//                                     setResponse(res);
//                                 });
//                                 if (typeof token !== "string") {
//                                     setEmailLabel(unsuccessfulMessage);
//                                 } else {
//
//                                 }
//                             console.log("logged In");
//                             returnAuthedSite();
//                             console.log("TOKEN: ", localStorage.getItem("token"));
//
//                     >Log In</Button>
//                 </FormGroup>
//             </Form>
//         </div>
//     );
// }
//
// function useLogin(emailInput, passwordInput) {
//     const [response, setResponse] = useState({});
//
//     useEffect( () => {
//         getLogin(emailInput, passwordInput)
//             .then( (res) => {
//                 setResponse(res);
//             });
//     }, [emailInput, passwordInput],
//     );
//
//     if (response.token) {
//         localStorage.setItem("token", response.token);
//         return true;
//     }
//
//     return false;
//
// }
//
// function getLogin(emailInput, passwordInput) {
//     const url = `http://131.181.190.87:3000/user/login`;
//
//     return (
//         fetch(url, {
//             method: "POST",
//             headers: { accept: "application/json", "Content-Type": "application/json" },
//             body: JSON.stringify({ email: emailInput, password: passwordInput })
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 if (res.token !== null) {
//                     return {
//                         token: res.token,
//                         token_type: res.token_type,
//                         expires: res.expires
//                     }
//                 } else {
//                     return {
//                         error: res.error,
//                         message: res.message
//                     }
//                 }
//             })
//     );
// }

// function doLogin(emailInput, passwordInput) {
//     const url = `http://131.181.190.87:3000/user/login`;
//
//     return (
//         fetch(url, {
//             method: "POST",
//             headers: { accept: "application/json", "Content-Type": "application/json" },
//             body: JSON.stringify({ email: emailInput, password: passwordInput })
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 // console.log(res);
//                 if (res.token !== undefined) {
//                     localStorage.setItem("token", res.token);
//                     return {
//                         token: res.token,
//                         token_type: res.token_type,
//                         expires: res.expires
//                     }
//                 } else {
//                     return {
//                         error: res.error,
//                         message: res.message
//                     }
//                 }
//             })
//     );
//
//
// }
//
// function unsuccessfulLogin() {
//
// }
//
// function returnAuthedSite() {
//     console.log("Logged In!");
// }
//
// function Register() {
//     return (
//         <div className="register-button">
//             <Link to="/register"
//             >Register</Link>
//         </div>
//     )
// }
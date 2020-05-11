import React, {useEffect, useState} from "react";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default function Register() {
	const [userDetails, setUserDetails] = useState({});
	let registered = useUser(userDetails)
	
	return (
		<div className="login">
			<p>{
				registered ? "Registered successfully! Please Log In to view stock specifics." : "Log in or Register to view stock data between specific dates."
			}</p>
			
			<RegisterForm onSubmit={setUserDetails}/>
			{/*<Register />*/}
		</div>
	);
}

function RegisterForm(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className="login-form">
			
			<Form>
				<FormGroup
					className="username-group">
					<Label
						for="registerEmailInput"
					>Username: </Label>
					<Input
						type="text"
						name="registerEmailInput"
						placeholder="Username"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					
					<Label
						className="password-group"
						for="registerPasswordInput"
					>Password: </Label>
					<Input
						type="password"
						name="registerPasswordInput"
						placeholder="Password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
					{/*<Label*/}
					{/*	className="password-group"*/}
					{/*	for="confirm-password"*/}
					{/*>Confirm Password: </Label>*/}
					{/*<Input*/}
					{/*	type="password"*/}
					{/*	name="confirm-password"*/}
					{/*	placeholder="Password"*/}
					{/*/>*/}
					<Button
						type="submit"
						onClick={ (event) => {
							event.preventDefault();
							console.log(email);
							console.log(password);
							props.onSubmit({email: email, password: password});
						}}
					>Register Account</Button>
				</FormGroup>
			</Form>
		</div>
	);
}

function useUser(userDetails) {
	const [registered, setRegistered] = useState(false);
	
	useEffect( () => {
			if (userDetails.email !== null
				& userDetails.password !== null) {
				
				getRegistration(userDetails)
					.then((response) => {
						if (response.success) {
							setRegistered(true)
							console.log("Registered: ", response.message);
						}
						if (response.error) {
							setRegistered(false);
							console.log("got error:", response.message);
						}
					})
				
			}
		}, [userDetails],
	);
	
	return registered ;
	
}

function getRegistration(userDetails) {
	
	const url = `http://131.181.190.87:3000/user/register`;
	
	return (
		fetch(url, {
			method: "POST",
			headers: { accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({ email: userDetails.email, password: userDetails.password})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					console.log("got success: ", res.success);
					return {
						success: res.success,
						message: res.message
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

//
// function Register() {
// 	return (
// 		<div className="register">
// 			<Button
// 				type="submit"
// 			>Register</Button>
// 		</div>
// 	)
// }
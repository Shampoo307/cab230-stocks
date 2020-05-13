import React, {useEffect, useState} from "react";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default function Register() {
	const [userDetails, setUserDetails] = useState({});
	const [message, setMessage] = useState('');
	let registered = useUser(setMessage, userDetails);
	const successMessage = "Registered successfully! Please Log In to view stock specifics.";
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className="login">
			<p>{
				registered
					? successMessage
					: (userDetails.email !== undefined ? message : 'Log in or Register to view stock data between specific dates.')
			}</p>
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
						<Button
							type="submit"
							onClick={ (event) => {
								event.preventDefault();
								console.log(email);
								console.log(password);
								setUserDetails({email: email, password: password});
							}}
						>Register Account</Button>
					</FormGroup>
				</Form>
			</div>
		</div>
	);
}

function useUser(setMessage, userDetails) {
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
						setMessage(response.message);
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
import React from "react";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';


export default function Register() {
	return (
		<div className="login">
			<p>Log in or Register to view stock data between specific dates.</p>
			
			<RegisterForm />
			{/*<Register />*/}
		</div>
	);
}

function RegisterForm() {
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
					<Label
						className="password-group"
						for="confirm-password"
					>Confirm Password: </Label>
					<Input
						type="password"
						name="confirm-password"
						placeholder="Password"
					/>
					<Button
						type="submit"
					>Register Account</Button>
				</FormGroup>
			</Form>
		</div>
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
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UseField from "./UseField";
import logo from "../media/logo-black.png";
import { useState } from "react";
import FormCheck from "../utils/FormCheck";
import checkInputs from "../utils/InputChecks";
import { signupService } from "../services/Services";
import useLocation from "../utils/locationTool";


const UserSettings = () => {

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
		  username: username.value,
		  email: email.value,
		  fullname: fullname.value,
		  password: password.value,
		  gender: gender,
		  sexualPrefrence: sexualPreference,
		  bio: bio
		  // a lot more key:values coming
		};
	};

	return (
		<Container className="settings-container">
			<Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-logo">
              <img className="form-logo-img" alt="" src={logo} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} />
              <Form.Text className="text-muted">
                Change your existing email address.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} />
              <Form.Text className="text-muted">
                Change current username. Username should contain letters and numbers only with minimum
                length of 3
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control {...fullname} />
			  <Form.Text>
				Change your first or/and last name.
			  </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} />
              <Form.Text className="text-muted">
                Change your password. Password should contain at least 1 uppercase, 1 lowercase
                letter, 1 number and 1 special character. Minimum length 8.
              </Form.Text>
            </Form.Group>

			<Form.Group className="mb-3">
			<Form.Label>Gender</Form.Label>
				<Form.Select {...gender}>
					<option muted>...</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Transgender">Transgender</option>
				</Form.Select>
				<Form.Text>Change your gender.</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3">
			<Form.Label>Sexual preference</Form.Label>
				<Form.Select {...sexualPreference}>
					<option muted>...</option>
					<option value="1">straight</option>
					<option value="2">gay</option>
					<option value="3">bi</option>
            	</Form.Select>
				<Form.Text>Change your sexual prefrences.</Form.Text>
        	</Form.Group>

			<Form.Group className="mb-3">
            	<Form.Label>Bio</Form.Label>
            	<Form.Control as="textarea" {...bio} maxLength={300}></Form.Control>
            	<Form.Text>Change your biography. Max length 300 characters</Form.Text>
        	</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Tags</Form.Label>
				<InputTags
					maxLength={50}
					values={tags}
					onTags={(value) => setTags(value.values)}
				/>
				<Form.Text>Add or remove tags. Max length 50 characters</Form.Text>
			</Form.Group>

			</Form>
		</Container>
	);
};

export default UserSettings;

import { Form, Button, Container } from "react-bootstrap";
import UseField from "./UseField";
import { useParams } from "react-router-dom";
import { resetPassWordService } from "../services/Services";

const ResetPassword = () => {
	const password = UseField("text");
	const param = useParams().code;
	const code = { code: param.substring(param.indexOf("=") + 1, param.length) };

	const handleSubmit = (e) => {
		e.preventDefault();
	
		const info = {
		  code: code,
		  password: password.value,
		};
		resetPassWordService(info);
		e.target.value = "";
		password.onChange(e);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>New password</Form.Label>
					<Form.Control {...password} type="password"/>
					<Form.Text>insert password criteria here</Form.Text>
				</Form.Group>
				<Button type="submit">Submit</Button>
			</Form>
			<hr />
		</Container>
	)
}

export default ResetPassword;
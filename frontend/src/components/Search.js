import { Form, Button, Container } from "react-bootstrap";
/* import { InputTags } from "react-bootstrap-tagsinput"; */
import UseField from "./UseField";
import { useState } from "react";
import { searchService } from "../services/Services";

const Search = () => {
	const username = UseField("text");
	const ageMin = UseField("text");
	const ageMax = UseField("text");
	const gender = UseField("text");
	const sexualPreference = UseField("text");
	/* const [tags, setTags] = useState([]); */
	const fameMin = UseField("text");
	const fameMax = UseField("text");
	const city = UseField("text");
	const country = UseField("text");

	const handleSubmit = (e) => {
		e.preventDefault();
		const searchCriterias = {
			username : username.value,
			ageMin : ageMin.value,
			ageMax : ageMax.value,
			gender : gender.value,
			sexuality : sexualPreference.value,
			/* tags : tags, */
			fameMin : fameMin.value,
			fameMax : fameMax.value,
			city : city.value,
			country : country.value,
		}
		searchService(searchCriterias);
		e.target.value = "";
		username.onChange(e);
		ageMin.onChange(e);
		ageMax.onChange(e);
		gender.onChange(e);
		sexualPreference.onChange(e);
		fameMin.onChange(e);
		fameMax.onChange(e);
		city.onChange(e);
		country.onChange(e);
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Search for User</Form.Label>
						<Form.Control {...username}/>
						<Form.Text>Insert username to find person.</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Gender</Form.Label>
					<Form.Select {...gender}>
					<option value="">...</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="transgender">Transgender</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Sexual preference</Form.Label>
					<Form.Select {...sexualPreference}>
					<option value="">...</option>
					<option value="straight">straight</option>
					<option value="gay">gay</option>
					<option value="bi">bi</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Age gap</Form.Label>
						<Form.Control {...ageMin}/>to<Form.Control {...ageMax}/>
						<Form.Text>Insert ages to find people with ages between criterias.</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Location</Form.Label>
						<br />
						City<Form.Control {...city}/>
						Country<Form.Control {...country}/>
						<Form.Text>Insert City and Country</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Fame rating gap</Form.Label>
						<Form.Control {...fameMin}/>to<Form.Control {...fameMax}/>
						<Form.Text>Insert fame rating to find people with rating between criterias.</Form.Text>
				</Form.Group>
				
				<Button type="submit" className="mb-5">Submit</Button>
			</Form>
		</Container>
	)
}

export default Search;
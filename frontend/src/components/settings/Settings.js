import UseField from '../UseField';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useStoreUser } from '../../utils/getStoreStates';
import LoadingScreen from '../LoadingScreen';
import {
	settingsService,
	verifyOldPassword,
	getCredentials,
	changeEmailService,
} from '../../services/userServices';
import {
	checkUserName,
	checkPassword,
	checkFullName,
	checkEmail,
} from '../../utils/InputChecks';
import { logUser, logoutUser } from '../../reducers/loginReducer';
import { useDispatch } from 'react-redux';
import useLocation from '../../utils/locationTool';
import getCapital from '../../utils/getCapital';
import allCountries from '../../utils/allCountries';

const Settings = ({ setLoggedUser }) => {
	const { user } = useStoreUser();
	const username = UseField('text', '');
	const fullname = UseField('text', '');
	const country = UseField('text', '');
	const email = UseField('email', '');
	const oldPassword = UseField('password', '');
	const newPassword = UseField('password', '');
	const [passType, setPassType] = useState('password');
	const [verifyOldPw, setVerifyOldPw] = useState(0);
	const [userVerify, setUsernameVerify] = useState(1);
	const [emailVerify, setEmailVerify] = useState(1);
	const [relocate, setRelocate] = useState(0);
	let changeEmail = 0;
	const dispatch = useDispatch();
	const countries = allCountries();
	let relocatedPosition = useLocation();
	/* let relocatedPosition = ""; */
	
	useEffect(() => {
		getCredentials({ type: 'username' }).then((res) => {
			let obj = res.find((o) => o.username === username.value);
			setUsernameVerify(1);
			if (obj) {
				if (obj.username === username.value) {
					setUsernameVerify(0);
				}
			}
		});
		getCredentials({ type: 'email' }).then((res) => {
			let obj = res.find((o) => o.email === email.value);
			setEmailVerify(1);
			if (obj) {
				if (obj.email === email.value) {
					setEmailVerify(0);
				}
			}
		});
	}, [username.value, email.value]);

	useEffect(() => {
		if (user)
			verifyOldPassword(oldPassword.value, user.user_id).then((res) => {
				setVerifyOldPw(1);
				if (res) {
					if (res === 'incorrect') {
						setVerifyOldPw(0);
					}
				}
			});
	}, [oldPassword.value, user]);

	const useHandleRelocation = (e) => {
		e.preventDefault();
		setRelocate(1);
		e.target.value = '';
		country.onChange(e);
	};

	const setCountry = async (country, settingsInfo, e, credentialsObj) => {
		const location = await getCapital(country.value);
		if (location === false) {
			console.log('this is not a country');
			return false;
		}
		settingsInfo.location = location;
		settingsInfo.coords = [0.0, 0.0];
		settingsService(settingsInfo);
		e.target.value = '';
		username.onChange(e);
		fullname.onChange(e);
		email.onChange(e);
		oldPassword.onChange(e);
		newPassword.onChange(e);
		country.onChange(e);

		dispatch(logoutUser())
			.then((resp) => {})
			.then(() => {
				setTimeout(() => {
					dispatch(logUser(credentialsObj)).then((resp) => {
						setLoggedUser(resp);
					});
				}, '1000');
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const settingsInfo = {
			username: username.value,
			fullname: fullname.value,
			oldEmail: user.email,
			email: email.value,
			newPW: newPassword.value,
			user_id: user.user_id,
			location: relocatedPosition.location,
			coords: relocatedPosition.coords,
		};

		let credentialsObj = {
			username: username.value,
			password: newPassword.value,
		};

		if (newPassword.value.length === 0) {
			credentialsObj = {
				username: username.value,
				password: oldPassword.value,
			};
		}

		if (username.value.length === 0) {
			settingsInfo.username = user.username;
			credentialsObj.username = user.username;
		}

		if (relocate === 0) {
			settingsInfo.location = user.city + ', ' + user.country;
			settingsInfo.coords = user.coordinates;
		}
		if (fullname.value.length === 0) settingsInfo.fullname = user.fullname;
		if (email.value.length === 0) {
			settingsInfo.email = user.email;
		} else {
			changeEmail = 1;
		}

		if (changeEmail === 1) changeEmailService(settingsInfo);

		if (country.value.length > 0) {
			setCountry(country, settingsInfo, e, credentialsObj);
		} else {
			settingsService(settingsInfo);
			e.target.value = '';
			username.onChange(e);
			fullname.onChange(e);
			email.onChange(e);
			oldPassword.onChange(e);
			newPassword.onChange(e);
			country.onChange(e);
			setRelocate(0);

			dispatch(logoutUser())
				.then((resp) => {})
				.then(() => {
					setTimeout(() => {
						dispatch(logUser(credentialsObj)).then((resp) => {
							setLoggedUser(resp);
						});
					}, '1000');
				});
		}
	};

	if (!user) {
		return <LoadingScreen />;
	} else {
		return (
			<Container className="mt-5 mb-3 w-50 ">
				<h1>Settings</h1>
				<hr />
				<Form onSubmit={handleSubmit} className="mb-3">
					<Form.Group className="mb-3">
						<Form.Label>Change username</Form.Label>
						<Form.Control {...username} placeholder={user.username} />
						{userVerify === 0 ? (
							<Alert variant="danger" className="error-alert mt-4">
								This <strong>username</strong> is already in use! Please choose
								an other one.
							</Alert>
						) : (
							<></>
						)}
						<Form.Text className="text-muted">
							Username should contain letters and numbers only with minimum
							length of 3
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Change email</Form.Label>
						<Form.Control {...email} placeholder={user.email} />
						{emailVerify === 0 ? (
							<Alert variant="danger" className="error-alert mt-4">
								This <strong>email</strong> is already in use! Please choose an
								other one.
							</Alert>
						) : (
							<></>
						)}
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Change full name</Form.Label>
						<Form.Control {...fullname} placeholder={user.fullname} />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Relocate location</Form.Label>
						<br />
						<Button className="mb-1" onClick={useHandleRelocation}>
							Relocate
						</Button>
						<br />
						<Form.Text>
							Click to relocate your position (access to location devices has to
							be enabled)
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Change country</Form.Label>
						<Form.Select {...country}>
							<option value="">...</option>
							{countries.map((country) => (
								<option key={country} value={country}>
									{country}
								</option>
							))}
						</Form.Select>
						<Form.Text>
							If you choose to use this option you will be placed to the capital
							city of the chosen country!
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Change password</Form.Label>
						<Form.Control
							{...newPassword}
							type={passType}
							placeholder="new password"
						/>
						<Form.Text className="text-muted">
							Password should contain at least 1 uppercase, 1 lowercase letter,
							1 number and 1 special character. Minimum length 8.
						</Form.Text>
						<Form.Check
							type="checkbox"
							label="show password"
							onClick={() =>
								passType === 'password'
									? setPassType('text')
									: setPassType('password')
							}
						/>
					</Form.Group>
					<Form.Group className="mb-3 mt-5">
						<Form.Label>
							Insert your current password to confirm changes.
						</Form.Label>
						<Form.Control {...oldPassword} />
						{verifyOldPw === 1 || oldPassword.value.length === 0 ? (
							<></>
						) : (
							<Alert variant="danger" className="username-alert mt-4">
								<strong>Password</strong> incorrect!
							</Alert>
						)}
					</Form.Group>
					<Button
						disabled={
							(checkUserName(username.value) ||
								checkFullName(fullname.value) ||
								checkEmail(email.value) ||
								country.value.length ||
								relocate === 1 ||
								checkPassword(newPassword.value)) &&
							verifyOldPw === 1
								? false
								: true
						}
						className="form-button"
						variant="primary"
						type="submit"
					>
						Save
					</Button>
				</Form>
				<Button variant="danger">Delete Account</Button>
				<p className="text-muted">
					This action is irreversible, all your data will be removed
				</p>
			</Container>
		);
	}
};

export default Settings;

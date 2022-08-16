import UseField from "../UseField";
import { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useStoreUser } from "../../utils/getStoreStates";
import LoadingScreen from "../LoadingScreen";
import { settingsService, verifyOldPassword, getCredentials } from "../../services/userServices"
import { checkUserName, checkPassword, checkFullName, checkEmail, } from "../../utils/InputChecks"

const Settings = () => {
  const { user } = useStoreUser();
  const username = UseField("text");
  const fullname = UseField("text");
  const email = UseField("email");
  const oldPassword = UseField("password");
  const newPassword = UseField("password");
  const [passType, setPassType] = useState("password");
  const [verifyOldPw, setVerifyOldPw] = useState(0);
  const [userVerify, setUsernameVerify] = useState(1);
  const [emailVerify, setEmailVerify] = useState(1);

  useEffect(() => {
    getCredentials({ type: "username" }).then((res) => {
      let obj = res.find((o) => o.username === username.value);
      setUsernameVerify(1);
      if (obj) {
        if (obj.username === username.value) {
          setUsernameVerify(0);
        }
      }
    });
  }, [username.value]);

  useEffect(() => {
    getCredentials({ type: "email" }).then((res) => {
      let obj = res.find((o) => o.email === email.value);
      setEmailVerify(1);
      if (obj) {
        if (obj.email === email.value) {
          setEmailVerify(0);
        }
      }
    });
  }, [email.value]);

  useEffect(() => {
	  if(user)
    	verifyOldPassword(oldPassword.value, user.user_id).then((res) => {
      setVerifyOldPw(1);
      if (res) {
        if (res === "incorrect") {
          setVerifyOldPw(0);
        }
      }
    });
  }, [oldPassword.value, user]);

  const handleSubmit = (e) => {
	e.preventDefault();
	if(username.value.length === 0)
		username.value = user.username;
	if(fullname.value.length === 0)
		fullname.value = user.fullname;
	if(email.value.length === 0)
		email.value = user.email;
	const settingsInfo = {
		username : username.value,
		fullname : fullname.value,
		email : email.value,
		newPW : newPassword.value,
		id : user.user_id,
	}
	settingsService(settingsInfo);
	e.target.value = "";
    username.onChange(e);
	fullname.onChange(e);
	email.onChange(e);
	oldPassword.onChange(e);
	newPassword.onChange(e);
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
			{userVerify === 0 ? 
			  	<Alert variant="danger" className="error-alert mt-4">
					This <strong>username</strong> is already in use! Please choose an other one.
				</Alert> : <></>
			}
            <Form.Text className="text-muted">
              Username should contain letters and numbers only with minimum
              length of 3
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change email</Form.Label>
            <Form.Control {...email} placeholder={user.email} />
			{emailVerify === 0 ?
                <Alert variant="danger" className="error-alert mt-4">
                  This <strong>email</strong> is already in use! Please choose
                  an other one.
                </Alert> : <></>
              }
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change fullname</Form.Label>
            <Form.Control {...fullname} placeholder={user.fullname} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change password</Form.Label>
            <Form.Control {...oldPassword} placeholder="old password" />
			{verifyOldPw === 1 || oldPassword.value.length === 0 ?
                <></>
               : 
               ( <Alert variant="danger" className="username-alert mt-4">
                  <strong>Password</strong> incorrect!
                </Alert> )
            }
          </Form.Group>
          <Form.Group className="mb-3">
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
                passType === "password"
                  ? setPassType("text")
                  : setPassType("password")
              }
            />
          </Form.Group>
          <Button disabled={
            	checkUserName(username.value) ||
				checkFullName(fullname.value) ||
				checkEmail(email.value) ||
				(checkPassword(newPassword.value) && verifyOldPw === 1)
				? false
                : true
              } className="form-button" variant="primary" type="submit">
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

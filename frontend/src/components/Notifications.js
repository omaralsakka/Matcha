import { Engagespot } from '@engagespot/react-component';
import { useStoreUser } from "../utils/getStoreStates";

const ENGAGESPOT_API = process.env.REACT_APP_ENGAGESPOT_API;

const Notifications = () => {
	const { user } = useStoreUser();
	/* const theme = { // this is to used to customize the css of the notification component, pass this as a prop theme={theme} 
		colors: { // more info can be found https://documentation.engagespot.co/docs/javascript-guide/using-react-component
			brandingPrimary: "#FF0042",
			colorPrimary: "#FF0042"
		}
	} */
	if(user){
		return (
			<div>
				<Engagespot apiKey={ENGAGESPOT_API} userId={user.email}/>
			</div>
		)
	} else {
		return (<></>)
	}
}

export default Notifications;
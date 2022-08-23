export const tagsFilter = (user, users) => {
	const filteredUsersArr = users.filter((elem) => {
			return (
				elem.tags.some(o => user.tags.includes(o)) // some can be changed to every if we want al tags to match
			)
	});
	return filteredUsersArr;
}

export const filterBlockedBy = (user, users) => {
	const filteredUsersArr = users.filter((elem) => {
		if(elem.blocked !== null) {
			return (
				!elem.blocked.includes(user.user_id)
			)
		}
		return elem
	});
	return filteredUsersArr;
}

export const filterBlocked = (user, users) => {
	const filteredUsersArr = users.filter((elem) => {
		if(elem.blocked_by !== null) {
			return (
				!elem.blocked_by.includes(user.user_id)
			)
		}
		return elem
	});
	return filteredUsersArr;
}

export const filterLoggedin = (user, users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.user_id !== user.user_id
		);
	});
	return filteredUsersArr;
}

export const fameGap = (minFame, maxFame, users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.fame_rating <= maxFame && elem.fame_rating >= minFame
		);
	});
	return filteredUsersArr;
}

export const ageGap = (minAge, maxAge, users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.age <= maxAge && elem.age >= minAge
		);
	});
	return filteredUsersArr;
}

export const straightMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "female" &&
			elem.sexuality === "straight"
		);
	});
	return filteredUsersArr;
}

export const gayMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "male" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")
		);
	});
	return filteredUsersArr;
}

export const biMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			(elem.gender === "female" &&
			(elem.sexuality === "straight" ||
			elem.sexuality === "bi")) ||
			(elem.gender === "male" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi"))
		);
	});
	return filteredUsersArr;
}

export const straightFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "male" &&
			elem.sexuality === "straight"
		);
	});
	return filteredUsersArr;
}

export const gayFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "female" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")
		);
	});
	return filteredUsersArr;
}

export const biFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			(elem.gender === "female" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")) ||
			(elem.gender === "male" &&
			(elem.sexuality === "straight" ||
			elem.sexuality === "bi"))
		);
	});
	return filteredUsersArr;
}

export const filterCountry = (country, users) => {
	const filteredUsersArr = users.filter((elem) => {
		return elem.country === country;
	});
	return filteredUsersArr;
}

export const getPrefrence = (gender, sexuality) => {
	switch(true) {
		case gender === "male" && sexuality === "straight":
			return 1;
		case gender === "male" && sexuality === "gay":
			return 2;
		case gender === "male" && sexuality === "bi":
			return 3;
		case gender === "female" && sexuality === "straight":
			return 4;
		case gender === "female" && sexuality === "gay":
			return 5;
		case gender === "female" && sexuality === "bi":
			return 6;
		default:
			return 0;
	}
}

export const choosePrefrence = (prefrence, users) => {

	switch(prefrence) {
		case prefrence === 1 :
			return straightMale(users);
		case prefrence === 2 :
			return gayMale(users);
		case prefrence === 3 :
			return biMale(users);
		case prefrence === 4 :
			return straightFemale(users);
		case prefrence === 5 :
			return gayFemale(users);
		case prefrence === 6 :
			return biFemale(users);
		default:
			return 0;
	}
}
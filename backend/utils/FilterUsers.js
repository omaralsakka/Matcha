const genderSexualityFilter = (filteredUsers, user) => {
  switch (user.sexuality) {
    case "straight":
      switch (user.gender) {
        case "male":
          filteredUsers = filteredUsers.filter(
            (singleUser) =>
              singleUser.gender !== "male" && singleUser.sexuality !== "gay"
          );
          break;
        case "female":
          filteredUsers = filteredUsers.filter(
            (singleUser) =>
              singleUser.gender !== "female" && singleUser.sexuality !== "gay"
          );
          break;
      }
      break;
    case "gay":
      switch (user.gender) {
        case "male":
          filteredUsers = filteredUsers.filter(
            (singleUser) =>
              singleUser.gender !== "female" &&
              singleUser.sexuality !== "straight"
          );
          break;
        case "female":
          filteredUsers = filteredUsers.filter(
            (singleUser) =>
              singleUser.gender !== "male" &&
              singleUser.sexuality !== "straight"
          );
          break;
      }
      break;
    default:
  }

  return filteredUsers;
};

const blockedUserFilter = (filteredUsers, user) => {
  filteredUsers = filteredUsers.filter((singleUser) => {
    if (singleUser.blocked_by) {
      return !singleUser.blocked_by.includes(user.user_id);
    } else {
      return singleUser;
    }
  });

  return filteredUsers;
};

const filterUsers = (users, user) => {
  let filteredUsers;

  filteredUsers = users.filter(
    (singleUser) => singleUser.user_id !== user.user_id
  );
  if (filteredUsers.length) {
    filteredUsers = genderSexualityFilter(filteredUsers, user);

    if (filteredUsers.length) {
      filteredUsers = blockedUserFilter(filteredUsers, user);
    }
  }

  return filteredUsers;
};

module.exports = filterUsers;

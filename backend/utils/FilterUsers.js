const filterUsers = (users, user) => {
  let filteredUsers;
  //   console.log("this is user: ", user);

  filteredUsers = users.filter(
    (singleUser) => singleUser.user_id !== user.user_id
  );
  if (filteredUsers.length) {
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
    }
  }

  return filteredUsers;
};

module.exports = filterUsers;

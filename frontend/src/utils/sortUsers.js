const sortUsers = (users, sort, order) => {
  const sortedUsers = [...users];

  switch (`${sort} ${order}`) {
    case "age ascending":
      sortedUsers.sort((a, b) => a.age - b.age);
      break;
    case "age descending":
      sortedUsers.sort((a, b) => b.age - a.age);
      break;
    case "location ascending":
      sortedUsers.sort((a, b) => a.city.localeCompare(b.city));
      break;
    case "location descending":
      sortedUsers.sort((a, b) => b.city.localeCompare(a.city));
      break;
    case "tags ascending":
      sortedUsers.sort((a, b) => a.tags.length - b.tags.length);
      break;
    case "tags descending":
      sortedUsers.sort((a, b) => b.tags.length - a.tags.length);
      break;
    case "liked_by ascending":
      sortedUsers.sort((a, b) => a.liked_by.length - b.liked_by.length);
      break;
    case "liked_by descending":
      sortedUsers.sort((a, b) => b.liked_by.length - a.liked_by.length);
      break;
    default:
      return sortedUsers;
  }

  return sortedUsers;
};

export default sortUsers;

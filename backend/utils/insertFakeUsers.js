const userQueries = require("../queries/userInfo");
const insertQueries = require("../queries/createUser");
const userNames = [
  { name: "ana", gender: "female" },
  { name: "alba", gender: "female" },
  { name: "juho", gender: "male" },
  { name: "amadeo", gender: "male" },
  { name: "luke", gender: "male" },
  { name: "salla", gender: "female" },
  { name: "goro", gender: "transgender" },
  { name: "paul", gender: "transgender" },
  { name: "koko", gender: "transgender" },
];

const fakeUsers = async () => {
  let i = 0;
  userNames.map(async (user) => {
    const queryResponseCreate = await insertQueries.insertUser({
      username: user.name,
      email: `${user.name}@user.com`,
      fullname: `${user.name} lastname`,
      password: "123456",
      age: "30",
    });
    const user_id = queryResponseCreate.rows[0].user_id;
    const body = {
      gender: user.gender,
      sexualPreference: "straight",
      bio: "hello I am happy",
      tags: ["helsinki", "vantaa"],
      location: "",
    };
    const queryReponseInfo = await userQueries.insertUserInfo(
      body,
      user_id,
      "194.136.126.35"
    );
    i >= 4 ? (i = 1) : (i += 1);
    const queryResponseImg = await userQueries.insertUserPictures(
      `./media/cp${i}.jpg`,
      user_id
    );
  });
};

module.exports = fakeUsers;

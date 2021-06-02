import bcrypt from "bcryptjs";
const Users = [
  {
    name: "Hitesh",
    email: "Hitesh@gmail.com",
    password: bcrypt.hashSync("abac"),
    isAdmin: true,
  },
  {
    name: "Diepsh",
    email: "Hitesdfsdfsh@gmail.com",
    password: bcrypt.hashSync("abac"),
  },
  {
    name: "Shazam",
    email: "Hitesdfsdfsdfsh@gmail.com",
    password: bcrypt.hashSync("abac"),
  },
];
export default Users;

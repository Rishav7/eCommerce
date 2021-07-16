
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync("123456",10),
    isAdmin: true,
  },
  {
    name: 'user1',
    email: 'user1.com',
    password: bcrypt.hashSync("123456",10),
    isAdmin: true,
  },
  {
    name: 'rishav',
    email: 'rishav@gmail.com',
    password: bcrypt.hashSync("123456",10),
    isAdmin: true,
  },
];

export default users

const bcrypt = require('bcrypt');

const hashPass = (password) => bcrypt.hashSync(password, 10);
const comparePass = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = { hashPass, comparePass };
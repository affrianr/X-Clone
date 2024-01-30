const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req) {
  let token = req.headers.authorization;

  if (!token) {
    throw new GraphQLError("Invalid token", {
      extensions: { code: "INVALID_TOKEN" },
    });
  }

  token = token.split(" ")[1];

  const decode = verifyToken(token);
  const findUser = await User.getById(decode.userId);
  
  if (!findUser) {
    throw new GraphQLError("Invalid token", {
      extensions: { code: "INVALID_TOKEN" },
    });
  }

  // console.log(findUser[0]._id.toString(), 'di auth')
  return { 
    userId: findUser[0]._id,
    username: findUser[0].username
  };
}

module.exports = authentication;

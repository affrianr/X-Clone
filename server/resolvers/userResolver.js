const { GraphQLError } = require('graphql')
const User = require('../models/user')
const { comparePass, hashPass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

const resolvers = {
    Query: {
        getUsers: async(_, args) => {
            let users
            if(args.search){
                users = await User.getAll(args.search)
            }
            else {
                users = await User.getAll()
            }
            return users
        },
        getUserDetail: async (_, args, contextValue) => {
            const user = await contextValue.authentication()
            const userDetail = await User.getById(user.userId)
            // console.log(userDetail[0].following[0].user_followed, '>>>>>>>> ini di user resolvers')
            return userDetail[0]
        },
        getAnotherUserDetail: async (_, args) => {

            const userDetail = await User.getById(args.id)
            // console.log(userDetail[0].following[0].user_followed, '>>>>>>>> ini di user resolvers')
            return userDetail[0]
        }
    },
    Mutation: {
        register: async (_, args) => {
            let newUser = { ...args.newUser }
            newUser.password = hashPass(args.newUser.password)
            const result = await User.create(newUser)
            return newUser
        },
        login: async (_, args) => {
            const { email, password } = args;
            const findUser = await User.findEmail(email);
            if(!findUser){
                throw new GraphQLError("invalid email/password", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                  });
            }

            const comparePassword = comparePass(password, findUser.password);
            if(!comparePassword){
                throw new GraphQLError("invalid email/password", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                  });
            }

            const access_token = createToken({
                userId: findUser._id
            });

            return { access_token }
        }
    }
}

module.exports = resolvers;
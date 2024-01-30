const { ObjectId } = require("mongodb");
const Follow = require("../models/follow");

const resolvers = {
    Query: {
        getFollower: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            const follower = await Follow.getFollower(user.userId);
            
            return follower
        },
        getFollowing: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            const follower = await Follow.getFollowing(user.userId);
            
            return follower
        }
    },
    Mutation: {
        follow: async (_, args, contextValue) => {
            const { followingId } = args;
            const user = await contextValue.authentication();
            // console.log(user)
            const newFollow = {
                followingId: new ObjectId(followingId),
                followerId: user.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            // console.log(newFollow)
            const result = await Follow.follow(newFollow)
            return `Followed user`
        }
    }
}

module.exports = resolvers;
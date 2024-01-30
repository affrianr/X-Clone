const { GraphQLError } = require('graphql')
const Post = require("../models/post");

const resolvers = {
    Query: {
        getPosts: async(_, __, contextValue) => {
            const token = await contextValue.authentication();
            if(!token){
                throw new GraphQLError("Invalid Token", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                  });
            }
           const result = await Post.getAll()
           console.log(result)
           return result

        },
        getPostDetail: async (_, args, contextValue) => {
            const token = await contextValue.authentication();
            if(!token){
                throw new GraphQLError("Invalid Token", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                  });
            }
           const result = await Post.getById(args.id)
           return result
        }
    },
    Mutation: {
        addPost: async (_, args, contextValue) => {
            let newPost = {...args.newPost};
            const user = await contextValue.authentication();
            console.log(user, '<<<<<<< di add post resolvers')
            newPost.authorId = user.userId
            newPost.createdAt = new Date()
            newPost.updatedAt = new Date()
            const result = await Post.create(newPost)
            return `Success added new post`
        },
        addComment: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            let data = {...args.newComment};
            delete data.postId;
            data.username = user.username;
            data.createdAt = new Date()
            data.updatedAt = new Date()
            const result = await Post.addComment(args.newComment.postId, data)
            
            return `You commented this post`
        },
        addLike: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            // console.log(user)
            let data = {...args.newLike};
            delete data.postId;
            data.username = user.username;
            data.createdAt = new Date()
            data.updatedAt = new Date()
            
            const result = await Post.addLike(args.newLike.postId, data)
            // console.log(result)
            
            return `You liked this post`
        }
    }
}

module.exports = resolvers;
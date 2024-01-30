const { ObjectId } = require('mongodb');
const { getDb } = require('../config/mongodb');
const { GraphQLError } = require('graphql')
const redis = require('../config/ioredis')

class Post {
    static getPosts() {
        return getDb().collection('posts');
    }

    static async getAll(){
        try {
            // const post = await this.getPosts().find().toArray()
           const postCache = await redis.get('posts');

           if(postCache){
            const posts = JSON.parse(postCache);
            return posts;
           }
            
            const posts = await this.getPosts().aggregate(
                [
                  { $sort : { createdAt : -1 } },
                  {
                    $lookup:  {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                      },
                  },
                  {
                    $unwind: '$author'
                  }
                ]
             ).toArray()
            //  console.log(posts[0].author)
             await redis.set("posts", JSON.stringify(posts))
            return posts;
        } catch (error) {
            console.log(error)
        }
    }

    static async create(post){
        try {

            let input = post
            input.authorId = new ObjectId(post.authorId)
            console.log(input)
            const newPost = await this.getPosts().insertOne(input);
            await redis.del('posts')
            return newPost;
        } catch (error) {
            console.log(error)
        }
    }

    static async getById(id){
        const post = await this.getPosts().findOne({ _id: new ObjectId(id) });
        return post;
    }

    static async addLike(id, like){
        try {
            let findLiked = await this.getPosts().findOne(
                { _id: new ObjectId(id), 'likes.username': like.username },
               
            )
            if(findLiked){
                return null
            }
            await redis.del('posts')
            //findOneAndUpdate untuk mencari post berdasarkan ID dan nge-push like yg diberikan oleh user lain ke postingan tersebut
            return await this.getPosts().updateOne(
                { _id: new ObjectId(id)},
                { $push: { likes : like } }
                )
        } catch (error) {
            console.log(error)
        }
    }
    


    static async addComment(id, comment){
        try {
            await redis.del('posts')
            return await this.getPosts().findOneAndUpdate(
                { _id: new ObjectId(id)},
                { $push: { comments : comment } }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Post;
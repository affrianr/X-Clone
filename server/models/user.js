const { ObjectId } = require('mongodb');
const { getDb } = require('../config/mongodb');

class User {
    static getUsers() {
        return getDb().collection('users');
    }

    static async getAll(search) {
        if(search){
            const users = await this.getUsers().find(
               {
                $or : [ {username: {$regex: search}}, {name: {$regex: search}}]
               } 
            ).toArray()
            return users
        } else {
            const users = await this.getUsers().find().toArray();
            return users;
        }
    }

    static async create(user) {
        const newUser = await this.getUsers().insertOne(user);
        return newUser;
    }
    
    static async getById(id) {
        // const user = await this.getUsers().findOne({_id: new ObjectId(id)}); //tambah ObjectId karena _id pada mongo terdapat ObjectId
        const user = await this.getUsers().aggregate( [
            { $match: { _id: new ObjectId(id) }},
            {
              $lookup:
                {
                  from: "posts",
                  localField: "_id",
                  foreignField: "authorId",
                  as: "posts"
                }
           },
           {
            $lookup:
              {
                from: "Follows",
                localField: "_id",
                foreignField: "followerId",
                as: "following"
              }
            },
            {
            $lookup:
              {
                from: "Follows",
                localField: "_id",
                foreignField: "followingId",
                as: "follower"
              }
            }
         ] ).toArray()
        return user
    }

    static async findEmail(email){
        return await this.getUsers().findOne({email})
    }

}

module.exports = User;
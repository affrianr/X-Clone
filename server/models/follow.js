const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongodb')

class Follow {
    static async follow(data){
        let findUser = await getDb().collection('Follows').findOne(
            { followingId: data.followingId, followerId: data.followerId },
        )
        if(findUser){
            return null
        } else {
            return await getDb().collection('Follows').insertOne(data)
        }
    }

    static async getFollower(id){
        let findFollower = await getDb().collection('Follows').aggregate(
            [{ $match: { followingId: new ObjectId(id) }},
            {
                $lookup:
                {
                  from: "users",
                  localField: "followerId",
                  foreignField: "_id",
                  as: "user"
                },
                
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                   "username": {
                      $cond: {
                         if: { $eq: [ "", "$user.username" ] },
                         then: "$$REMOVE",
                         else: "$user.username"
                      }
                   }
                }
             }
            ]
        ).toArray()
        // let find = await getDb().collection('Follows').aggregate(
        //     [{ $match: { followingId: new ObjectId(id) }},
        //     {
        //         $lookup:
        //         {
        //           from: "users",
        //           localField: "followerId",
        //           foreignField: "_id",
        //           as: "user"
        //         },
                
        //     },]).toArray()
        // console.log(find[0], '>>>> follower')
        console.log(findFollower, '<<< follower')
        return findFollower

    }

    static async getFollowing(id){
        let findFollowing = await getDb().collection('Follows').aggregate(
            [{ $match: { followerId: new ObjectId(id) }},
            {
                $lookup:
                {
                  from: "users",
                  localField: "followerId",
                  foreignField: "_id",
                  as: "user"
                },
                
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                   "username": {
                      $cond: {
                         if: { $eq: [ "", "$user.username" ] },
                         then: "$$REMOVE",
                         else: "$user.username"
                      }
                   }
                }
             }
            ]
        ).toArray()
        console.log(findFollowing, '<<< following')
        return findFollowing
    }
}

module.exports = Follow;
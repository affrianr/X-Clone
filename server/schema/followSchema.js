const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Follow {
    _id: ID 
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  type Follower {
    username: String
  }

  type Following {
    username: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this

  type Query {
    getFollower(id: ID): [Follower]
    getFollowing(id: ID): [Following]
  }

  type Mutation {
    follow(followingId: ID!): String
  }
`;

module.exports = typeDefs;
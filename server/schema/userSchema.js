

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  # type User {
  #   _id: ID
  #   name: String
  #   username: String
  #   email: String
  #   password: String
  # }

  type User {
    _id: ID
    name: String
    username: String
    email: String
    avatar: String
    password: String
    posts: [Post]
    following: [Following]
    followers: [Follower]
  }

  type Following {
    followingId: String
  }

  type Follower {
    followerId: String
  }

  type Post {
    content: String
  }

  type Token {
    access_token: String
  }

  input newUser {
    name: String!
    username: String!
    email: String!
    avatar: String
    password: String!
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getUsers(search: String): [User]
    getUserDetail(id: ID): User
    getAnotherUserDetail(id: ID!): User
  }

  type Mutation {
    register(newUser: newUser): User
    login(email: String!, password: String!): Token
  }
`;



module.exports = typeDefs;

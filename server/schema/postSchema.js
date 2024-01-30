
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    _id: ID #JANGAN LUPA DIHAPUS SAAT KONEK KE MONGODB ATLAS
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    author: Author
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updateAt: String

  }

  type Author {
    username: String
    name: String
    avatar: String
  }

  type Comments {
    content: String
    username: String
    createdAt: String
    updateAt: String
  }

  type Likes {
    username: String
    createdAt: String
    updateAt: String
  }

  input newPost {
    content: String!
    tags: [String]
    imgUrl: String!
  }

  input newComment {
    postId: ID!
    content: String!
    username: String
  }

  input newLike {
    postId: ID!
    username: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this

  type Query {
    getPosts: [Post]
    getPostDetail(id: ID!): Post
  }

  type Mutation {
    addPost(newPost: newPost): String
    addComment(newComment: newComment): String
    addLike(newLike: newLike): String
  }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String
    images: [String]
    imgUserProfile: String
    tags: [String]
    createdBy: String
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    imgUserProfile: String
    body: String!
  }
  type Image {
    url: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    imgProfile: String
    imgBackgroundProfile: String
    bio: String
    introductions: [String]
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    imgProfile: String
    imgBackgroundProfile: String
    bio: String
    introductions: [String]
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPostsByQuery(searchString: String!): [Post]
    getPostsByUser(userId: ID!): [Post]
    getPost(postId: ID!): Post
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(title: String!, description: String, images: [String], tags: [String]): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

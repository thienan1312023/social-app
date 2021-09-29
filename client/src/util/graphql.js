import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      description
      username
      images
      imgUserProfile
      tags
      likeCount
      createdAt
      createdBy
      likes {
        username
      }
      commentCount
      comments {
        id
        imgUserProfile
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_POSTS_QUERY_BY_USER = gql`
{
  getPostsByUser(userId: $userId){
    id
      title
      description
      username
      images
      imgUserProfile
      tags
      likeCount
      createdBy
      createdAt
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
}
`;

export const FETCH_POSTS_BY_SEARCH_STRING = gql`
{
  getPostsByQuery(searchString: $searchString){
    id
      title
      description
      username
      images
      imgUserProfile
      tags
      likeCount
      createdBy
      createdAt
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
}
`;

export const FETCH_USER_QUERY = gql`
  {
    getUser(userId: $userId) {
      id
      username
      imgProfile
      bio
      imgBackgroundProfile
      introductions
      createdAt
    }
  }
`;
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './styles.css';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';
import { ThemeContext } from '../context/theme';
function Home() {
  const { userId } = useParams();
  const {
    data: { getPostsByUser }
  } = useQuery(FETCH_POSTS_QUERY_BY_USER, {
    variables: {
      userId
    }
  });

  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId
    }
  });

  if (getUser) {
    const {
      imgBackgroundProfile,
      imgProfile,
      username,
      bio
    } = getUser;
    return (
      <div className="home-area">
        <div className="background-container">
          <div className="user-background">
            <img src={imgBackgroundProfile} alt="" className="background-img" />
          </div>

          <div className="img-profile-container">
            <div className="img-block">
              <img src={imgProfile} alt="" className="img-profile" />
              <div className="camera-icon">
                <PhotoCameraIcon fontSize="large" />
              </div>
            </div>
          </div>
          <div className="name-bo">
            <div><h3>{username}</h3></div>
            <div><h4>{bio}</h4></div>
            <a href="" className="edit-info">Edit</a>
          </div>
        </div>
        <div className="list-item">
          <ul className="menu-homepage">
            <li><a href="">Posts</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Mentions</a></li>
            <li><a href="">Followers</a></li>
            <li><a href="">Photos</a></li>
            <li><a href="">Videos</a></li>
            <li><a href="">More</a></li>
          </ul>
        </div>
        <div className="personal-posts">
          {getPostsByUser && <Posts posts={getPostsByUser} />}
        </div>

      </div>
    );
  } else {
    return (<></>)
  }
}

export default Home;

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      imgProfile
      bio
      imgBackgroundProfile
      introductions
    }
  }
`;

const FETCH_POSTS_QUERY_BY_USER = gql`
query($userId: ID!) {
  getPostsByUser(userId: $userId){
    id
      title
      description
      username
      images
      imgUserProfile
      tags
      likeCount
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
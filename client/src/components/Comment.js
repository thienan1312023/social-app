import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import Loader from "react-loader-spinner";
import {
  Card,
  Form,
  Grid,
  Icon,
} from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';
import DeleteButton from './DeleteButton';
import './styles.css';

function Comment({ postId }) {
  const { user } = useContext(AuthContext);
  const { themeColor } = useContext(ThemeContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });
  let postMarkup;
  if (!getPost) {
    postMarkup = <Loader
      type="ThreeDots"
      color="#8c9198"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  } else {
    const {
      id,
      imgUserProfile,
      comments,
    } = getPost;

    postMarkup = (
      <div className={`comment-container ${themeColor}`}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '1.2rem', borderRadius: '1.2rem', backgroundColor: '#eff2f5', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <div className="img-container" style={{ flexShrink: '0' }}>
                  {comment.imgUserProfile
                    ?
                    <img
                      src={comment.imgUserProfile}
                      alt="img-profile"
                      className="img-comment-user-profile" />
                    :
                    <img className="no-avatar" />
                  }
                </div>
                <div style={{}}>
                  <div>{comment.username}</div>
                  <div style={{ fontWeight: '300', fontSize: '12px' }}>{moment(comment.createdAt).fromNow()}</div>
                  <div style={{ marginTop: '0.2rem' }}>
                    <p style={{ fontWeight: '300' }}>{comment.body}</p>
                  </div>
                </div>
              </div>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
            </div>

          </div>
        ))}
        <Card.Content>
          <Form>
            {user && <div className="comment-input">
              <div className="img-container">
                <img src={user.imgProfile} alt="img-profile" className="img-comment-user-profile" />
              </div>
              <input
                style={{ borderRadius: '18px', fontSize: '15px' }}
                type="text"
                placeholder="Write a comment..."
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInputRef}
              />
              <Icon
                className="send-button"
                name="send"
                color="blue"
                size="large"
                disabled={comment.trim() === ''}
                onClick={submitComment}
                onKeyDown={(e) => {
                  submitComment();
                }}
              />
            </div>}
          </Form>
        </Card.Content>
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        imgUserProfile
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      description
      images
      imgUserProfile
      tags
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        imgUserProfile
        createdAt
        body
      }
    }
  }
`;

export default Comment;

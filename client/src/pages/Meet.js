import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loader from "react-loader-spinner";
import Comment from '../components/Comment';
import './styles.css';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Meet() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (loading === false && data) {
      setPosts(data.getPosts);
    }
  }, [loading, data])

  return (
    <div>
      <div style={{ paddingBottom: '1rem' }}>
      </div>
      <div>
        {user && (
          <div>
            <PostForm />
          </div>
        )}
        {loading ? (
          <Loader
            type="ThreeDots"
            color="#8c9198"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
            <div>
              {posts &&
                posts.map((post) => (
                  <div key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                    <Comment postId={post.id} />
                  </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
}

export default Meet;

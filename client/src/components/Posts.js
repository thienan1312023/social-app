import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import PostCard from './PostCard';

const Posts = ({posts}) => {
    return (<div>
        {posts &&
            posts.map((post) => (
                <div key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                    <Comment postId={post.id} />
                </div>
            ))}
    </div>)
}
export default Posts;
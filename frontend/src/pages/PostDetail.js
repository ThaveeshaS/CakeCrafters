import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>loading...</div>;

  return (
    <div>
      <h2>{post.description}</h2>
      <p>posted by: {post.user.username}</p>
      <p>created at: {new Date(post.createdAt).toLocaleString()}</p>
      <h4>media</h4>
      <ul>
        {post.mediaUrls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
      <h4>comments</h4>
      {post.comments.length === 0 ? (
        <p>no comments yet.</p>
      ) : (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              {comment.content} - {comment.user.username} ({new Date(comment.createdAt).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
      <h4>likes</h4>
      <p>{post.likes.length} likes</p>
    </div>
  );
}

export default PostDetail;
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>posts</h2>
      {posts.length === 0 ? (
        <p>no posts available.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.description}</h5>
                  <p className="card-text">posted by: {post.user.username}</p>
                  <a href={`/posts/${post.id}`} className="btn btn-primary">view details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
import React, { useState } from 'react';
import api from '../services/api';

function CreatePost() {
  const [description, setDescription] = useState('');
  const [mediaUrls, setMediaUrls] = useState(['']);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleMediaUrlChange = (index, value) => {
    const newMediaUrls = [...mediaUrls];
    newMediaUrls[index] = value;
    setMediaUrls(newMediaUrls);
  };

  const addMediaUrlField = () => {
    setMediaUrls([...mediaUrls, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/posts', {
        description,
        mediaUrls,
        user: { id: 1 }, // hardcoded user for now
      });
      setSuccess('post created successfully!');
      setDescription('');
      setMediaUrls(['']);
    } catch (err) {
      setError('error creating post: ' + err.message);
    }
  };

  return (
    <div>
      <h2>create a new post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">media urls</label>
          {mediaUrls.map((url, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={url}
                onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                placeholder="enter media url"
              />
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addMediaUrlField}>
            add another url
          </button>
        </div>
        <button type="submit" className="btn btn-primary">create post</button>
      </form>
    </div>
  );
}

export default CreatePost;
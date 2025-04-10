import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateDecoration = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    media: '',
    author: '',
    date: new Date().toLocaleDateString('en-US'),
  });

  const categories = ['Piping', 'Fondant', 'Icing', 'Sprinkles', 'Modeling'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      media: e.target.files[0]?.name || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      difficulty: formData.difficulty,
      mediaUrls: formData.media ? [formData.media] : [],
      author: formData.author,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch('http://localhost:8080/api/decoration-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tipData),
      });
      if (response.ok) {
        navigate('/decoration-tips');
      } else {
        console.error('Failed to create tip');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-decoration-container">
      <style>
        {`
          .create-decoration-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: #f9f9ff;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          
          .form-header {
            color: #4a4e69;
            text-align: center;
            margin-bottom: 2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .form-section {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          }
          
          .form-section h3 {
            color: #4a4e69;
            border-bottom: 2px solid #e4e6f0;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
          }
          
          .submit-btn {
            background: #4a4e69;
            border: none;
            padding: 10px 25px;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 1px;
            transition: all 0.3s;
          }
          
          .submit-btn:hover {
            background: #3a3d56;
            transform: translateY(-2px);
          }
          
          .form-control:focus, .form-select:focus {
            border-color: #4a4e69;
            box-shadow: 0 0 0 0.25rem rgba(74, 78, 105, 0.25);
          }
          
          textarea.form-control {
            min-height: 120px;
          }
        `}
      </style>

      <h1 className="form-header">Create Decorating Tip</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="author" className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">Tip Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
              <select
                className="form-select"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Description</h3>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Describe your decorating tip
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Learn to create smooth buttercream swirls..."
              rows="6"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Media</h3>
          <div className="mb-3">
            <label htmlFor="media" className="form-label">
              Upload Photo or Video (Optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="media"
              name="media"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <small className="form-text text-muted">
              Max 30 seconds for videos.
            </small>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            <small>Date: {formData.date}</small>
          </div>
          <div>
            <Link to="/decoration-tips" className="btn btn-outline-secondary me-3">
              Cancel
            </Link>
            <button type="submit" className="btn submit-btn">
              Add Decorating Tip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDecoration;
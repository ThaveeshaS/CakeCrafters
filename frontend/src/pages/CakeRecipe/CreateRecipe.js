import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateRecipeForm = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    cakeName: '',
    subTitle: '',
    cakeType: '',
    skillLevel: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    servingSize: '',
    ingredients: '',
    instructions: '',
    date: new Date().toLocaleDateString('en-US')
  });

  const cakeTypes = [
    'Birthday cake',
    'Anniversary cake',
    'Chocolate cake',
    'Cheesecakes',
    'Butter cake'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send data to your backend
  };

  return (
    <div className="create-recipe-container">
      <style>
        {`
          .create-recipe-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: #fff9f9;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          
          .form-header {
            color: #d23c77;
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
            color: #d23c77;
            border-bottom: 2px solid #ffd6e7;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
          }
          
          .submit-btn {
            background: #d23c77;
            border: none;
            padding: 10px 25px;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 1px;
            transition: all 0.3s;
          }
          
          .submit-btn:hover {
            background: #b52e63;
            transform: translateY(-2px);
          }
          
          .form-control:focus, .form-select:focus {
            border-color: #d23c77;
            box-shadow: 0 0 0 0.25rem rgba(210, 60, 119, 0.25);
          }
          
          textarea.form-control {
            min-height: 120px;
          }
        `}
      </style>

      <h1 className="form-header">Create Cake Recipe Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="authorName" className="form-label">Author Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="authorName" 
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cakeName" className="form-label">Cake Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="cakeName" 
                name="cakeName"
                value={formData.cakeName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="subTitle" className="form-label">Sub Title</label>
              <input 
                type="text" 
                className="form-control" 
                id="subTitle" 
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cakeType" className="form-label">Cake Type</label>
              <select
                className="form-select"
                id="cakeType"
                name="cakeType"
                value={formData.cakeType}
                onChange={handleChange}
              >
                <option value="">Select cake type</option>
                {cakeTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>How to Make</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="skillLevel" className="form-label">Skill Level</label>
              <select 
                className="form-select" 
                id="skillLevel" 
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="prepTime" className="form-label">Prep Time</label>
              <input 
                type="text" 
                className="form-control" 
                id="prepTime" 
                name="prepTime"
                placeholder="e.g. 30 mins"
                value={formData.prepTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="cookTime" className="form-label">Cook Time</label>
              <input 
                type="text" 
                className="form-control" 
                id="cookTime" 
                name="cookTime"
                placeholder="e.g. 1 hour"
                value={formData.cookTime}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="servings" className="form-label">Servings</label>
              <input 
                type="number" 
                className="form-control" 
                id="servings" 
                name="servings"
                value={formData.servings}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="servingSize" className="form-label">Serving Size</label>
              <input 
                type="text" 
                className="form-control" 
                id="servingSize" 
                name="servingSize"
                placeholder="e.g. 1 slice"
                value={formData.servingSize}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Ingredients</h3>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">
              List all ingredients with quantities (separate with new lines)
            </label>
            <textarea
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Example:
2 cups all-purpose flour
1 cup sugar
3 eggs
1 cup milk
..."
              rows="6"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Instructions</h3>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Step-by-step instructions
            </label>
            <textarea
              className="form-control"
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Example:
1. Preheat oven to 350°F (175°C)
2. Mix dry ingredients in a large bowl
3. Add wet ingredients and mix well
..."
              rows="8"
            />
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            <small>Date: {formData.date}</small>
          </div>
          <button type="submit" className="btn submit-btn">
            Add Cake Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
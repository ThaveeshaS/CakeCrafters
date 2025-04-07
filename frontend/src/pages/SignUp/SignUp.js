import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'; // We'll add custom CSS

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Registration data:', formData);
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card signup-card">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="signup-title">Create Your Account</h2>
                <p className="text-muted">Join our community today</p>
              </div>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                  <div className="invalid-feedback">Please enter your name</div>
                </div>
                
                <div className="mb-3 form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                  <div className="invalid-feedback">Please enter a valid email</div>
                </div>
                
                <div className="mb-3 form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                  <label htmlFor="password">Password</label>
                  <div className="invalid-feedback">Password must be at least 6 characters</div>
                </div>
                
                <div className="mb-4 form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="invalid-feedback">Passwords must match</div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 signup-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : 'Sign Up'}
                </button>
                
                <div className="divider my-4">
                  <span className="divider-text">or</span>
                </div>
                
                <div className="social-login mb-4">
                  <button type="button" className="btn btn-outline-primary w-100 mb-2">
                    <i className="bi bi-google me-2"></i> Sign up with Google
                  </button>
                  <button type="button" className="btn btn-outline-dark w-100">
                    <i className="bi bi-github me-2"></i> Sign up with GitHub
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <p className="text-muted">
                    Already have an account? <Link to="/login" className="login-link">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
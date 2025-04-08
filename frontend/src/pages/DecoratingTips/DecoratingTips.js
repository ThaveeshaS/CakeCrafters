import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DecorationTips = () => {
  const navigate = useNavigate();

  // Sample decorating tips data
  const sampleTips = [
    {
      id: 1,
      title: "Perfect Buttercream Piping",
      author: "Decorator Anna",
      date: "2023-07-10",
      category: "Piping",
      difficulty: "Intermediate",
      description: "Learn to create smooth, consistent buttercream swirls using a star tip.",
      mediaUrl: "https://via.placeholder.com/150", // Placeholder image
      tips: "Chill your piping bag for better control."
    },
    {
      id: 2,
      title: "Fondant Flower Sculpting",
      author: "Baker Lisa",
      date: "2023-08-05",
      category: "Fondant",
      difficulty: "Advanced",
      description: "Master the art of shaping delicate fondant flowers for cake toppers.",
      mediaUrl: "https://via.placeholder.com/150", // Placeholder image
      tips: "Use cornstarch to prevent sticking."
    }
  ];

  const [tips] = useState(sampleTips);

  return (
    <div className="container py-5">
      {/* Create Tip Button - Top Right */}
      <div className="d-flex justify-content-end mb-4">
        <Link to="/create-decorating" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i> Create Decorating Tip
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-4 text-center mb-5">Cake Decorating Tips</h1>

          {tips.length === 0 ? (
            <p className="text-center">No decorating tips available yet.</p>
          ) : (
            tips.map((tip) => (
              <div key={tip.id} className="card mb-4">
                <div className="card-body">
                  <h2 className="h4 mb-3">{tip.title}</h2>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      <i className="bi bi-person-fill"></i> By {tip.author}
                    </span>
                    <span className="text-muted">
                      <i className="bi bi-calendar"></i> {tip.date}
                    </span>
                  </div>
                  <div className="d-flex gap-4 mb-3">
                    <span className="badge bg-primary">
                      <i className="bi bi-tag-fill"></i> {tip.category}
                    </span>
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-speedometer2"></i> {tip.difficulty}
                    </span>
                  </div>
                  <p className="card-text">{tip.description}</p>
                  {tip.mediaUrl && (
                    <img src={tip.mediaUrl} alt={tip.title} className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
                  )}
                  {tip.tips && (
                    <div className="alert alert-info">
                      <i className="bi bi-lightbulb-fill me-2"></i> <strong>Tip:</strong> {tip.tips}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left"></i> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorationTips;
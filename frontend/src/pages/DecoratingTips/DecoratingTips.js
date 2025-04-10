import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DecorationTips = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});

  // Fetch tips from backend on mount
  useEffect(() => {
    fetch('http://localhost:8080/api/decoration-tips')
      .then((res) => res.json())
      .then((data) => {
        setTips(
          data.map((tip) => ({
            id: tip.id,
            title: tip.title,
            author: tip.author,
            date: new Date(tip.createdAt).toLocaleDateString('en-US'),
            category: tip.category,
            difficulty: tip.difficulty,
            description: tip.description,
            mediaUrl: tip.mediaUrls[0] || 'https://via.placeholder.com/500x300',
            likes: 0, // Add likes endpoint later
            isLiked: false,
            comments: [], // Add comments endpoint later
          }))
        );
      })
      .catch((error) => console.error('Error fetching tips:', error));
  }, []);

  const handleLike = (tipId) => {
    setTips(tips.map(tip =>
      tip.id === tipId ? { 
        ...tip, 
        likes: tip.isLiked ? tip.likes - 1 : tip.likes + 1,
        isLiked: !tip.isLiked 
      } : tip
    ));
  };

  const handleCommentChange = (tipId, value) => {
    setNewComments({ ...newComments, [tipId]: value });
  };

  const handleCommentSubmit = (tipId, e) => {
    e.preventDefault();
    const commentText = newComments[tipId]?.trim();
    if (!commentText) return;

    setTips(tips.map(tip =>
      tip.id === tipId
        ? {
            ...tip,
            comments: [
              ...tip.comments,
              { id: Date.now(), text: commentText, author: "Current User", date: new Date().toLocaleDateString('en-US') }
            ]
          }
        : tip
    ));
    setNewComments({ ...newComments, [tipId]: '' });
  };

  const toggleComments = (tipId) => {
    setShowComments({ ...showComments, [tipId]: !showComments[tipId] });
  };

  const handleDeleteComment = (tipId, commentId) => {
    setTips(tips.map(tip =>
      tip.id === tipId
        ? { ...tip, comments: tip.comments.filter(comment => comment.id !== commentId) }
        : tip
    ));
  };

  const handleDelete = (tipId) => {
    fetch(`http://localhost:8080/api/decoration-tips/${tipId}`, { method: 'DELETE' })
      .then(() => setTips(tips.filter(tip => tip.id !== tipId)))
      .catch(error => console.error('Error deleting tip:', error));
  };

  // Edit placeholder (add later)
  const handleEdit = (tipId) => {
    console.log(`Edit tip with ID: ${tipId}`);
  };

  // Rest of your existing JSX remains the same
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-4">
        <Link to="/create-decorating" className="btn btn-primary rounded-pill">
          <i className="bi bi-plus-circle me-2"></i> Create Decorating Tip
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-5 text-center mb-4">Cake Decorating Tips</h1>
          {tips.length === 0 ? (
            <p className="text-center">No decorating tips available yet.</p>
          ) : (
            tips.map((tip) => (
              <div key={tip.id} className="card shadow-sm mb-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style={{ width: "45px", height: "45px" }}>
                      <i className="bi bi-person-fill fs-4"></i>
                    </div>
                    <div className="ms-3">
                      <h6 className="fw-bold mb-0">{tip.author}</h6>
                      <small className="text-muted">{tip.date}</small>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                      <div className="d-flex gap-2 me-3">
                        <span className="badge bg-primary rounded-pill px-3 py-2">{tip.category}</span>
                        <span className="badge bg-warning text-dark rounded-pill px-3 py-2">{tip.difficulty}</span>
                      </div>
                      <div className="dropdown">
                        <button className="btn btn-link text-dark p-0" type="button" id={`dropdownMenuButton-${tip.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="bi bi-three-dots fs-4"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton-${tip.id}`}>
                          <li><button className="dropdown-item" onClick={() => handleEdit(tip.id)}><i className="bi bi-pencil me-2"></i> Edit</button></li>
                          <li><button className="dropdown-item text-danger" onClick={() => handleDelete(tip.id)}><i className="bi bi-trash me-2"></i> Delete</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {tip.mediaUrl && <img src={tip.mediaUrl} alt={tip.title} className="card-img-top" />}
                <div className="card-body">
                  <h5 className="fw-bold mb-2">{tip.title}</h5>
                  <p>{tip.description}</p>
                  <div className="d-flex mb-2 mt-3 border-top pt-3">
                    <button className={`btn ${tip.isLiked ? 'text-danger' : 'text-dark'}`} onClick={() => handleLike(tip.id)}>
                      <i className={`bi ${tip.isLiked ? 'bi-heart-fill' : 'bi-heart'} fs-4`}></i>
                      <span className="ms-2">{tip.likes} likes</span>
                    </button>
                    <button className="btn text-dark ms-3" onClick={() => toggleComments(tip.id)}>
                      <i className="bi bi-chat fs-4"></i>
                      <span className="ms-2">{tip.comments.length} comments</span>
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3">Comments</h6>
                      <button className="btn btn-sm text-primary p-0" onClick={() => toggleComments(tip.id)}>
                        {showComments[tip.id] ? 'Hide comments' : 'Show comments'}
                      </button>
                    </div>
                    {showComments[tip.id] && (
                      <>
                        {tip.comments.length === 0 ? (
                          <p className="text-muted mb-3">No comments yet. Be the first to comment!</p>
                        ) : (
                          <div className="mb-3">
                            {tip.comments.map((comment) => (
                              <div key={comment.id} className="d-flex mb-2">
                                <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-2" style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                                  <i className="bi bi-person-fill"></i>
                                </div>
                                <div className="bg-light rounded p-2 flex-grow-1">
                                  <div className="d-flex justify-content-between">
                                    <p className="fw-bold mb-0">{comment.author}</p>
                                    <small className="text-muted">{comment.date}</small>
                                  </div>
                                  <p className="mb-1">{comment.text}</p>
                                  <button className="btn btn-sm text-danger p-0 ms-auto" onClick={() => handleDeleteComment(tip.id, comment.id)}>
                                    <small><i className="bi bi-trash"></i></small>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <form onSubmit={(e) => handleCommentSubmit(tip.id, e)} className="d-flex align-items-center mb-2">
                          <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-2" style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                            <i className="bi bi-person-fill"></i>
                          </div>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add a comment..."
                              value={newComments[tip.id] || ''}
                              onChange={(e) => handleCommentChange(tip.id, e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary rounded-circle ms-2">
                              <i className="bi bi-send"></i>
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-primary rounded-pill" onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left"></i> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorationTips;
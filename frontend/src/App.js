import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected path: './pages/Home'
import PostDetail from './pages/PostDetail'; // Already correct
import CreatePost from './pages/CreatePost'; // Already correct
import Navbar from './components/Navbar'; // Corrected path: './components/Navbar'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
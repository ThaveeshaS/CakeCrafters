import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected path: './pages/Home'
import PostDetail from './pages/PostDetail'; // Already correct
import CreatePost from './pages/CreatePost'; // Already correct
import Navbar from './components/Navbar'; // Corrected path: './components/Navbar'

import Header from './components/Header';
import Footer from './components/Footer';
import CreateRecipe from './pages/CakeRecipe/CreateRecipe';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />

            <Route path="/createrecipe" element={<CreateRecipe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
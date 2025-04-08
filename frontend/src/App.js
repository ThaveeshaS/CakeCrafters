import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected path: './pages/Home'
import PostDetail from './pages/PostDetail'; // Already correct
import CreatePost from './pages/CreatePost'; // Already correct
import Navbar from './components/Navbar'; // Corrected path: './components/Navbar'

import Header from './components/Header';
import Footer from './components/Footer';
import CakeRecipe from './pages/CakeRecipe/CakeRecipe';
import CreateRecipe from './pages/CakeRecipe/CreateRecipe';


import DecorationTips from './pages/DecoratingTips/DecoratingTips';
import CreateDecoration from './pages/DecoratingTips/CreateDecorating';

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

            <Route path="/cakerecipe" element={<CakeRecipe />} />
            <Route path="/createrecipe" element={<CreateRecipe />} />

            <Route path="/decoration-tips" element={<DecorationTips />} />
            <Route path="/create-decorating" element={<CreateDecoration/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
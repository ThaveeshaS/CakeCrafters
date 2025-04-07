import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import CakeRecipe from './pages/CakeRecipe/CakeRecipe';
import CreateRecipe from './pages/CakeRecipe/CreateRecipe';
import Login from './pages/Login/Login';  // Updated path
import SignUp from './pages/SignUp/SignUp';  // Updated path

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
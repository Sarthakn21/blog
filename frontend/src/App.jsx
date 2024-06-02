import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Post from './components/Posts/post'
import Signin from './components/Signin/Signin';
import Signup from './components/Signin/Signup';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function App() {
  const { isLoggedIn, loginUser } = useContext(GlobalContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        {isLoggedIn && isLoggedIn ? <Route path="/post" element={<Post />} /> : <Route path="/post" element={<Signin />} />}
      </Routes>
    </>
  )
}

export default App;

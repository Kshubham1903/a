
// npm install react-router-dom 

import React from 'react';
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import About from './About';

function App(){
return(
  <BrowserRouter>
  
    <Link to='/'>
    Home
    </Link> |   
    <Link to='/about'>
      About
    </Link>

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App;
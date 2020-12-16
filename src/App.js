import React from 'react';
import {Route} from 'react-router-dom'

import './styles/index.scss'
import {Auth} from "./pages/index";

function App() {
  return (
    <div className="wrapper">
      <Auth />     
    </div>
  );
}

export default App;

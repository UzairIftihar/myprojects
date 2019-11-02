import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './components/Layouts/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route className="nav-link" exact path ="/register" component={Register}/>
          <Route className="nav-link" exact path ="/login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

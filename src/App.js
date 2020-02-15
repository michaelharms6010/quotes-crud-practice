import React, {useState} from 'react';
import './App.css';
import {QuoteContext} from "./contexts/QuoteContext";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Navigation from "./components/Navigation";
import AuthForm from "./components/AuthForm";
import PrivateRoute from "./utils/PrivateRoute";
import QuotesList from "./components/QuotesList";
function App() {
  const [quotes, setQuotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  return (

    <Router>
      <QuoteContext.Provider value={{quotes, setQuotes, loggedIn, setLoggedIn}}>
        <div className="App">

          <Navigation />

          <PrivateRoute path="/quotes" component={QuotesList} />
          <Route path="/login" render={ props => <AuthForm {...props} role="login" /> } />
          <Route path="/register" render={ props => <AuthForm {...props} role="register" /> } />
          
        </div>
      </QuoteContext.Provider>
    </Router>
  );
}

export default App;

import React from "react";
import {Link} from "react-router-dom";
import {QuoteContext} from  "../contexts/QuoteContext";

export default function Navigation() {
    const {loggedIn, setLoggedIn} = React.useContext(QuoteContext);


    const logout = _ => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <div className="main-nav">
            <Link to="/quotes">Quotes List</Link>
            {loggedIn 
            ? <Link onClick={logout}>Log Out</Link>
            : <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up </Link>
            </>}
            
            
        </div>
    )
}
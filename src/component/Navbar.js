import React from 'react';
import '../style/Navbar.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom' ;

export default function Navbar() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const handleSignOut = () => {
        removeCookie('token',{path:'/'});
        navigate("/login")
    };

    return (
        <div className="navbar">
            <div className="logo">Your App Name</div>
            <div className="menu">
                <Link to="/create-account" className="nav-item">Create Account</Link>
                <Link to="/transfer-money" className="nav-item">Transfer Money</Link>
            </div>
            <div className="sign-out" onClick={handleSignOut}>
                Sign Out
            </div>
        </div>
    );
};

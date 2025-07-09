import React, {useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Funds from "./Pages/Funds.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ViewFund from "./Pages/ViewFund.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import {Toaster} from "react-hot-toast";
import RefreshHandler from "./RefreshHandler.js";
import Home from "./Pages/Home.jsx";

function App() {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const PrivateRoute = ({element}) => {
        return isAuthenticated ? element : <Navigate to={'/login'}/>
    }

    return (
        <>
            <Router>
                <RefreshHandler setIsAuthenticated={setAuthenticated}/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/funds" element={<PrivateRoute element={<Funds/>}/>} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>} />
                    <Route path="/viewFund/:schemeCode" element={<PrivateRoute element={<ViewFund/>}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <Toaster/>
                <Footer/>
            </Router>
        </>
    )
}

export default App

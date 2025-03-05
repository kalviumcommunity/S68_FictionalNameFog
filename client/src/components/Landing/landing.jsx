import React from 'react'
import { useNavigate } from "react-router-dom"
import "./landing.css"

function Landing() {

    const navigate = useNavigate();

    return (
        <>
            <div className="landingContainer"> 
                <button onClick={() => navigate("/")}> Home </button>
                <button onClick={() => navigate("/viewnames")}> View all </button>
                <button> Hall of Fame </button>
                <button> Add Name </button>
                <button> Login </button>
                <button> Filter </button>
            </div>
        </>
    )
}

export default Landing;

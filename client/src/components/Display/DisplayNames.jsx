import React, { useEffect, useState } from 'react';
import "./DisplayNames.css";
import axios from "axios"

function DisplayNames() {
    const [userData, setUserData] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/");
            setUserData(response.data);
            console.log("Successfully retrieved details", response.data);
        } catch (error) {
            console.log("Error retrieving details", error);
        }
    };

    return (
        <div className="displayNamesContainer">
                <button onClick={fetchUserData} className="fetchButton">
                    Fetch Names
                </button>

            {userData.map((user, index) => (
                <p key={index} id="displayNamesMain"> {index + 1}. {user.name}</p>
            ))}
        </div>
    );
}

export default DisplayNames;

import React, { useEffect, useState } from 'react';
import "./DisplayNames.css";
import axios from "axios"
import { useNavigate } from "react-router-dom"

function DisplayNames() {

    const navigate = useNavigate();

    const nameLink = import.meta.env.VITE_LINK;
    console.log(nameLink)

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(nameLink);
                setUserData(response.data);
                console.log("Successfully retrieved details", response.data);
            } 
            catch (error) {
                console.log("Error retrieving details", error);
            }
        };

        fetchUserData();

    }, []);

    const handleDelete = async (id) => {
        try {
            axios.delete(`${import.meta.env.VITE_LINK}${id}`);
            console.log("Deletion Successful");
            setUserData((prevData) => prevData.filter(user => user._id !== id));
            
        }
        catch (error) {
            console.log("Error in deleting name", error);
        }
    }

    return (
        <div className="displayNamesContainer">
            {userData.map((user, index) => (
                <div key={user._id}>
                    <p id="displayNamesMain"> 
                        {index + 1}. {user.name} <br />
                        <span> ID - {user._id} </span>
                    </p>

                    <div className="viewerButtonDiv">
                        <button id="UDButton" onClick={() => {
                            navigate("/editData", {state: { user }})
                        }}> Update </button>

                        <button id="UDButton" onClick={() => handleDelete(user._id)}> Delete </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayNames;

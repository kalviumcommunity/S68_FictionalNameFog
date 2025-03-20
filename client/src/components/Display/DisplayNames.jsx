import React, { useEffect, useState } from 'react';
import "./DisplayNames.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DisplayNames() {
    const navigate = useNavigate();
    const nameLink = import.meta.env.VITE_LINK;
    
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userEntities, setUserEntities] = useState([]);

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
            await axios.delete(`${import.meta.env.VITE_LINK}${id}`);
            console.log("Deletion Successful");
            setUserData((prevData) => prevData.filter(user => user._id !== id));
            
        }
        catch (error) {
            console.log("Error in deleting name", error);
        }
    }

    const handleUserChange = async (event) => {
        const createdBy = event.target.value;
        setSelectedUser(createdBy);
    
        if (createdBy) {
            try {
                const response = await axios.get(`${nameLink}/user/${createdBy}`);
                setUserEntities(response.data);
                console.log("Successfully retrieved entities", response.data);
            } catch (error) {
                console.log("Error retrieving entities", error);
            }
        } else {
            setUserEntities([]);
        }
    };
    

    return (
        <>
            <div className="displayContainer">
                <div className="displayNamesContainer">
                    {userData.map((user, index) => (
                        <div key={user._id}>
                            <p id="displayNamesMain"> 
                                {index + 1}. {user.name} <br />
                            </p>

                            <div className="viewerButtonDiv">
                                <button id="UDButton" onClick={() => {
                                    navigate("/editData", { state: { user } })
                                }}> Update </button>

                                <button id="UDButton" onClick={() => handleDelete(user._id)}> Delete </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="displayNamesContainer">
                    <select onChange={handleUserChange} defaultValue="">
                        <option value="" disabled> Select a user </option>
                        {[...new Set(userData.map(user => user.createdBy))].map((creator) => (
                            <option key={creator} value={creator}>{creator}</option>
                        ))}
                    </select>

                    {selectedUser && (
                        <div>
                            <h3>Entities created by selected user:</h3>
                            {userEntities.length > 0 ? (
                                <ul>
                                    {userEntities.map((entity) => (
                                        <li key={entity._id}>{entity.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No entities found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DisplayNames;

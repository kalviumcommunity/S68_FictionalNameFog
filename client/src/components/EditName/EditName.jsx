import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';

function EditName() {

    const location = useLocation();
    const user = location.state?.user || { name: "", source: "", creator: "", id: ""};
    const navigate = useNavigate();

    const [information, setInformation] = useState({
        name: user.name,
        source: user.source, 
        creator: user.creator,
    });
    const [id, setId] = useState(user._id); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("Enter ID");
            return
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_LINK}${id}`, information);
            console.log(response.data);
            navigate("/viewnames");
        }
        catch (error) {
            console.log("Error updating data", error);
        }
    }

    return (
        <>
            <div className="addMain">
                <form className="addMainForm" onSubmit={handleSubmit}>
                    {/* <label> ID: </label>
                    <input type="text" onChange={(e) => {
                        setId(e.target.value)
                    }}/> */}
                    <label> Name: </label>
                    <input type="text" value={user.name} onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            name: e.target.value,
                        }))
                    }}/>
                    <label> Source: </label>
                    <input type="text" value={user.source} onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            source: e.target.value,
                        }))
                    }}/>
                    <label> Creator: </label>
                    <input type="text" value={user.creator} onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            creator: e.target.value,
                        }))
                    }}/>

                    <button type="submit" className="addNameSubmit"> Update </button>
                </form>
            </div>
        </>
    )
}

export default EditName;

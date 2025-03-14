import React, { useState } from 'react'
import "./AddName.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function AddName() {

    const [information, setInformation] = useState({
        name: "",
        source: "",
        creator: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_LINK}`, information);
            console.log("Successfully added");
            console.log(response.data);
            navigate("/viewnames");
        }
        catch (error) {
            console.log("Error in adding name", error);
        }
    }

    return (
        <>
            <div className="addMain">
                <form className="addMainForm" onSubmit={handleSubmit}>
                    <label> Name: </label>
                    <input type="text" onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            name: e.target.value,
                        }))
                    }}/>
                    <label> Source: </label>
                    <input type="text" onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            source: e.target.value,
                        }))
                    }}/>
                    <label> Creator: </label>
                    <input type="text" onChange={(e) => {
                        setInformation((previous) => ({
                            ...previous,
                            creator: e.target.value,
                        }))
                    }}/>

                    <button type="submit" className="addNameSubmit"> Add Name </button>
                </form>
            </div>
        </>
    )
}

export default AddName

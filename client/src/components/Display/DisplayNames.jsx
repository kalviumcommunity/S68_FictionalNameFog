import React, { useEffect, useState } from 'react';
import "./DisplayNames.css";

function DisplayNames() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setUserData([
            { name: "Jack" },
            { name: "John" }
        ]);
    }, []);

    return (
        <div className="displayNamesContainer">
            {userData.map((user, index) => (
                <p key={index}>{user.name}</p>
            ))}
        </div>
    );
}

export default DisplayNames;

import React from 'react';

const Profile1 = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to the profile page!</p>
            <ul>
                <li>Name: John Doe</li>
                <li>Email: john.doe@example.com</li>
                <li>Location: New York</li>
            </ul>
            <button onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
        </div>
    );
};

export default Profile1;
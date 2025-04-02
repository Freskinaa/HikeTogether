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
                <li>Age: 30</li>
                <li>Hobbies: Hiking, Reading, Traveling</li>
            </ul>
            <button onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
            <button onClick={() => alert('View Friends Clicked')}>View Friends</button>
            <button onClick={() => alert('Settings Clicked')}>Settings</button>
            <button onClick={() => alert('Logout Clicked')}>Logout</button>
        </div>
    );
};

export default Profile1;
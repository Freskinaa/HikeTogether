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
                <li>Occupation: Software Engineer</li>
                <li>Favorite Quote: "The journey of a thousand miles begins with one step."</li>
                <li>Skills: JavaScript, React, Node.js</li>
                <li>Languages: English, Spanish</li>
                <li>Favorite Food: Sushi</li>
                <li>Favorite Movie: Inception</li>
                <li>Favorite Book: The Alchemist</li>
                <li>Favorite Music Genre: Jazz</li>
                <li>Dream Destination: Japan</li>
                <li>Achievements: Marathon Finisher, Published Author</li>
            </ul>
            <div>
                <h2>Friends</h2>
                <ul>
                    <li>Jane Smith</li>
                    <li>Michael Brown</li>
                    <li>Emily Davis</li>
                </ul>
            </div>
            <div>
                <h2>Recent Activities</h2>
                <ul>
                    <li>Joined a hiking group</li>
                    <li>Completed a 10-mile hike</li>
                    <li>Started learning French</li>
                </ul>
            </div>
            <div>
                <h2>Gallery</h2>
                <img src="https://via.placeholder.com/150" alt="Hiking" />
                <img src="https://via.placeholder.com/150" alt="Traveling" />
                <img src="https://via.placeholder.com/150" alt="Reading" />
            </div>
            <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Special Card</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
                    This is a special card that highlights an important feature or announcement. 
                    You can use this space to share updates, promotions, or any other key information.
                </p>
                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', color: '#666' }}>
                    <li>Feature 1: Easy to use</li>
                    <li>Feature 2: Highly customizable</li>
                    <li>Feature 3: Responsive design</li>
                </ul>
                <button 
                    style={{ 
                        display: 'block', 
                        margin: '10px auto', 
                        padding: '10px 20px', 
                        backgroundColor: '#007BFF', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}
                    onClick={() => alert('Learn More Clicked')}
                >
                    Learn More
                </button>
            </div>
            <button onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
            <button onClick={() => alert('View Friends Clicked')}>View Friends</button>
            <button onClick={() => alert('Settings Clicked')}>Settings</button>
            <button onClick={() => alert('Logout Clicked')}>Logout</button>
            <footer style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
                <p>&copy; 2023 HikeTogether. All rights reserved.</p>
                <p>
                    Follow us on 
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>, 
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>, and 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>.
                </p>
            </footer>
        </div>
    );
};

export default Profile1;
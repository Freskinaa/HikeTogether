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
            <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Inspirational Quotes</h2>
                <ul style={{ listStyleType: 'square', paddingLeft: '20px', color: '#555' }}>
                    <li>"The best way to predict the future is to create it." - Peter Drucker</li>
                    <li>"Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill</li>
                    <li>"Believe you can and you're halfway there." - Theodore Roosevelt</li>
                    <li>"Do not wait to strike till the iron is hot; but make it hot by striking." - William Butler Yeats</li>
                    <li>"The only limit to our realization of tomorrow will be our doubts of today." - Franklin D. Roosevelt</li>
                    <li>"Act as if what you do makes a difference. It does." - William James</li>
                    <li>"What lies behind us and what lies before us are tiny matters compared to what lies within us." - Ralph Waldo Emerson</li>
                    <li>"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt</li>
                    <li>"It does not matter how slowly you go as long as you do not stop." - Confucius</li>
                    <li>"Hardships often prepare ordinary people for an extraordinary destiny." - C.S. Lewis</li>
                    <li>"The only way to do great work is to love what you do." - Steve Jobs</li>
                    <li>"You miss 100% of the shots you don’t take." - Wayne Gretzky</li>
                    <li>"The journey of a thousand miles begins with one step." - Lao Tzu</li>
                    <li>"Dream big and dare to fail." - Norman Vaughan</li>
                    <li>"Keep your face always toward the sunshine—and shadows will fall behind you." - Walt Whitman</li>
                </ul>
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
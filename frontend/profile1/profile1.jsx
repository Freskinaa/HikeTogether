import React from 'react';

const Profile1 = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' }}>
            <header style={{ backgroundColor: '#007BFF', color: '#fff', padding: '20px', textAlign: 'center' }}>
                <h1 style={{ margin: 0 }}>Profile Page</h1>
                <p style={{ fontSize: '18px' }}>Welcome to the profile page!</p>
            </header>
            <main style={{ padding: '20px' }}>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Personal Information</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><strong>Name:</strong> John Doe</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Location:</strong> New York</li>
                        <li><strong>Age:</strong> 30</li>
                        <li><strong>Hobbies:</strong> Hiking, Reading, Traveling</li>
                        <li><strong>Occupation:</strong> Software Engineer</li>
                        <li><strong>Favorite Quote:</strong> "The journey of a thousand miles begins with one step."</li>
                        <li><strong>Skills:</strong> JavaScript, React, Node.js</li>
                        <li><strong>Languages:</strong> English, Spanish</li>
                        <li><strong>Favorite Food:</strong> Sushi</li>
                        <li><strong>Favorite Movie:</strong> Inception</li>
                        <li><strong>Favorite Book:</strong> The Alchemist</li>
                        <li><strong>Favorite Music Genre:</strong> Jazz</li>
                        <li><strong>Dream Destination:</strong> Japan</li>
                        <li><strong>Achievements:</strong> Marathon Finisher, Published Author</li>
                    </ul>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Friends</h2>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li>Jane Smith</li>
                        <li>Michael Brown</li>
                        <li>Emily Davis</li>
                    </ul>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Recent Activities</h2>
                    <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                        <li>Joined a hiking group</li>
                        <li>Completed a 10-mile hike</li>
                        <li>Started learning French</li>
                    </ul>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Gallery</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <img src="https://via.placeholder.com/150" alt="Hiking" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                        <img src="https://via.placeholder.com/150" alt="Traveling" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                        <img src="https://via.placeholder.com/150" alt="Reading" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                    </div>
                </section>
                <section style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
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
                </section>
                <section style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
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
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Upcoming Events</h2>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li>Community Hike - March 25th</li>
                        <li>Photography Workshop - April 10th</li>
                        <li>Book Club Meeting - April 15th</li>
                    </ul>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Testimonials</h2>
                    <blockquote style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
                        "HikeTogether has been an amazing platform to connect with like-minded individuals!" - Sarah L.
                    </blockquote>
                    <blockquote style={{ fontStyle: 'italic', color: '#555' }}>
                        "I love the events and activities organized by this community. Highly recommend!" - Mark T.
                    </blockquote>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '5px' }}>Contact Us</h2>
                    <p>Email: support@hiketogether.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Main Street, New York, NY</p>
                </section>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => alert('Edit Profile Clicked')}
                    >
                        Edit Profile
                    </button>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => alert('View Friends Clicked')}
                    >
                        View Friends
                    </button>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: '#FFC107', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => alert('Settings Clicked')}
                    >
                        Settings
                    </button>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => alert('Logout Clicked')}
                    >
                        Logout
                    </button>
                </div>
            </main>
            <footer style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
                <p>&copy; 2023 HikeTogether. All rights reserved.</p>
                <p>
                    Follow us on 
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', marginLeft: '5px' }}>Facebook</a>, 
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', marginLeft: '5px' }}>Twitter</a>, and 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', marginLeft: '5px' }}>Instagram</a>.
                </p>
            </footer>
        </div>
    );
};

export default Profile1;
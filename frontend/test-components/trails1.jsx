import React from 'react';

const Trails = () => {
    const trails = [
        { id: 1, name: 'Appalachian Trail', location: 'Eastern United States', length: '2,190 miles' },
        { id: 2, name: 'Pacific Crest Trail', location: 'Western United States', length: '2,650 miles' },
        { id: 3, name: 'Continental Divide Trail', location: 'Rocky Mountains', length: '3,100 miles' },
    ];

    const getRandomTrailFact = () => {
        const facts = [
            'The Appalachian Trail passes through 14 states.',
            'The Pacific Crest Trail crosses the Sierra Nevada and Cascade mountain ranges.',
            'The Continental Divide Trail is considered the most challenging of the three major U.S. long-distance trails.',
        ];
        return facts[Math.floor(Math.random() * facts.length)];
    };

    return (
        <div>
            <h1>Popular Hiking Trails</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {trails.map((trail) => (
                    <div
                        key={trail.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            width: '300px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{trail.name}</h2>
                        <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Location:</p>
                        <p style={{ margin: '4px 0', color: '#555' }}>{trail.location}</p>
                        <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Length:</p>
                        <p style={{ margin: '4px 0', color: '#555' }}>{trail.length}</p>
                        <button
                            style={{
                                marginTop: '12px',
                                padding: '8px 16px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                            }}
                            onClick={() => alert(`You selected ${trail.name}`)}
                        >
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                Did you know? {getRandomTrailFact()}
            </p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                Hiking is a great way to explore the beauty of 
                nature and challenge yourself physically. 
                The trails 
                listed above
                 are some of the most popular and iconic
                  hiking trails in the United States. 
                Each trail offers 
                unique landscapes, from the 
                dense forests and rolling hills of the
                 Appalachian Trail 
                to the stunning mountain vistas of the Pacific 
                Crest Trail and the rugged terrain of
                  the Continental 
                Divide Trail.
            </p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                Before embarking on any of these trails, it's
                 important to plan and prepare adequately. 
                Make sure to research the trail conditions, 
                pack the necessary gear, and understand the challenges 
                you might face. 
                Whether you're a seasoned hiker or a beginner, 
                these trails offer something for everyone.
            </p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                Remember to follow Leave No Trace principles 
                to preserve the natural beauty of these trails for future generations. 
                Respect wildlife, stay on designated paths, and
                 carry out all trash. 
                Hiking is not just about reaching the destination 
                but also about enjoying the journey and connecting with nature.
            </p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                If you're looking for more information about these 
                trails, there are plenty of resources available online and in guidebooks. 
                Many hikers share their experiences and tips, which 
                can be incredibly helpful for planning your adventure. 
                Joining a hiking community or group can also provide 
                valuable insights and support.
            </p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}>
                So, lace up your hiking boots, grab your backpack, and hit the trail! 
                Whether you're tackling a short section or attempting a
                 thru-hike, these trails promise an unforgettable experience. 
                Happy hiking!
            </p>
        </div>
    );
};








// Additional functionality or components can be added here if needed in the future.

const TrailTips = () => {
    return (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e9f7ef', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#2c7a7b' }}>Trail Tips</h2>
            <ul style={{ lineHeight: '1.8', fontSize: '1rem', color: '#333' }}>
                <li>Always carry a map and compass, and know how to use them.</li>
                <li>Stay hydrated and carry enough water for your hike.</li>
                <li>Wear appropriate footwear to prevent blisters and injuries.</li>
                <li>Check the weather forecast before heading out.</li>
                <li>Let someone know your hiking plans and expected return time.</li>
            </ul>
        </div>
    );
};

const TrailGallery = () => {
    const images = [
        { id: 1, src: 'https://via.placeholder.com/300', alt: 'Trail 1' },
        { id: 2, src: 'https://via.placeholder.com/300', alt: 'Trail 2' },
        { id: 3, src: 'https://via.placeholder.com/300', alt: 'Trail 3' },
    ];

    return (
        <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#2c7a7b' }}>Trail Gallery</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={image.alt}
                        style={{
                            width: '300px',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Adding the new components to the main export
export { TrailTips, TrailGallery };










export default Trails;
import fetch from 'node-fetch';

async function seed() {
    try {
        const response = await fetch('http://localhost:5000/api/services/seed', {
            method: 'POST'
        });
        const data = await response.json();
        console.log('Seed Result:', data);
    } catch (error) {
        console.error('Seed Error:', error);
    }
}

seed();

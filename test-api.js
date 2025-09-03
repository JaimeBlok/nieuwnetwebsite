// Test script om de API endpoint te testen
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '0612345678',
      company: 'Test Company',
      subject: 'Test Subject',
      message: 'This is a test message to verify the API is working correctly.'
    };

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', result);
    
    if (response.ok) {
      console.log('✅ API test successful!');
    } else {
      console.log('❌ API test failed');
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAPI();

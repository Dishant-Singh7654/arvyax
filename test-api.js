// Simple API test script
// Run this with: node test-api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing ArvyaX API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data.message);
    console.log('');

    // Test registration
    console.log('2. Testing user registration...');
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: testEmail,
      password: testPassword
    });
    
    console.log('✅ Registration successful:', registerResponse.data.message);
    console.log('📧 Test user email:', testEmail);
    console.log('🔑 Token received:', registerResponse.data.token ? 'Yes' : 'No');
    console.log('');

    // Test login
    console.log('3. Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: testEmail,
      password: testPassword
    });
    
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
    console.log('');

    // Test invalid login
    console.log('4. Testing invalid login...');
    try {
      await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testEmail,
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✅ Invalid login properly rejected:', error.response.data.message);
    }
    console.log('');

    console.log('🎉 All tests passed! Your login/register functions are working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running:');
      console.log('   cd backend && npm start');
    }
  }
}

testAPI();

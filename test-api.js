// Test file for BFHL APIs
// Run with: node test-api.js

const http = require('http');

const makeRequest = (options, data) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(body)
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('=== Testing BFHL APIs ===\n');
  
  // Test health endpoint
  console.log('1. Testing GET /health');
  try {
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/health',
      method: 'GET'
    });
    console.log('Status:', healthResponse.statusCode);
    console.log('Response:', JSON.stringify(healthResponse.body, null, 2));
    console.log('✅ Health endpoint working\n');
  } catch (error) {
    console.log('❌ Health endpoint failed:', error.message, '\n');
  }
  
  // Test fibonacci
  console.log('2. Testing POST /bfhl with fibonacci');
  try {
    const fibResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/bfhl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { fibonacci: 7 });
    console.log('Status:', fibResponse.statusCode);
    console.log('Response:', JSON.stringify(fibResponse.body, null, 2));
    console.log('✅ Fibonacci working\n');
  } catch (error) {
    console.log('❌ Fibonacci failed:', error.message, '\n');
  }
  
  // Test prime
  console.log('3. Testing POST /bfhl with prime');
  try {
    const primeResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/bfhl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { prime: [2, 4, 7, 9, 11] });
    console.log('Status:', primeResponse.statusCode);
    console.log('Response:', JSON.stringify(primeResponse.body, null, 2));
    console.log('✅ Prime working\n');
  } catch (error) {
    console.log('❌ Prime failed:', error.message, '\n');
  }
  
  // Test LCM
  console.log('4. Testing POST /bfhl with LCM');
  try {
    const lcmResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/bfhl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { lcm: [12, 18, 24] });
    console.log('Status:', lcmResponse.statusCode);
    console.log('Response:', JSON.stringify(lcmResponse.body, null, 2));
    console.log('✅ LCM working\n');
  } catch (error) {
    console.log('❌ LCM failed:', error.message, '\n');
  }
  
  // Test HCF
  console.log('5. Testing POST /bfhl with HCF');
  try {
    const hcfResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/bfhl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { hcf: [24, 36, 60] });
    console.log('Status:', hcfResponse.statusCode);
    console.log('Response:', JSON.stringify(hcfResponse.body, null, 2));
    console.log('✅ HCF working\n');
  } catch (error) {
    console.log('❌ HCF failed:', error.message, '\n');
  }
  
  // Test error cases
  console.log('6. Testing error cases');
  
  // Invalid key
  try {
    const errorResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/bfhl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { invalid_key: "test" });
    console.log('Invalid key - Status:', errorResponse.statusCode);
    console.log('Invalid key - Response:', JSON.stringify(errorResponse.body, null, 2));
    console.log('✅ Error handling working\n');
  } catch (error) {
    console.log('❌ Error handling test failed:', error.message, '\n');
  }
  
  console.log('=== Tests Complete ===');
}

// Only run tests if server is running
runTests().catch(console.error);

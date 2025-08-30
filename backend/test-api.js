// Test script for Medical Summarizer Backend API
// Run with: node test-api.js

const testCases = [
  "Patient has high blood pressure",
  "Patient reports headaches",
  "Patient has diabetes type 2",
  "Patient experiencing chest pain",
  "Patient has asthma symptoms",
  "Patient reports fatigue and weakness",
  "Patient has joint pain and stiffness",
  "Patient reports sleep problems",
  "Patient has skin rash",
  "Patient reports digestive issues",
  "Custom medical condition that doesn't exist in mock data"
];

async function testAPI() {
  console.log('🧪 Testing Medical Summarizer Backend API\n');
  console.log('📍 Backend URL: http://localhost:5000\n');

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n${i + 1}. Testing: "${testCase}"`);
    console.log('─'.repeat(50));

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: testCase
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Success!');
        console.log(`📝 Patient Summary: ${data.summaries.patientSummary.substring(0, 100)}...`);
        console.log(`👨‍⚕️ Clinician Summary: ${data.summaries.clinicianSummary.substring(0, 100)}...`);
        console.log(`⏰ Timestamp: ${data.timestamp}`);
      } else {
        console.log(`❌ Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Connection Error: ${error.message}`);
      console.log('💡 Make sure the backend server is running on port 5000');
      break;
    }

    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🏁 API Testing Complete!');
  console.log('\n💡 To test the frontend:');
  console.log('   1. Backend should be running: cd backend && start /B node server.js');
  console.log('   2. Frontend should be running: cd frontend && npm run dev');
  console.log('   3. Open browser to the frontend URL');
  console.log('   4. Try the Summarize page with the test cases above');
}

// Test health endpoint first
async function testHealth() {
  try {
    const response = await fetch('http://localhost:5000/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running and healthy!');
      console.log(`📊 Available endpoints: ${Object.keys(data.endpoints).join(', ')}`);
      console.log('');
      return true;
    }
  } catch (error) {
    console.log('❌ Backend is not running or not accessible');
    console.log('💡 Start the backend with: cd backend && start /B node server.js');
    return false;
  }
}

// Main execution
async function main() {
  const isHealthy = await testHealth();
  if (isHealthy) {
    await testAPI();
  }
}

main().catch(console.error);

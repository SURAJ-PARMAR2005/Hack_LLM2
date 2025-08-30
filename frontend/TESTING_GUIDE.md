# 🧪 Medical Summarizer - Complete Testing Guide

This guide will help you test the complete Medical Summarizer system with both backend and frontend integration.

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd backend
start /B node server.js
```

**Expected Output:**
```
✅ Loaded 10 mock medical summaries
🚀 Medical Summarizer Backend Server Started!
📍 Server running on port 5000
🌐 Health check: http://localhost:5000/health
📝 Summarize endpoint: http://localhost:5000/summarize
📊 Mock data endpoint: http://localhost:5000/mock-data
✅ Ready to receive requests from frontend!
```

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v7.1.3  ready in XXX ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🌐 Test Backend API Endpoints

### Health Check
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Medical Summarizer Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "endpoints": {
    "GET /health": "Health check endpoint",
    "POST /summarize": "Generate medical summaries",
    "GET /mock-data": "View available mock data (for testing)"
  }
}
```

### Generate Medical Summary
```bash
curl -X POST http://localhost:5000/summarize \
  -H "Content-Type: application/json" \
  -d "{\"userInput\": \"Patient has high blood pressure\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "input": "Patient has high blood pressure",
  "summaries": {
    "patientSummary": "Your blood pressure is higher than normal...",
    "clinicianSummary": "Patient presents with elevated BP..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "disclaimer": "This is an AI-generated summary..."
}
```

### View Mock Data
```bash
curl http://localhost:5000/mock-data
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "input": "Patient has high blood pressure",
      "patientSummary": "...",
      "clinicianSummary": "..."
    }
    // ... more medical scenarios
  ]
}
```

## 🧪 Automated API Testing

Run the test script to test all endpoints:

```bash
cd backend
node test-api.js
```

This will test all 10 medical scenarios plus a custom input.

## 🎯 Test Medical Scenarios

The backend includes these pre-configured medical scenarios:

1. **High Blood Pressure** - `"Patient has high blood pressure"`
2. **Headaches** - `"Patient reports headaches"`
3. **Type 2 Diabetes** - `"Patient has diabetes type 2"`
4. **Chest Pain** - `"Patient experiencing chest pain"`
5. **Asthma Symptoms** - `"Patient has asthma symptoms"`
6. **Fatigue & Weakness** - `"Patient reports fatigue and weakness"`
7. **Joint Pain** - `"Patient has joint pain and stiffness"`
8. **Sleep Problems** - `"Patient reports sleep problems"`
9. **Skin Rash** - `"Patient has skin rash"`
10. **Digestive Issues** - `"Patient reports digestive issues"`

## 🌐 Frontend Testing

### 1. Open Browser
Navigate to: `http://localhost:5173/` (or the port shown in terminal)

### 2. Test Navigation
- ✅ Home page loads
- ✅ Navigate to Summarize page
- ✅ Navigate to History page
- ✅ Navigate to About page

### 3. Test Summarize Page
1. **Enter Text Input:**
   - Type: `"Patient has high blood pressure"`
   - Click "Generate Summary"
   - Should navigate to Results page with real API data

2. **Test File Upload:**
   - Create a text file with medical content
   - Upload via file input
   - Verify text appears in textarea

3. **Test Summary Types:**
   - Patient-friendly only
   - Clinician-focused only
   - Both summaries

### 4. Test Results Page
- ✅ Patient-friendly summary displays (green card)
- ✅ Clinician-focused summary displays (blue card)
- ✅ Original input shown in accordion
- ✅ Timestamp from backend displayed
- ✅ Disclaimer from backend displayed
- ✅ "Generate New Summary" button works

### 5. Test History Page
- ✅ Real backend examples displayed
- ✅ "View Details" buttons work
- ✅ Navigate to Results with real data
- ✅ Backend integration info displayed

## 🔍 How the Integration Works

### Frontend → Backend Flow
1. User enters medical text in Summarize page
2. Frontend sends POST request to `http://localhost:5000/summarize`
3. Backend processes text using intelligent matching algorithm
4. Backend returns patient-friendly and clinician-focused summaries
5. Frontend displays results with real API data

### Text Matching Algorithm
1. **Exact Match** - Direct string comparison
2. **Partial Match** - Input contains or is contained in mock data
3. **Keyword Match** - Common words between input and mock data
4. **Default Response** - Generic summaries if no match found

## 🚨 Troubleshooting

### Backend Issues
- **Port 5000 in use:** Kill existing processes or change port
- **Module not found:** Run `npm install` in backend directory
- **Server not starting:** Check for syntax errors in server.js

### Frontend Issues
- **CORS errors:** Backend CORS is configured for ports 3000, 5173, 5174
- **API calls failing:** Ensure backend is running on port 5000
- **Build errors:** Check for missing dependencies

### Connection Issues
- **ECONNREFUSED:** Backend server not running
- **Timeout:** Backend server overloaded or slow
- **Network errors:** Check firewall/antivirus settings

## 📱 Testing on Different Devices

### Desktop Testing
- ✅ Full layout with side-by-side cards
- ✅ All features accessible
- ✅ Responsive design working

### Mobile Testing
- ✅ Stacked layout on small screens
- ✅ Touch-friendly buttons
- ✅ Mobile navigation working

### Tablet Testing
- ✅ Adaptive grid layouts
- ✅ Touch and mouse input
- ✅ Medium screen optimization

## 🎉 Success Criteria

Your system is working correctly when:

1. ✅ Backend responds to all API endpoints
2. ✅ Frontend loads without errors
3. ✅ Medical summaries generate from real API calls
4. ✅ Patient-friendly and clinician summaries display correctly
5. ✅ File uploads work
6. ✅ Navigation between pages works
7. ✅ History page shows real backend examples
8. ✅ Error handling works (try invalid inputs)
9. ✅ Responsive design works on different screen sizes

## 🚀 Next Steps

After successful testing:

1. **Deploy Backend** to cloud platform (Heroku, Railway, etc.)
2. **Deploy Frontend** to static hosting (Netlify, Vercel, etc.)
3. **Update API URLs** in frontend for production
4. **Add Authentication** if needed
5. **Expand Mock Data** with more medical scenarios
6. **Add Real AI Integration** to replace mock data

---

**Happy Testing! 🏥✨**

If you encounter any issues, check the console logs and ensure both servers are running properly.

# 🏥 Medical Summarizer Backend

A Node.js + Express backend API for the Medical Summarizer hackathon project that generates patient-friendly and clinician-focused medical summaries.

## ✨ Features

- **Express Server**: Fast, lightweight Node.js web framework
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **JSON Parsing**: Handles large payloads including PDF content
- **Smart Matching**: Intelligent text matching for relevant summaries
- **Mock Data System**: Comprehensive sample medical data
- **Error Handling**: Robust error handling and validation
- **Health Monitoring**: Built-in health check endpoints

## 🚀 Tech Stack

- **Runtime**: Node.js (>=14.0.0)
- **Framework**: Express.js
- **Middleware**: CORS, body-parser
- **Data**: JSON-based mock data system
- **Development**: Nodemon for auto-restart

## 📁 Project Structure

```
backend/
├── server.js          # Main Express server
├── mockData.json      # Sample medical data
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### 1. Health Check
- **GET** `/health`
- **Description**: Check if the server is running
- **Response**: Server status and available endpoints

### 2. Generate Summaries
- **POST** `/summarize`
- **Description**: Generate medical summaries based on user input
- **Request Body**:
  ```json
  {
    "userInput": "Patient has high blood pressure"
  }
  ```
- **Response**:
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

### 3. View Mock Data
- **GET** `/mock-data`
- **Description**: View available sample medical data
- **Response**: List of all mock inputs and summaries

## 🔍 How It Works

### Text Matching Algorithm
1. **Exact Match**: Direct string comparison
2. **Partial Match**: Input contains or is contained in mock data
3. **Keyword Match**: Common words between input and mock data
4. **Default Response**: Generic summaries if no match found

### Mock Data Structure
```json
{
  "input": "Patient has high blood pressure",
  "patientSummary": "Patient-friendly explanation...",
  "clinicianSummary": "Technical medical summary..."
}
```

## 📊 Sample Mock Data

The backend includes 10 pre-configured medical scenarios:
- High blood pressure
- Headaches
- Type 2 diabetes
- Chest pain
- Asthma symptoms
- Fatigue and weakness
- Joint pain and stiffness
- Sleep problems
- Skin rash
- Digestive issues

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)

### CORS Settings
- Frontend origins: `localhost:3000`, `localhost:5173`, `localhost:5174`
- Credentials: Enabled
- Methods: GET, POST

### Request Limits
- JSON payload: 10MB (for PDF content)
- URL-encoded: 10MB

## 🧪 Testing

### Test the API
1. **Health Check**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Generate Summary**
   ```bash
   curl -X POST http://localhost:5000/summarize \
     -H "Content-Type: application/json" \
     -d '{"userInput": "Patient has high blood pressure"}'
   ```

3. **View Mock Data**
   ```bash
   curl http://localhost:5000/mock-data
   ```

### Frontend Integration
The backend is configured to work seamlessly with your React frontend running on ports 3000, 5173, or 5174.

## 🚨 Error Handling

### Validation Errors
- **400**: Invalid input format
- **404**: Endpoint not found
- **500**: Internal server error

### Error Response Format
```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly error message"
}
```

## 📝 Logging

The server provides comprehensive logging:
- ✅ Server startup and configuration
- 📝 Incoming requests
- 🎯 Match results (exact, partial, keyword)
- ❌ Errors and exceptions
- 🛑 Graceful shutdown

## 🔄 Development

### Auto-restart
```bash
npm run dev  # Uses nodemon for development
```

### Manual restart
```bash
npm start    # Standard Node.js execution
```

## 🚀 Deployment

### Production Build
```bash
npm start
```

### Environment Variables
```bash
PORT=5000 npm start
```

### Process Management
- **PM2**: `pm2 start server.js`
- **Docker**: Build and run container
- **Cloud Platforms**: Deploy to Heroku, Vercel, AWS, etc.

## 🤝 Frontend Integration

### Update Frontend API Calls
Replace mock API calls in your React frontend with:

```javascript
const response = await fetch('http://localhost:5000/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userInput: qaText
  })
});

const data = await response.json();
// Use data.summaries.patientSummary and data.summaries.clinicianSummary
```

## 📋 API Response Examples

### Successful Summary Generation
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

### Error Response
```json
{
  "success": false,
  "error": "Invalid input. Please provide 'userInput' as a string.",
  "example": {
    "userInput": "Patient has high blood pressure"
  }
}
```

## 🔒 Security Features

- **Input Validation**: Sanitizes and validates all inputs
- **CORS Protection**: Restricts access to authorized origins
- **Error Sanitization**: Prevents sensitive information leakage
- **Request Limiting**: Prevents abuse with payload size limits

## 📞 Support

For backend issues or questions:
1. Check the server logs for error details
2. Verify the mock data file is properly formatted
3. Ensure all dependencies are installed
4. Check CORS configuration for frontend integration

## 📄 License

This project is part of the Medical Summarizer hackathon project.

---

**Built with ❤️ using Node.js and Express**

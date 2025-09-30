const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// Multer setup (in-memory)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

// Middleware configuration
// Enable CORS for frontend communication
app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'https://hack-llm2.onrender.com', 'https://medical-summarizer-o9iw.onrender.com'], // Allow frontend ports
	credentials: true
}));

// Parse JSON bodies from incoming requests
app.use(bodyParser.json({ limit: '10mb' })); // Allow larger payloads for PDF content
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Load mock data from JSON file
let mockData = [];
try {
  const mockDataPath = path.join(__dirname, 'mockData.json');
  const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');
  mockData = JSON.parse(mockDataContent);
  console.log(`✅ Loaded ${mockData.length} mock medical summaries`);
} catch (error) {
  console.error('❌ Error loading mock data:', error.message);
  // Fallback mock data if file can't be loaded
  mockData = [
    {
      "input": "fallback",
      "patientSummary": "Based on your input, here's a patient-friendly summary. Please consult with your healthcare provider for personalized medical advice.",
      "clinicianSummary": "Patient input received. Generate appropriate clinical assessment and treatment plan based on presented symptoms and medical history."
    }
  ];
}

// Helper function to find matching summaries based on input text
function findMatchingSummaries(userInput) {
  // Convert input to lowercase for case-insensitive matching
  const inputLower = userInput.toLowerCase().trim();
  
  // If input is empty or too short, return default summaries
  if (inputLower.length < 3) {
    return {
      patientSummary: "Please provide more detailed information about your medical concern for a better summary.",
      clinicianSummary: "Insufficient input provided. Request additional patient information for proper clinical assessment."
    };
  }

  // Search for exact or partial matches in mock data
  for (const item of mockData) {
    const mockInputLower = item.input.toLowerCase();
    
    // Check for exact match
    if (inputLower === mockInputLower) {
      console.log(`🎯 Exact match found for: "${item.input}"`);
      return {
        patientSummary: item.patientSummary,
        clinicianSummary: item.clinicianSummary
      };
    }
    
    // Check for partial match (input contains mock data keywords)
    if (inputLower.includes(mockInputLower) || mockInputLower.includes(inputLower)) {
      console.log(`🔍 Partial match found for: "${item.input}"`);
      return {
        patientSummary: item.patientSummary,
        clinicianSummary: item.clinicianSummary
      };
    }
    
    // Check for keyword matches
    const inputWords = inputLower.split(/\s+/);
    const mockWords = mockInputLower.split(/\s+/);
    const commonWords = inputWords.filter(word => 
      mockWords.some(mockWord => 
        word.length > 3 && mockWord.includes(word) || mockWord.length > 3 && word.includes(mockWord)
      )
    );
    
    if (commonWords.length >= 2) { // At least 2 common words for a match
      console.log(`🔑 Keyword match found for: "${item.input}" (common words: ${commonWords.join(', ')})`);
      return {
        patientSummary: item.patientSummary,
        clinicianSummary: item.clinicianSummary
      };
    }
  }

  // No match found, return default summaries
  console.log(`❌ No match found for input: "${userInput}"`);
  return {
    patientSummary: `Based on your input about "${userInput}", here's a general patient summary. This is for educational purposes only - please consult with your healthcare provider for personalized medical advice and proper diagnosis.`,
    clinicianSummary: `Patient input: "${userInput}". Generate appropriate clinical assessment based on presented symptoms. Consider differential diagnosis, order relevant diagnostic tests, and develop treatment plan according to clinical guidelines and patient-specific factors.`
  };
}

// Gemini client helper
async function generateWithGemini(inputText, summaryType) {
	if (!GEMINI_API_KEY) {
		throw new Error('Missing GEMINI_API_KEY. Set it in backend/.env');
	}
	const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const prompt = `You are a medical summarization assistant.

Summarize the following medical content into two distinct summaries:
1) Patient-friendly: simple language, empathetic tone, avoid jargon, include next steps.
2) Clinician-focused: clinical language, differential considerations, suggested tests, management plan.

Return STRICT JSON with keys: patientSummary, clinicianSummary.

Content:
"""
${inputText}
"""`;

	const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
	const text = result.response.text();
	// Try to extract JSON
	try {
		const jsonStart = text.indexOf('{');
		const jsonEnd = text.lastIndexOf('}');
		const jsonSlice = jsonStart >= 0 && jsonEnd > jsonStart ? text.slice(jsonStart, jsonEnd + 1) : text;
		const parsed = JSON.parse(jsonSlice);
		return {
			patientSummary: String(parsed.patientSummary || ''),
			clinicianSummary: String(parsed.clinicianSummary || '')
		};
	} catch (e) {
		// Fallback: split by sections if model didn't return pure JSON
		const patient = /patient[-\s]?friendly[\s\S]*?:[\s\S]*?(?=clinician|$)/i.exec(text)?.[0] || text;
		const clinician = /clinician[\s\S]*?:[\s\S]*$/i.exec(text)?.[0] || text;
		return {
			patientSummary: patient.replace(/^[^:]*:/, '').trim(),
			clinicianSummary: clinician.replace(/^[^:]*:/, '').trim()
		};
	}
}

// Gemini helper for PDFs (send file as inline data)
async function generateFromPdfWithGemini(pdfBuffer, summaryType) {
	if (!GEMINI_API_KEY) {
		throw new Error('Missing GEMINI_API_KEY. Set it in backend/.env');
	}
	const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const instructions = `You are a medical summarization assistant.

Summarize the attached medical PDF into two distinct summaries:
1) Patient-friendly: simple language, empathetic tone, avoid jargon, include next steps.
2) Clinician-focused: clinical language, differential considerations, suggested tests, management plan.

Return STRICT JSON with keys: patientSummary, clinicianSummary.`;

	const result = await model.generateContent({
		contents: [{
			role: 'user',
			parts: [
				{ text: instructions },
				{ inlineData: { mimeType: 'application/pdf', data: pdfBuffer.toString('base64') } }
			]
		}]
	});
	const text = result.response.text();
	try {
		const jsonStart = text.indexOf('{');
		const jsonEnd = text.lastIndexOf('}');
		const jsonSlice = jsonStart >= 0 && jsonEnd > jsonStart ? text.slice(jsonStart, jsonEnd + 1) : text;
		const parsed = JSON.parse(jsonSlice);
		return {
			patientSummary: String(parsed.patientSummary || ''),
			clinicianSummary: String(parsed.clinicianSummary || '')
		};
	} catch (e) {
		const patient = /patient[-\s]?friendly[\s\S]*?:[\s\S]*?(?=clinician|$)/i.exec(text)?.[0] || text;
		const clinician = /clinician[\s\S]*?:[\s\S]*$/i.exec(text)?.[0] || text;
		return {
			patientSummary: patient.replace(/^[^:]*:/, '').trim(),
			clinicianSummary: clinician.replace(/^[^:]*:/, '').trim()
		};
	}
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Medical Summarizer Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check endpoint',
      'POST /summarize': 'Generate medical summaries',
      'GET /mock-data': 'View available mock data (for testing)'
    }
  });
});

// Main summarize endpoint (supports JSON or multipart with file)
app.post('/summarize', upload.single('file'), async (req, res) => {
	try {
		console.log('📝 Received summarize request');

		let inputText = '';
		const summaryType = (req.body?.summaryType || 'both').toString();

		if (req.file) {
			console.log(`📎 File received: ${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`);
			if (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) {
				const pdfData = await pdfParse(req.file.buffer);
				inputText = (pdfData.text || '').trim();
			} else {
				// Treat other text-like files as UTF-8 text
				inputText = req.file.buffer.toString('utf8');
			}
			// If user also provided text, append it
			if (req.body?.userInput) {
				inputText = `${req.body.userInput}\n\n${inputText}`.trim();
			}
		} else {
			const { userInput } = req.body || {};
			if (!userInput || typeof userInput !== 'string') {
				return res.status(400).json({
					success: false,
					error: 'Invalid input. Provide "userInput" as a string or upload a file under field "file".',
					example: { userInput: 'Patient has high blood pressure' }
				});
			}
			inputText = userInput;
		}

		console.log(`📋 Input length: ${inputText.length} chars`);

		let summaries;
		try {
			// Prefer Gemini if key configured
			if (req.file && (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) && !inputText) {
				// If PDF has no extractable text, send the PDF to Gemini directly
				summaries = await generateFromPdfWithGemini(req.file.buffer, summaryType);
			} else {
				summaries = await generateWithGemini(inputText, summaryType);
			}
		} catch (aiError) {
			console.warn('⚠️ Gemini failed or missing key. Falling back to mock summaries:', aiError.message);
			summaries = findMatchingSummaries(inputText);
		}

		// If user asked for only one type, blank out the other
		if (summaryType === 'patient') {
			summaries = { patientSummary: summaries.patientSummary, clinicianSummary: '' };
		} else if (summaryType === 'clinician') {
			summaries = { patientSummary: '', clinicianSummary: summaries.clinicianSummary };
		}

		const response = {
			success: true,
			input: inputText.slice(0, 5000),
			summaries,
			timestamp: new Date().toISOString(),
			disclaimer: 'This is an AI-generated summary for educational purposes only. Always consult with qualified healthcare professionals for medical advice.'
		};

		console.log('✅ Summary generated successfully');
		res.status(200).json(response);

	} catch (error) {
		console.error('❌ Error in summarize endpoint:', error);
		res.status(500).json({
			success: false,
			error: 'Internal server error occurred while processing your request.',
			message: error.message
		});
	}
});

// Endpoint to view available mock data (for testing purposes)
app.get('/mock-data', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: mockData.length,
      data: mockData,
      message: 'Available mock medical data for testing'
    });
  } catch (error) {
    console.error('❌ Error serving mock data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve mock data'
    });
  }
});

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      'GET /health': 'Health check',
      'POST /summarize': 'Generate medical summaries',
      'GET /mock-data': 'View mock data'
    },
    message: 'Please use one of the available endpoints listed above.'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('🚨 Global error handler caught:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on the server. Please try again later.'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 Medical Summarizer Backend Server Started!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Summarize endpoint: http://localhost:${PORT}/summarize`);
  console.log(`📊 Mock data endpoint: http://localhost:${PORT}/mock-data`);
  console.log('✅ Ready to receive requests from frontend!');
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app; // Export for testing purposes

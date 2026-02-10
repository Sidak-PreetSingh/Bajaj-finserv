const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBLZRHi71GXJRcOTwyplXOAv9Ulq8KrQh8';
const genAI = new GoogleGenerativeAI(apiKey);

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    is_success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Your official email (replace with your Chitkara email)
const OFFICIAL_EMAIL = 'cc21btech11002@chitkara.edu.in';

// Validation schemas
const fibonacciSchema = Joi.object({
  fibonacci: Joi.number().integer().min(0).max(50).required()
});

const primeSchema = Joi.object({
  prime: Joi.array().items(Joi.number().integer().min(2)).min(1).max(20).required()
});

const lcmSchema = Joi.object({
  lcm: Joi.array().items(Joi.number().integer().min(1)).min(2).max(10).required()
});

const hcfSchema = Joi.object({
  hcf: Joi.array().items(Joi.number().integer().min(1)).min(2).max(10).required()
});

const aiSchema = Joi.object({
  AI: Joi.string().min(1).max(500).required()
});

// Utility functions
function generateFibonacci(n) {
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib.push(fib[i-1] + fib[i-2]);
  }
  return fib;
}

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(arr) {
  return arr.filter(num => isPrime(num));
}

function calculateLCM(arr) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  
  return arr.reduce((acc, num) => lcm(acc, num), arr[0]);
}

function calculateHCF(arr) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  
  return arr.reduce((acc, num) => gcd(acc, num), arr[0]);
}

async function getAIResponse(question) {
  try {
    console.log('Making AI request for question:', question);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Answer this question with a single word or very short phrase (maximum 2 words): ${question}`;
    console.log('Sending prompt to Gemini:', prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    console.log('Gemini response:', text);
    
    // Extract first word or short phrase
    const words = text.split(' ').slice(0, 2).join(' ');
    return words;
  } catch (error) {
    console.error('AI API Error details:', error.message);
    console.error('Full error:', error);
    throw new Error('AI service unavailable');
  }
}

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// GET /bfhl - Show API documentation
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    message: "BFHL API - Use POST request to access functionality",
    endpoints: {
      "GET /health": "Health check",
      "POST /bfhl": "Main functionality with one of: fibonacci, prime, lcm, hcf, AI",
      examples: {
        fibonacci: {"fibonacci": 7},
        prime: {"prime": [2,4,7,9,11]},
        lcm: {"lcm": [12,18,24]},
        hcf: {"hcf": [24,36,60]},
        AI: {"AI": "What is the capital of India?"}
      }
    }
  });
});

app.post('/bfhl', async (req, res) => {
  try {
    const requestBody = req.body;
    
    // Check if exactly one key is present
    const keys = Object.keys(requestBody);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: 'Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI'
      });
    }
    
    const key = keys[0];
    let data;
    
    switch (key) {
      case 'fibonacci':
        const { error: fibError, value: fibValue } = fibonacciSchema.validate(requestBody);
        if (fibError) {
          return res.status(400).json({
            is_success: false,
            error: fibError.details[0].message
          });
        }
        data = generateFibonacci(fibValue.fibonacci);
        break;
        
      case 'prime':
        const { error: primeError, value: primeValue } = primeSchema.validate(requestBody);
        if (primeError) {
          return res.status(400).json({
            is_success: false,
            error: primeError.details[0].message
          });
        }
        data = filterPrimes(primeValue.prime);
        break;
        
      case 'lcm':
        const { error: lcmError, value: lcmValue } = lcmSchema.validate(requestBody);
        if (lcmError) {
          return res.status(400).json({
            is_success: false,
            error: lcmError.details[0].message
          });
        }
        data = calculateLCM(lcmValue.lcm);
        break;
        
      case 'hcf':
        const { error: hcfError, value: hcfValue } = hcfSchema.validate(requestBody);
        if (hcfError) {
          return res.status(400).json({
            is_success: false,
            error: hcfError.details[0].message
          });
        }
        data = calculateHCF(hcfValue.hcf);
        break;
        
      case 'AI':
        const { error: aiError, value: aiValue } = aiSchema.validate(requestBody);
        if (aiError) {
          return res.status(400).json({
            is_success: false,
            error: aiError.details[0].message
          });
        }
        
        // Check if API key is configured
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
          return res.status(503).json({
            is_success: false,
            error: 'AI service not configured'
          });
        }
        
        data = await getAIResponse(aiValue.AI);
        break;
        
      default:
        return res.status(400).json({
          is_success: false,
          error: 'Invalid key. Must be one of: fibonacci, prime, lcm, hcf, AI'
        });
    }
    
    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

# BFHL REST APIs

This project implements two REST APIs for the BFHL assignment:

## Endpoints

### POST /bfhl
Processes requests with exactly one of the following keys:
- `fibonacci`: Integer - Returns Fibonacci series up to n
- `prime`: Integer array - Returns prime numbers from the array
- `lcm`: Integer array - Returns LCM of the numbers
- `hcf`: Integer array - Returns HCF of the numbers
- `AI`: Question string - Returns AI response (single word)

### GET /health
Health check endpoint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Gemini API key
```

3. Start the server:
```bash
npm start
# or for development:
npm run dev
```

## Gemini API Key Setup

1. Visit https://aistudio.google.com
2. Sign in with Google account
3. Click "Get API Key"
4. Create API key in project
5. Copy the key to your .env file

## Request/Response Examples

### Fibonacci
Request:
```json
{
  "fibonacci": 7
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

### Prime Numbers
Request:
```json
{
  "prime": [2,4,7,9,11]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2,7,11]
}
```

### LCM
Request:
```json
{
  "lcm": [12,18,24]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

### HCF
Request:
```json
{
  "hcf": [24,36,60]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

### AI
Request:
```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

### Health Check
Request:
```
GET /health
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- Input validation with Joi
- Helmet.js for security headers
- CORS enabled
- Request body size limiting
- Error handling with proper HTTP status codes

## Deployment

The app is ready for deployment on Vercel, Railway, or Render. Make sure to set the GEMINI_API_KEY environment variable in your deployment platform.

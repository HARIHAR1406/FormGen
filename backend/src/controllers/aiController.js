const { GoogleGenAI } = require('@google/genai');
const { PDFParse } = require('pdf-parse');

let ai;
try {
  // If no API key is provided, it might throw or just fail later.
  // We initialize it here. It reads from GEMINI_API_KEY by default.
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });
} catch (e) {
  console.warn('Failed to initialize GoogleGenAI. Did you set GEMINI_API_KEY?');
}

// 1. ATS Resume Checker & JD Match
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured in backend' });
    }

    const prompt = `
      You are an expert ATS (Applicant Tracking System) analyzer and Tech Recruiter.
      I will provide you with a candidate's resume data in JSON format, and optionally a Job Description.
      
      Job Description: ${jobDescription || 'None provided. Just analyze the resume generally.'}
      
      Resume Data:
      ${JSON.stringify(resumeData)}
      
      Return a JSON response with the following structure exactly (no markdown formatting, just the raw JSON):
      {
        "score": 85,
        "matchPercentage": 70,
        "keywordCoverage": ["React", "Node.js"],
        "missingKeywords": ["AWS", "Docker"],
        "feedback": ["Add more metrics to your experience", "Include a summary"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    let text = response.text;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.slice(firstBrace, lastBrace + 1);
    }
    const result = JSON.parse(text);

    res.json(result);
  } catch (error) {
    console.error('analyzeResume error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
};

// 2. Interview Preparation
exports.interviewPrep = async (req, res) => {
  try {
    const { resumeData, jobRole } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured in backend' });
    }

    const prompt = `
      You are an expert Technical Interviewer.
      Your primary goal is to generate interview questions specifically tailored to the details, projects, and skills listed in the candidate's resume for the target role: ${jobRole || 'General'}.
      Do NOT just ask generic questions about the role. Deeply analyze the resume and ask specific, highly personalized questions about the candidate's past work, the technologies they claim to know, and the specific projects they have listed.
      
      Resume:
      ${JSON.stringify(resumeData)}
      
      Return exactly this JSON format (no markdown formatting):
      {
        "technical": [
          {"question": "In your [Project Name] project, how did you handle [Specific Technology]?", "reason": "Based on the [Project Name] listed in your resume."}
        ],
        "behavioral": [
          {"question": "Tell me about a challenge you faced while working as a [Role] at [Company Name].", "reason": "Based on your experience at [Company Name]."}
        ],
        "hr": [
          {"question": "What are your expectations for this role?", "reason": "General"}
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    let text = response.text;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.slice(firstBrace, lastBrace + 1);
    }
    res.json(JSON.parse(text));
  } catch (error) {
    console.error('interviewPrep error:', error);
    res.status(500).json({ error: 'Failed to generate interview questions' });
  }
};

// 3. AI Template Recommendation
exports.recommendTemplate = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured in backend' });
    }

    const prompt = `
      You are an expert UI/UX and Career Consultant.
      Analyze this candidate's profile and recommend the best 2 templates from our system.
      Available templates: 'modern-two-column', 'classic-single-column', 'creative-sidebar', 'executive-dark', 'tech-minimal', 'compact-pro', 'fresh-graduate', 'corporate-blue', 'bold-creative'.
      
      Resume:
      ${JSON.stringify(resumeData)}
      
      Return exactly this JSON format:
      {
        "recommended": ["tech-minimal", "creative-sidebar"],
        "reason": "Because of your extensive tech stack and multiple projects, tech-minimal provides a clean layout..."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    let text = response.text;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.slice(firstBrace, lastBrace + 1);
    }
    res.json(JSON.parse(text));
  } catch (error) {
    console.error('recommendTemplate error:', error);
    res.status(500).json({ error: 'Failed to recommend template' });
  }
};

// 4. Import Resume from PDF
exports.importResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    // 1. Extract raw text from the uploaded PDF buffer using pdf-parse@2.4.5
    const parser = new PDFParse(new Uint8Array(req.file.buffer));
    const pdfData = await parser.getText();
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from PDF. Ensure it is not a scanned image.' });
    }

    // 2. Ask Gemini to structure the text into our exact useFormStore format
    const prompt = `
      You are an expert Data Extractor and Resume Parser.
      I will provide you with the raw text extracted from a candidate's resume PDF.
      Your job is to accurately extract their information and map it strictly to the following JSON format.
      Do NOT invent information. If a field is not found in the resume, leave it as an empty string "" (or empty array []).
      Return ONLY perfectly valid JSON. 
      CRITICAL JSON RULES:
      - Properly escape all double quotes within strings using \\"
      - Replace any literal newlines inside strings with \\n
      - Do not include trailing commas in arrays or objects.
      
      Target JSON Structure:
      {
        "personalInfo": {
          "fullName": "",
          "email": "",
          "phone": "",
          "location": "",
          "portfolio": "",
          "linkedin": "",
          "github": "",
          "jobTitle": "",
          "summary": ""
        },
        "experience": [
          { "id": "1", "company": "", "role": "", "startDate": "", "endDate": "", "description": "", "location": "", "technologies": "" }
        ],
        "education": [
          { "id": "1", "institution": "", "degree": "", "field": "", "startDate": "", "endDate": "", "score": "", "location": "" }
        ],
        "skills": [
          { "id": "1", "category": "Frontend", "items": ["React", "CSS"] }
        ],
        "projects": [
          { "id": "1", "title": "", "description": "", "link": "", "technologies": "" }
        ],
        "certifications": [
          { "id": "1", "name": "", "issuer": "", "date": "", "link": "" }
        ]
      }

      Raw Resume Text:
      """
      ${rawText}
      """
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    let text = response.text;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.slice(firstBrace, lastBrace + 1);
    }
    let structuredData;
    try {
      structuredData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parsing failed. Raw text was:', text);
      throw parseError;
    }
    res.json(structuredData);
  } catch (error) {
    console.error('importResume error:', error);
    res.status(500).json({ error: 'Failed to process resume PDF' });
  }
};

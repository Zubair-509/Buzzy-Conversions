import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { exec } from 'child_process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Set up Multer for file uploads
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Health check endpoint
const healthCheck: RequestHandler = (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
};

// File upload endpoint
const handleFileUpload: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
};

// Image conversion endpoint
const handleImageConversion: RequestHandler = async (req, res) => {
  try {
    const { filename, format, quality, width, height } = req.body;

    if (!filename) {
      res.status(400).json({ error: 'Filename is required' });
      return;
    }

    const inputPath = path.join(__dirname, '../uploads', filename);
    const outputDir = path.join(__dirname, '../converted');
    const outputPath = path.join(outputDir, `${filename}.${format || 'jpg'}`);

    // Log paths for debugging
    console.log('Input Path:', inputPath);
    console.log('Output Dir:', outputDir);
    console.log('Output Path:', outputPath);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      console.log('Output directory does not exist. Creating...');
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Create sharp instance
    let image = sharp(inputPath);

    // Apply transformations if specified
    if (width || height) {
      image = image.resize(width, height);
    }

    if (quality) {
      image = image.jpeg({ quality: quality });
    }

    // Convert to specified format
    switch (format?.toLowerCase()) {
      case 'png':
        await image.png().toFile(outputPath);
        break;
      case 'webp':
        await image.webp().toFile(outputPath);
        break;
      default:
        await image.jpeg().toFile(outputPath);
    }

    res.json({
      message: 'Image converted successfully',
      convertedFilename: `${filename}.${format || 'jpg'}`,
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert image' });
  }
};

// File download endpoint
const handleFileDownload: RequestHandler = (req, res) => {
  const filePath = path.join(__dirname, '../converted', req.params.filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }
  res.download(filePath);
};

// PDF to DOCX conversion endpoint
const handlePdfToDocx: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const inputPath = path.join(__dirname, '../uploads', req.file.filename);
  const outputDir = path.join(__dirname, '../converted');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Use LibreOffice CLI for conversion
  exec(
    `soffice --headless --convert-to docx --outdir "${outputDir}" "${inputPath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error('LibreOffice error:', error, stderr);
        res.status(500).json({ error: 'Failed to convert PDF to DOCX' });
        return;
      }
      // Find the output file (LibreOffice may use the original name)
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, '');
      const convertedFile = fs
        .readdirSync(outputDir)
        .find(f => f.startsWith(originalName) && f.endsWith('.docx'));
      if (!convertedFile) {
        res.status(500).json({ error: 'Conversion failed, file not found' });
        return;
      }
      res.json({
        message: 'PDF converted to DOCX successfully',
        convertedFilename: convertedFile,
      });
    }
  );
};

// Register routes
app.get('/api/health', healthCheck);
app.post('/api/upload', upload.single('file'), handleFileUpload);
app.post('/api/convert/image', handleImageConversion);
app.get('/api/download/:filename', handleFileDownload);
app.post('/api/convert/pdf-to-docx', upload.single('file'), handlePdfToDocx);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const PdfToDocx: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFilename, setConvertedFilename] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setConvertedFilename('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/convert/pdf-to-docx`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setConvertedFilename(res.data.convertedFilename);
    } catch (err) {
      alert('Error converting PDF to DOCX');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">PDF to Word Converter</h2>
      <label htmlFor="pdf-file-input">Choose PDF: </label>
      <input id="pdf-file-input" type="file" accept="application/pdf" onChange={handleFileChange} title="Choose PDF file" placeholder="Select a PDF file" />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {convertedFilename && (
        <div className="mt-4">
          <a
            href={`${API_URL}/download/${convertedFilename}`}
            download
            className="text-green-600 underline"
          >
            Download DOCX
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfToDocx; 
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('png');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [quality, setQuality] = useState<number | ''>('');
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

    // 1. Upload the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const filename = uploadRes.data.filename;

      // 2. Convert the image
      const convertRes = await axios.post(`${API_URL}/convert/image`, {
        filename,
        format,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        quality: quality ? Number(quality) : undefined,
      });

      setConvertedFilename(convertRes.data.convertedFilename);
    } catch (err) {
      alert('Error uploading or converting image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Image Converter</h2>
      <label htmlFor="file-input">Choose image: </label>
      <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} title="Choose image file" />
      <div className="my-2">
        <label htmlFor="format-select">Format: </label>
        <select id="format-select" value={format} onChange={e => setFormat(e.target.value)} title="Select output format">
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>
      <div className="my-2">
        <label htmlFor="width-input">Width: </label>
        <input id="width-input" type="number" value={width} onChange={e => setWidth(e.target.value ? Number(e.target.value) : '')} placeholder="Width" />
        <label htmlFor="height-input" className="ml-2">Height: </label>
        <input id="height-input" type="number" value={height} onChange={e => setHeight(e.target.value ? Number(e.target.value) : '')} placeholder="Height" />
      </div>
      <div className="my-2">
        <label htmlFor="quality-input">Quality (1-100): </label>
        <input id="quality-input" type="number" value={quality} onChange={e => setQuality(e.target.value ? Number(e.target.value) : '')} placeholder="Quality" />
      </div>
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
            Download Converted Image
          </a>
        </div>
      )}
    </div>
  );
}; 
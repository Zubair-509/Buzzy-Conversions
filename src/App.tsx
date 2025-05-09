import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import PdfTools from './pages/PdfTools';
import ImageTools from './pages/ImageTools';
import AudioTools from './pages/AudioTools';
import AllTools from './pages/AllTools';
import ToolDetail from './pages/ToolDetail';
import Mp4ToMp3 from './pages/tools/Mp4ToMp3';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pdf-tools" element={<PdfTools />} />
              <Route path="/image-tools" element={<ImageTools />} />
              <Route path="/audio-tools" element={<AudioTools />} />
              <Route path="/tools" element={<AllTools />} />
              <Route path="/tools/mp4-to-mp3" element={<Mp4ToMp3 />} />
              <Route path="/tools/:toolId" element={<ToolDetail />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
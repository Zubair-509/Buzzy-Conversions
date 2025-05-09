import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PdfToDocx from './pages/PdfToDocx';
import { ImageConverter } from './components/ImageConverter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tools/pdf-to-word" element={<PdfToDocx />} />
      </Routes>
      <ImageConverter />
    </Router>
  );
}

export default App; 
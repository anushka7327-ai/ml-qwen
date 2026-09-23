import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import History from './pages/History';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pointer-events-none" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analysis/:id" element={<Analysis />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="border-t border-gray-800/50 py-8 px-4 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2024 ImageInsight AI. Powered by ML Pipeline.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Tesseract OCR</span>
                <span>•</span>
                <span>Computer Vision</span>
                <span>•</span>
                <span>LLM</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </HashRouter>
  );
}

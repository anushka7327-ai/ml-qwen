import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from '../components/ImageUploader';
import LoadingIndicator from '../components/LoadingIndicator';
import { PipelineStep, AnalysisResult } from '../types';
import { generateAnalysisFromImage } from '../utils/mlPipeline';
import { saveToHistory } from '../utils/storage';
import { Sparkles, ArrowRight } from 'lucide-react';

const initialSteps: PipelineStep[] = [
  { id: 'upload', name: 'Image Upload', status: 'pending', progress: 0, description: 'Validating and loading image file' },
  { id: 'preprocess', name: 'Image Preprocessing', status: 'pending', progress: 0, description: 'Resizing, denoising, and normalizing' },
  { id: 'ocr', name: 'OCR Processing', status: 'pending', progress: 0, description: 'Extracting text using Tesseract OCR' },
  { id: 'vision', name: 'Image Understanding', status: 'pending', progress: 0, description: 'Detecting objects and classifying scene' },
  { id: 'nlp', name: 'Information Generation', status: 'pending', progress: 0, description: 'Generating summary and context via LLM' },
  { id: 'store', name: 'Storing Results', status: 'pending', progress: 0, description: 'Saving analysis to database' },
];

export default function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setAnalysisComplete(false);
    setSteps(initialSteps);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setSteps(initialSteps);
    setResultId(null);
  };

  const simulatePipeline = useCallback(async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);

    const stepDurations = [800, 1200, 1500, 1800, 1400, 600];
    let currentSteps = [...initialSteps];

    for (let i = 0; i < currentSteps.length; i++) {
      // Set current step to processing
      currentSteps = currentSteps.map((step, idx) => ({
        ...step,
        status: idx === i ? 'processing' : idx < i ? 'complete' : 'pending',
        progress: idx === i ? 0 : step.progress,
      }));
      setSteps([...currentSteps]);

      // Simulate progress
      const duration = stepDurations[i];
      const intervals = 10;
      const intervalDuration = duration / intervals;

      for (let j = 1; j <= intervals; j++) {
        await new Promise(resolve => setTimeout(resolve, intervalDuration));
        currentSteps = currentSteps.map((step, idx) => ({
          ...step,
          progress: idx === i ? Math.round((j / intervals) * 100) : step.progress,
        }));
        setSteps([...currentSteps]);
      }

      // Mark step as complete
      currentSteps = currentSteps.map((step, idx) => ({
        ...step,
        status: idx === i ? 'complete' : step.status,
        progress: idx === i ? 100 : step.progress,
      }));
      setSteps([...currentSteps]);
    }

    // Generate analysis result
    const analysis = generateAnalysisFromImage(selectedFile.name);
    const id = uuidv4();
    const result: AnalysisResult = {
      id,
      imageUrl: preview!,
      ...analysis,
      createdAt: new Date().toISOString(),
    };

    saveToHistory(result);
    setResultId(id);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  }, [selectedFile, preview]);

  useEffect(() => {
    if (analysisComplete && resultId) {
      // Auto-redirect after showing completion
    }
  }, [analysisComplete, resultId]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Upload & Analyze
          </h1>
          <p className="text-gray-400">
            Upload an image to extract text, detect objects, and generate AI insights
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedFile={selectedFile}
            preview={preview}
            onClear={handleClear}
          />
        </div>

        {/* Analyze Button */}
        {selectedFile && !isAnalyzing && !analysisComplete && (
          <div className="flex justify-center mb-8">
            <button
              onClick={simulatePipeline}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Analyze Image
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Pipeline Progress */}
        {isAnalyzing && (
          <div className="mb-8">
            <LoadingIndicator steps={steps} />
          </div>
        )}

        {/* Analysis Complete */}
        {analysisComplete && resultId && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-6">
              <Sparkles className="w-5 h-5" />
              Analysis Complete!
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(`/analysis/${resultId}`)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
              >
                View Results
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleClear}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl border border-gray-700 transition-all"
              >
                Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

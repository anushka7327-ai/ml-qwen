import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnalysisResult } from '../types';
import { getById, deleteFromHistory } from '../utils/storage';
import { 
  FileText, Box, Brain, BookOpen, ArrowLeft, Trash2, 
  Calendar, Image as ImageIcon, ExternalLink 
} from 'lucide-react';

export default function Analysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getById(id);
      if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
    }
  }, [id]);

  const handleDelete = () => {
    if (id && confirm('Are you sure you want to delete this analysis?')) {
      deleteFromHistory(id);
      navigate('/history');
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30 inline-flex mb-4">
            <ImageIcon className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Not Found</h2>
          <p className="text-gray-400 mb-6">This analysis may have been deleted or doesn't exist.</p>
          <Link
            to="/upload"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors"
          >
            Upload New Image
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/history"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-violet-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Analysis Results</h1>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(result.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Preview */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-800/30 sticky top-24">
              <img
                src={result.imageUrl}
                alt={result.originalFileName}
                className="w-full max-h-80 object-contain"
              />
              <div className="p-4 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 truncate">{result.originalFileName}</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                  <Brain className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">AI Summary</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{result.summary}</p>
            </div>

            {/* Extracted Text */}
            {result.extractedText && (
              <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Extracted Text (OCR)</h2>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {result.extractedText}
                  </pre>
                </div>
              </div>
            )}

            {/* Detected Objects */}
            {result.objects && result.objects.length > 0 && (
              <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                    <Box className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Detected Objects</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.objects.map((obj, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-700/30"
                    >
                      <span className="text-sm text-gray-300 capitalize">{obj.name.replace(/_/g, ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              obj.confidence >= 0.9 ? 'bg-emerald-500' :
                              obj.confidence >= 0.7 ? 'bg-amber-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${obj.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-10 text-right">
                          {(obj.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Information */}
            {result.relatedInformation && result.relatedInformation.length > 0 && (
              <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Related Information</h2>
                </div>
                <div className="space-y-4">
                  {result.relatedInformation.map((info, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">{info.title}</h3>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">{info.description}</p>
                      <span className="inline-block mt-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                        {info.source}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

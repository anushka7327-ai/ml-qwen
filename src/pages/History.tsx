import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { getHistory, deleteFromHistory } from '../utils/storage';
import { Clock, Trash2, Eye, Image as ImageIcon, Search } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      deleteFromHistory(id);
      setHistory(getHistory());
    }
  };

  const filteredHistory = history.filter(item =>
    item.originalFileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.extractedText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Analysis History
          </h1>
          <p className="text-gray-400">
            View and manage your past image analyses
          </p>
        </div>

        {/* Search */}
        {history.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search analyses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {history.length === 0 && (
          <div className="text-center py-20">
            <div className="p-4 rounded-full bg-gray-800/50 border border-gray-700/50 inline-flex mb-6">
              <Clock className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Analyses Yet</h2>
            <p className="text-gray-400 mb-6">
              Upload an image to start analyzing and building your history.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all"
            >
              <ImageIcon className="w-5 h-5" />
              Upload First Image
            </Link>
          </div>
        )}

        {/* History List */}
        {filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-gray-800/30 border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-gray-900/50">
                  <img
                    src={item.imageUrl}
                    alt={item.originalFileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <p className="text-xs text-gray-300 truncate">{item.originalFileName}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/analysis/${item.id}`}
                        className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                        title="View Results"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  {item.objects && item.objects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.objects.slice(0, 3).map((obj, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 capitalize"
                        >
                          {obj.name.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {item.objects.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-500">
                          +{item.objects.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results from search */}
        {history.length > 0 && filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No analyses match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

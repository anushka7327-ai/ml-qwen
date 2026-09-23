import { Link } from 'react-router-dom';
import { Upload, Brain, FileText, Search, Shield, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'OCR Text Extraction',
      description: 'Powered by Tesseract OCR to accurately extract text from images, documents, and labels.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Search,
      title: 'Object Detection',
      description: 'Advanced computer vision identifies objects, scenes, and visual elements in your images.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Large language models generate contextual summaries and related information from visual data.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Fast ML pipeline with image preprocessing, analysis, and results in seconds.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'File validation, size limits, and secure processing ensure your images are handled safely.',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Simple drag-and-drop interface supporting JPG, PNG, and WebP formats up to 10MB.',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-8">
            <Brain className="w-4 h-4" />
            <span>Powered by Advanced ML Pipeline</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Understand Any Image
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              With AI Intelligence
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Upload an image and let our AI pipeline extract text, detect objects, 
            generate summaries, and provide contextual information — all in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/upload"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
            >
              Start Analyzing
            </Link>
            <Link
              to="/history"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl border border-gray-700 transition-all"
            >
              View History
            </Link>
          </div>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Upload', desc: 'Drag & drop your image' },
              { step: '02', title: 'Preprocess', desc: 'Enhance & normalize' },
              { step: '03', title: 'Analyze', desc: 'OCR + Object Detection' },
              { step: '04', title: 'Generate', desc: 'AI insights & context' },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/30 transition-colors group">
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-500/30 to-cyan-500/30 bg-clip-text text-transparent">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-gray-600">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Our comprehensive ML pipeline combines OCR, computer vision, and language models for complete image understanding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:bg-gray-800/50 group"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Analyze Your Images?
            </h2>
            <p className="text-gray-400 mb-8">
              Upload any image and get instant AI-powered insights including text extraction, object detection, and contextual information.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
            >
              <Upload className="w-5 h-5" />
              Upload Image Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

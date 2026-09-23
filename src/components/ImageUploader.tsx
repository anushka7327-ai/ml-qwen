import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image, X } from 'lucide-react';

interface Props {
  onImageSelect: (file: File, preview: string) => void;
  selectedFile: File | null;
  preview: string | null;
  onClear: () => void;
}

export default function ImageUploader({ onImageSelect, selectedFile, preview, onClear }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload JPG, PNG, or WebP images.';
    }
    if (file.size > maxSize) {
      return 'File too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview && selectedFile) {
    return (
      <div className="relative group">
        <div className="rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-800/30">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-96 object-contain"
          />
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Image className="w-4 h-4" />
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                <span className="text-gray-600">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={onClear}
                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center ${
        isDragging
          ? 'border-violet-500 bg-violet-500/10 scale-[1.02]'
          : 'border-gray-600 hover:border-violet-500/50 hover:bg-gray-800/30'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className={`p-4 rounded-full transition-colors ${
          isDragging ? 'bg-violet-500/20' : 'bg-gray-800'
        }`}>
          <Upload className={`w-8 h-8 ${isDragging ? 'text-violet-400' : 'text-gray-400'}`} />
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            {isDragging ? 'Drop your image here' : 'Upload an image to analyze'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supports JPG, PNG, WebP • Max 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
